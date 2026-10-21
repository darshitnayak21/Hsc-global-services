import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import {
  RECRUITMENT_EMAIL,
  generateApplicationId,
  validateApplication,
  archiveResumeToDisk,
  recordApplicationInLedger,
  dispatchToAppsScript,
  isPlaceholderAppsScriptUrl,
} from './src/server/careersService';

const app = express();

// Resolve port avoiding conflict with Nginx on port 8080:
// In Google AI Studio, Nginx listens on 8080 and proxies internally to port 3000.
// Binding to 8080 while inside AI Studio causes an EADDRINUSE port conflict.
const isInsideAiStudioEnv = Boolean(
  process.env.CONTROL_PLANE_PORT ||
  process.env.DEFAULT_APP_PORT ||
  process.env.NGINX_PORT
);

function resolvePort(): number {
  if (process.env.DEFAULT_APP_PORT) {
    return Number(process.env.DEFAULT_APP_PORT);
  }
  if (isInsideAiStudioEnv) {
    // Avoid conflicting with Nginx on 8080 inside AI Studio
    return 3000;
  }
  const rawPort = Number(process.env.PORT);
  return rawPort && !isNaN(rawPort) ? rawPort : 3000;
}

const PORT = resolvePort();
const distPath = path.resolve(__dirname, 'dist');
const isProduction = process.env.NODE_ENV === 'production';

// Support JSON payloads with base64 encoded resumes up to 20MB decoded (~27MB base64)
app.use(express.json({ limit: '32mb' }));
app.use(express.urlencoded({ extended: true, limit: '32mb' }));

// Serve static assets from public folder directly with robust MIME types and case tolerance
const publicDir = path.resolve(__dirname, 'public');
app.use(express.static(publicDir));
app.use('/images/clients', express.static(path.resolve(publicDir, 'images/Clients')));
app.use('/images/clients', express.static(path.resolve(publicDir, 'images/clients')));
app.use('/images/Clients', express.static(path.resolve(publicDir, 'images/Clients')));
app.use('/images/Clients', express.static(path.resolve(publicDir, 'images/clients')));

// Ensure fresh video delivery and prevent stale browser caching of intro video
app.use('/videos', (_req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

// Ensure data storage directory exists for applicant archival
const dataDir = path.resolve(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
const applicationsFile = path.resolve(dataDir, 'career_applications.json');
if (!fs.existsSync(applicationsFile)) {
  fs.writeFileSync(applicationsFile, JSON.stringify([], null, 2), 'utf-8');
}

// Health check endpoint
app.get('/api/health', (_req, res) => {
  const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
  const isConfigured = Boolean(scriptUrl && !isPlaceholderAppsScriptUrl(scriptUrl));
  res.json({
    status: 'ok',
    service: 'HSC Global Services Careers & Web Backend',
    recruitmentEmail: RECRUITMENT_EMAIL,
    emailServiceConfigured: isConfigured,
    timestamp: new Date().toISOString(),
  });
});

// Careers Application Dispatch API
app.post('/api/careers/apply', async (req, res) => {
  try {
    const validation = validateApplication(req.body);
    if (!validation.isValid || !validation.data) {
      const firstError = Object.values(validation.errors)[0] || 'Invalid candidate data.';
      return res.status(400).json({
        success: false,
        error: firstError,
        details: validation.errors,
      });
    }

    const candidate = validation.data;
    const applicationId = generateApplicationId();
    const receivedAt = new Date().toISOString();

    // Archive candidate resume to disk if attached
    let localResumePath: string | null = null;
    if (candidate.resumeBuffer && candidate.resumeFileName) {
      localResumePath = archiveResumeToDisk(
        dataDir,
        applicationId,
        candidate.resumeFileName,
        candidate.resumeBuffer
      );
    }

    // Dispatch application to Google Apps Script MailApp
    const dispatchResult = await dispatchToAppsScript({
      applicationId,
      name: candidate.name,
      email: candidate.email,
      phone: candidate.phone,
      position: candidate.position,
      portfolio: candidate.portfolio,
      coverNote: candidate.coverNote,
      resumeFileName: candidate.resumeFileName,
      resumeBase64: candidate.resumeBase64Clean,
      receivedAt,
    });

    const applicationRecord = {
      id: applicationId,
      name: candidate.name,
      email: candidate.email,
      phone: candidate.phone,
      position: candidate.position,
      portfolio: candidate.portfolio,
      resumeFileName: candidate.resumeFileName || 'Not attached',
      hasResumeFile: Boolean(candidate.resumeBuffer),
      resumeSizeKB: candidate.resumeSizeKB,
      coverNote: candidate.coverNote,
      recipient: RECRUITMENT_EMAIL,
      receivedAt,
      status: dispatchResult.success ? 'email_dispatched' : 'email_dispatch_failed',
      dispatchError: dispatchResult.error || null,
      localResumePath,
    };

    recordApplicationInLedger(applicationsFile, applicationRecord);

    if (!dispatchResult.success) {
      console.warn(`[Careers Dispatch Notice] ID: ${applicationId} - ${dispatchResult.error}`);
      return res.status(dispatchResult.httpStatus || 502).json({
        success: false,
        error: dispatchResult.error || 'Failed to dispatch application to recruitment email service.',
        applicationId,
      });
    }

    console.log(`[Careers Application Dispatched] ID: ${applicationId} to ${RECRUITMENT_EMAIL} for role "${candidate.position}"`);

    return res.status(200).json({
      success: true,
      message: 'Your application and resume have been successfully transmitted and accepted by our recruitment email service.',
      applicationId: dispatchResult.applicationId || applicationId,
      dispatchedTo: RECRUITMENT_EMAIL,
      candidateName: candidate.name,
      position: candidate.position,
    });
  } catch (error: any) {
    console.error('Error in /api/careers/apply:', error);
    return res.status(500).json({
      success: false,
      error: 'An unexpected internal error occurred while processing your application. Please try again.',
    });
  }
});

// Explicit JSON handler for any other /api routes to prevent HTML fallbacks
app.use('/api', (_req, res) => {
  res.status(404).json({
    success: false,
    error: 'API endpoint not found',
  });
});

// Setup dev server with Vite middlewares or serve production dist
async function startServer() {
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: process.env.DISABLE_HMR !== 'true' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(distPath));
    app.use((req, res, next) => {
      if (req.method === 'GET' && !req.path.startsWith('/api')) {
        return res.sendFile(path.resolve(distPath, 'index.html'));
      }
      next();
    });
  }

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT} [${isProduction ? 'production' : 'development'}]`);
  });

  server.on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`[Port Conflict] Port ${PORT} is already in use. Retrying on port 3000...`);
      if (PORT !== 3000) {
        const fallbackServer = app.listen(3000, '0.0.0.0', () => {
          console.log(`Fallback server running on http://0.0.0.0:3000 [${isProduction ? 'production' : 'development'}]`);
        });
        fallbackServer.on('error', (fallbackErr) => {
          console.error('Fallback server error:', fallbackErr);
          process.exit(1);
        });
      }
    } else {
      console.error('Server error:', err);
      process.exit(1);
    }
  });
}

if (process.env.NODE_ENV !== 'test') {
  startServer().catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });
}

export { app, startServer };
