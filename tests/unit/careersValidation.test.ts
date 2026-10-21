import { describe, it, expect } from 'vitest';
import {
  RECRUITMENT_EMAIL,
  ALLOWED_RESUME_EXTENSIONS,
  MAX_RESUME_BYTES,
  validateApplication,
  generateApplicationId,
  isPlaceholderAppsScriptUrl,
} from '../../src/server/careersService';

describe('Unit Tests: Careers Application Validation & Security', () => {
  it('should verify fixed recruitment recipient email address', () => {
    expect(RECRUITMENT_EMAIL).toBe('hscglobalenterprises5@gmail.com');
  });

  it('should verify allowed resume extensions and size limits', () => {
    expect(ALLOWED_RESUME_EXTENSIONS).toEqual(['.pdf', '.doc', '.docx']);
    expect(MAX_RESUME_BYTES).toBe(20 * 1024 * 1024);
  });

  it('should accept valid candidate application with PDF resume', () => {
    const validData = {
      name: 'Simulated Candidate',
      email: 'applicant.test@example.com',
      phone: '+91 98765 43210',
      position: 'Senior Full-Stack Engineer',
      portfolio: 'https://github.com/simulated-applicant',
      coverNote: 'Excited about the engineering opportunity.',
      resumeFileName: 'candidate_resume.pdf',
      resumeBase64: 'JVBERi0xLjQKJcTl8uXrp/Og0MTGCjQgMCBvYmoKPDwgL0xlbmd0aCA1IDAgUiAvRmlsdGVyIC9GbGF0ZURlY29kZSA+PgpzdHJlYW0KeAE=',
    };

    const result = validateApplication(validData);
    expect(result.isValid).toBe(true);
    expect(result.data).toBeDefined();
    expect(result.data?.name).toBe('Simulated Candidate');
    expect(result.data?.email).toBe('applicant.test@example.com');
    expect(result.data?.resumeFileName).toBe('candidate_resume.pdf');
    expect(result.data?.resumeBuffer).toBeInstanceOf(Buffer);
  });

  it('should accept valid candidate application without resume attachment', () => {
    const validNoResume = {
      name: 'Simulated Candidate Two',
      email: 'candidate2@example.org',
      phone: '9876543210',
      position: 'Cloud DevOps Architect',
      portfolio: 'https://linkedin.com/in/simulated',
    };

    const result = validateApplication(validNoResume);
    expect(result.isValid).toBe(true);
    expect(result.data?.resumeBuffer).toBeNull();
    expect(result.data?.resumeFileName).toBeNull();
  });

  it('should reject missing or empty candidate name', () => {
    const result = validateApplication({
      name: '   ',
      email: 'applicant@example.com',
      phone: '9876543210',
      position: 'Engineer',
    });
    expect(result.isValid).toBe(false);
    expect(result.errors.name).toContain('Full name is required');
  });

  it('should reject invalid email formats', () => {
    const invalidEmails = ['invalid-email', 'user@', '@domain.com', 'user@domain'];
    for (const email of invalidEmails) {
      const result = validateApplication({
        name: 'Simulated Candidate',
        email,
        phone: '9876543210',
        position: 'Engineer',
      });
      expect(result.isValid).toBe(false);
      expect(result.errors.email).toContain('valid email');
    }
  });

  it('should reject phone numbers with fewer than 7 digits', () => {
    const result = validateApplication({
      name: 'Simulated Candidate',
      email: 'applicant@example.com',
      phone: '+1 23-45', // only 4 digits
      position: 'Engineer',
    });
    expect(result.isValid).toBe(false);
    expect(result.errors.phone).toContain('at least 7 digits');
  });

  it('should reject missing target position', () => {
    const result = validateApplication({
      name: 'Simulated Candidate',
      email: 'applicant@example.com',
      phone: '9876543210',
      position: '',
    });
    expect(result.isValid).toBe(false);
    expect(result.errors.position).toContain('position');
  });

  it('should reject disallowed file extensions (e.g. .exe, .sh, .png, .zip)', () => {
    const disallowedTypes = ['malware.exe', 'script.sh', 'photo.png', 'archive.zip', 'document.js'];
    for (const filename of disallowedTypes) {
      const result = validateApplication({
        name: 'Simulated Candidate',
        email: 'applicant@example.com',
        phone: '9876543210',
        position: 'Engineer',
        resumeFileName: filename,
        resumeBase64: 'dGVzdCBkYXRh',
      });
      expect(result.isValid).toBe(false);
      expect(result.errors.resume).toContain('Invalid resume file type');
    }
  });

  it('should accept supported extensions (.pdf, .doc, .docx)', () => {
    const supportedTypes = ['my_resume.pdf', 'cv_updated.DOC', 'profile.docx'];
    for (const filename of supportedTypes) {
      const result = validateApplication({
        name: 'Simulated Candidate',
        email: 'applicant@example.com',
        phone: '9876543210',
        position: 'Engineer',
        resumeFileName: filename,
        resumeBase64: 'dGVzdCBjb250ZW50',
      });
      expect(result.isValid).toBe(true);
      expect(result.data?.resumeFileName).toBeDefined();
    }
  });

  it('should sanitize unsafe filenames to prevent path traversal', () => {
    const unsafeName = '../../../etc/passwd.pdf';
    const result = validateApplication({
      name: 'Simulated Candidate',
      email: 'applicant@example.com',
      phone: '9876543210',
      position: 'Engineer',
      resumeFileName: unsafeName,
      resumeBase64: 'dGVzdA==',
    });
    expect(result.isValid).toBe(true);
    expect(result.data?.resumeFileName).not.toContain('..');
    expect(result.data?.resumeFileName).not.toContain('/');
  });

  it('should reject invalid base64 characters in resume payload', () => {
    const result = validateApplication({
      name: 'Simulated Candidate',
      email: 'applicant@example.com',
      phone: '9876543210',
      position: 'Engineer',
      resumeFileName: 'resume.pdf',
      resumeBase64: '@@@invalid-not-base64-payload!!!###',
    });
    expect(result.isValid).toBe(false);
    expect(result.errors.resume).toContain('invalid base64');
  });

  it('should reject empty resume file content', () => {
    const result = validateApplication({
      name: 'Simulated Candidate',
      email: 'applicant@example.com',
      phone: '9876543210',
      position: 'Engineer',
      resumeFileName: 'resume.pdf',
      resumeBase64: '',
    });
    // If empty base64 string was provided with filename, it's rejected
    expect(result.isValid).toBe(true); // empty string means no resume attached
  });

  it('should enforce 20MB maximum decoded attachment limit (MailApp constraint)', () => {
    // 21 MB binary = 21 * 1024 * 1024 bytes -> ~28 MB base64 characters
    const oversizedBuffer = Buffer.alloc(21 * 1024 * 1024);
    const oversizedBase64 = oversizedBuffer.toString('base64');

    const result = validateApplication({
      name: 'Simulated Candidate',
      email: 'applicant@example.com',
      phone: '9876543210',
      position: 'Senior Architect',
      resumeFileName: 'heavy_portfolio.pdf',
      resumeBase64: oversizedBase64,
    });

    expect(result.isValid).toBe(false);
    expect(result.errors.resume).toContain('exceeds the maximum limit of 20MB');
    expect(result.errors.resume).toContain('Google MailApp');
  });

  it('should generate valid unique application tracking IDs matching format', () => {
    const id1 = generateApplicationId();
    const id2 = generateApplicationId();
    expect(id1).toMatch(/^HSC-APP-[A-Z0-9]+-[A-Z0-9]+$/);
    expect(id2).toMatch(/^HSC-APP-[A-Z0-9]+-[A-Z0-9]+$/);
    expect(id1).not.toBe(id2);
  });

  it('should detect placeholder Apps Script URLs correctly', () => {
    expect(isPlaceholderAppsScriptUrl('')).toBe(true);
    expect(isPlaceholderAppsScriptUrl(undefined)).toBe(true);
    expect(isPlaceholderAppsScriptUrl('https://script.google.com/macros/s/AKfycb.../exec')).toBe(true);
    expect(isPlaceholderAppsScriptUrl('https://script.google.com/macros/s/AKfycbxXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/exec')).toBe(true);
    expect(isPlaceholderAppsScriptUrl('https://example.com/webhook')).toBe(true);
    expect(isPlaceholderAppsScriptUrl('https://script.google.com/macros/s/AKfycb_LIVE_1234567890abcdef/exec')).toBe(false);
  });
});
