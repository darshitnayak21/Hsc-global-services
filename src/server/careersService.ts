import fs from 'fs';
import path from 'path';

/**
 * HSC Global Services - Careers Portal Backend Service
 *
 * Enforces validation, resume security, file size limits, deduplication,
 * and reliable dispatching to Google Apps Script MailApp webhook.
 */

// Strictly fixed recruitment inbox - client can NEVER alter the destination
export const RECRUITMENT_EMAIL = 'hscglobalenterprises5@gmail.com';

// Allowed resume file extensions for security and enterprise recruitment
export const ALLOWED_RESUME_EXTENSIONS = ['.pdf', '.doc', '.docx'] as const;

// Maximum decoded binary attachment size in bytes (20 MB)
// Google MailApp enforces a strict 25 MB total MIME message limit.
// Base64 encoding adds ~33% overhead, so a 20 MB binary decoded file produces
// ~24 MB MIME payload, fitting within Google's 25 MB limit.
export const MAX_RESUME_BYTES = 20 * 1024 * 1024; // 20,971,520 bytes (~20 MB)

/**
 * Detects whether an Apps Script URL is a placeholder or template example rather than a real deployed web app
 */
export function isPlaceholderAppsScriptUrl(url?: string | null): boolean {
  if (!url || !url.trim()) return true;
  const trimmed = url.trim();
  if (
    trimmed.includes('...') ||
    trimmed.includes('AKfycbxXXXXX') ||
    trimmed.includes('example.com') ||
    trimmed.includes('placeholder') ||
    trimmed.includes('your-script-id')
  ) {
    return true;
  }
  return false;
}

export interface ApplicationInput {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  position?: unknown;
  portfolio?: unknown;
  coverNote?: unknown;
  resumeFileName?: unknown;
  resumeBase64?: unknown;
}

export interface ValidatedApplication {
  name: string;
  email: string;
  phone: string;
  position: string;
  portfolio: string;
  coverNote: string;
  resumeFileName: string | null;
  resumeBuffer: Buffer | null;
  resumeBase64Clean: string | null;
  resumeSizeKB: number;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  data?: ValidatedApplication;
}

export interface DispatchResult {
  success: boolean;
  applicationId: string;
  recipient: string;
  message?: string;
  error?: string;
  httpStatus?: number;
  isDuplicate?: boolean;
}

/**
 * In-memory deduplication cache: avoids duplicate email dispatch if candidate
 * double-clicks or retries after a transient client network blip.
 * Key: SHA-like fingerprint (`${email}:${position}:${byteLength}`)
 * Value: { applicationId: string; dispatchedAt: number }
 */
const recentDispatches = new Map<string, { applicationId: string; dispatchedAt: number }>();
const DEDUPLICATION_WINDOW_MS = 5 * 60 * 1000; // 5 minutes

function cleanupDeduplicationCache() {
  const now = Date.now();
  for (const [key, record] of recentDispatches.entries()) {
    if (now - record.dispatchedAt > DEDUPLICATION_WINDOW_MS) {
      recentDispatches.delete(key);
    }
  }
}

/**
 * Generate a unique application tracking ID
 */
export function generateApplicationId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `HSC-APP-${timestamp}-${randomSuffix}`;
}

/**
 * Validate application input fields and resume payload
 */
export function validateApplication(input: ApplicationInput): ValidationResult {
  const errors: Record<string, string> = {};

  // 1. Validate Candidate Full Name
  if (!input.name || typeof input.name !== 'string' || !input.name.trim()) {
    errors.name = 'Full name is required.';
  }

  // 2. Validate Candidate Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const rawEmail = typeof input.email === 'string' ? input.email.trim() : '';
  if (!rawEmail || !emailRegex.test(rawEmail)) {
    errors.email = 'A valid email address is required.';
  }

  // 3. Validate Candidate Phone
  const rawPhone = typeof input.phone === 'string' ? input.phone.trim() : '';
  const digitsOnly = rawPhone.replace(/\D/g, '');
  if (!rawPhone || digitsOnly.length < 7) {
    errors.phone = 'A valid contact phone number with at least 7 digits is required.';
  }

  // 4. Validate Position
  if (!input.position || typeof input.position !== 'string' || !input.position.trim()) {
    errors.position = 'Target position is required.';
  }

  // 5. Validate Resume Attachment (if provided)
  let resumeBuffer: Buffer | null = null;
  let resumeBase64Clean: string | null = null;
  let safeFileName: string | null = null;
  let resumeSizeKB = 0;

  const rawResumeFileName = typeof input.resumeFileName === 'string' ? input.resumeFileName.trim() : '';
  const rawResumeBase64 = typeof input.resumeBase64 === 'string' ? input.resumeBase64.trim() : '';

  if (rawResumeBase64) {
    // If resume base64 is provided, file name must also be provided
    if (!rawResumeFileName) {
      errors.resume = 'A file name must be provided with the resume attachment.';
    } else {
      // Validate file extension
      const ext = path.extname(rawResumeFileName).toLowerCase();
      if (!ALLOWED_RESUME_EXTENSIONS.includes(ext as any)) {
        errors.resume = `Invalid resume file type (${ext || 'unknown'}). Only ${ALLOWED_RESUME_EXTENSIONS.join(', ')} files are supported.`;
      } else {
        // Sanitize file name to prevent path traversal or unwanted characters
        const baseName = path.basename(rawResumeFileName);
        safeFileName = baseName.replace(/^\.+/, '').replace(/[^a-zA-Z0-9._-]/g, '_');
        if (!safeFileName || safeFileName === ext) {
          safeFileName = `resume${ext}`;
        }

        // Remove data URI prefix (e.g. data:application/pdf;base64,)
        const base64Content = rawResumeBase64.replace(/^data:[^;]+;base64,/, '');

        // Validate base64 structure
        const base64Regex = /^[A-Za-z0-9+/=]+$/;
        if (!base64Regex.test(base64Content.replace(/\s+/g, ''))) {
          errors.resume = 'The uploaded resume contains invalid base64 encoding.';
        } else {
          try {
            resumeBuffer = Buffer.from(base64Content, 'base64');
            resumeBase64Clean = base64Content;
            resumeSizeKB = Math.round(resumeBuffer.length / 1024);

            if (resumeBuffer.length === 0) {
              errors.resume = 'The uploaded resume file is empty.';
            } else if (resumeBuffer.length > MAX_RESUME_BYTES) {
              const sizeMB = (resumeBuffer.length / (1024 * 1024)).toFixed(1);
              errors.resume = `Resume file size (${sizeMB} MB) exceeds the maximum limit of 20MB supported for email delivery via Google MailApp (25MB total email envelope).`;
            }
          } catch {
            errors.resume = 'Failed to decode resume attachment binary.';
          }
        }
      }
    }
  }

  if (Object.keys(errors).length > 0) {
    return { isValid: false, errors };
  }

  const validated: ValidatedApplication = {
    name: (input.name as string).trim(),
    email: rawEmail.toLowerCase(),
    phone: rawPhone,
    position: (input.position as string).trim(),
    portfolio: typeof input.portfolio === 'string' ? input.portfolio.trim() : '',
    coverNote: typeof input.coverNote === 'string' ? input.coverNote.trim() : '',
    resumeFileName: safeFileName,
    resumeBuffer,
    resumeBase64Clean,
    resumeSizeKB,
  };

  return { isValid: true, errors: {}, data: validated };
}

/**
 * Save candidate resume to local archive directory on server
 */
export function archiveResumeToDisk(
  dataDir: string,
  applicationId: string,
  fileName: string,
  buffer: Buffer
): string | null {
  try {
    const resumesDir = path.resolve(dataDir, 'resumes');
    if (!fs.existsSync(resumesDir)) {
      fs.mkdirSync(resumesDir, { recursive: true });
    }
    const safeStoredName = `${applicationId}_${fileName}`;
    const destination = path.resolve(resumesDir, safeStoredName);
    fs.writeFileSync(destination, buffer);
    return destination;
  } catch (err) {
    console.error('Warning: could not write resume file to local disk:', err);
    return null;
  }
}

/**
 * Append candidate record to JSON ledger archive
 */
export function recordApplicationInLedger(
  applicationsFile: string,
  record: Record<string, unknown>
): void {
  try {
    const dir = path.dirname(applicationsFile);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const existing = fs.existsSync(applicationsFile)
      ? JSON.parse(fs.readFileSync(applicationsFile, 'utf-8') || '[]')
      : [];
    existing.push(record);
    fs.writeFileSync(applicationsFile, JSON.stringify(existing, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving application to ledger:', err);
  }
}

/**
 * Check if this submission is an immediate duplicate within the deduplication window
 */
export function checkDuplicateSubmission(
  email: string,
  position: string,
  resumeByteLength: number
): { isDuplicate: boolean; existingApplicationId?: string } {
  cleanupDeduplicationCache();
  const fingerprint = `${email.toLowerCase()}:${position.toLowerCase()}:${resumeByteLength}`;
  const existing = recentDispatches.get(fingerprint);
  if (existing) {
    return { isDuplicate: true, existingApplicationId: existing.applicationId };
  }
  return { isDuplicate: false };
}

/**
 * Register submission fingerprint in deduplication cache
 */
export function markSubmissionDispatched(
  email: string,
  position: string,
  resumeByteLength: number,
  applicationId: string
): void {
  const fingerprint = `${email.toLowerCase()}:${position.toLowerCase()}:${resumeByteLength}`;
  recentDispatches.set(fingerprint, { applicationId, dispatchedAt: Date.now() });
}

/**
 * Dispatch application payload to Google Apps Script Web App
 */
export async function dispatchToAppsScript(
  application: {
    applicationId: string;
    name: string;
    email: string;
    phone: string;
    position: string;
    portfolio?: string;
    coverNote?: string;
    resumeFileName?: string | null;
    resumeBase64?: string | null;
    receivedAt: string;
  },
  options?: {
    scriptUrl?: string;
    scriptSecret?: string;
    timeoutMs?: number;
    fetchFn?: typeof fetch;
  }
): Promise<DispatchResult> {
  const scriptUrl = options?.scriptUrl || process.env.GOOGLE_APPS_SCRIPT_URL;
  const scriptSecret = options?.scriptSecret ?? (process.env.GOOGLE_APPS_SCRIPT_SECRET || '');
  const timeoutMs = options?.timeoutMs || 25000;
  const activeFetch = options?.fetchFn || globalThis.fetch;

  if (!scriptUrl || !scriptUrl.trim() || isPlaceholderAppsScriptUrl(scriptUrl)) {
    return {
      success: false,
      applicationId: application.applicationId,
      recipient: RECRUITMENT_EMAIL,
      httpStatus: 503,
      error: 'Recruitment email service is not configured. Please set GOOGLE_APPS_SCRIPT_URL to a valid deployed Web App URL.',
    };
  }

  // Deduplication check
  const resumeLen = application.resumeBase64 ? application.resumeBase64.length : 0;
  const duplicate = checkDuplicateSubmission(application.email, application.position, resumeLen);
  if (duplicate.isDuplicate && duplicate.existingApplicationId) {
    return {
      success: true,
      isDuplicate: true,
      applicationId: duplicate.existingApplicationId,
      recipient: RECRUITMENT_EMAIL,
      message: 'Application was already accepted for delivery (duplicate request deduplicated).',
    };
  }

  const payload = {
    secret: scriptSecret,
    applicationId: application.applicationId,
    name: application.name,
    email: application.email,
    phone: application.phone,
    position: application.position,
    portfolio: application.portfolio || '',
    coverNote: application.coverNote || '',
    resumeFileName: application.resumeFileName || null,
    resumeBase64: application.resumeBase64 || null,
    receivedAt: application.receivedAt,
  };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await activeFetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
      redirect: 'follow',
    });

    clearTimeout(timer);

    let responseData: any;
    const responseText = await response.text();

    try {
      responseData = JSON.parse(responseText);
    } catch {
      const isAuthRedirect = responseText.includes('accounts.google.com') || response.status === 401 || response.status === 403;
      const errorMsg = isAuthRedirect
        ? 'Google Apps Script requires authorization. Ensure the Web App is deployed with "Who has access: Anyone".'
        : response.status === 404
        ? 'Google Apps Script Web App was not found (HTTP 404). Please verify that your Apps Script project is deployed as a Web App with access set to "Anyone" and that GOOGLE_APPS_SCRIPT_URL is valid.'
        : `Unexpected non-JSON response from Google Apps Script (HTTP ${response.status}).`;

      return {
        success: false,
        applicationId: application.applicationId,
        recipient: RECRUITMENT_EMAIL,
        httpStatus: 502,
        error: errorMsg,
      };
    }

    if (!response.ok || !responseData.success) {
      return {
        success: false,
        applicationId: application.applicationId,
        recipient: RECRUITMENT_EMAIL,
        httpStatus: response.status >= 400 ? response.status : 502,
        error: responseData.error || `Apps Script returned failure (HTTP ${response.status}).`,
      };
    }

    // Success confirmed by Apps Script MailApp
    markSubmissionDispatched(application.email, application.position, resumeLen, application.applicationId);

    return {
      success: true,
      applicationId: application.applicationId,
      recipient: RECRUITMENT_EMAIL,
      message: responseData.message || 'Application and resume accepted and dispatched to recruitment email.',
    };
  } catch (err: any) {
    clearTimeout(timer);
    const isTimeout = err.name === 'AbortError' || err.code === 'ABORT_ERR';
    return {
      success: false,
      applicationId: application.applicationId,
      recipient: RECRUITMENT_EMAIL,
      httpStatus: isTimeout ? 504 : 502,
      error: isTimeout
        ? 'Google Apps Script connection timed out while sending email.'
        : `Network error connecting to Google Apps Script: ${err.message || String(err)}`,
    };
  }
}
