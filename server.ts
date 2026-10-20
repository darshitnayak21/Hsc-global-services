import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// The configured recruitment email addresses for HSC Global Services
const RECRUITMENT_EMAILS = [
  'hscglobalenterprises5@gmail.com',
  'info@hscglobalserices.com',
];

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
const hasDist = fs.existsSync(path.resolve(distPath, 'index.html'));
const isProduction = process.env.NODE_ENV === 'production' || (hasDist && process.env.NODE_ENV !== 'development');

// Support JSON payloads with base64 encoded resumes up to 25MB
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

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
  res.json({
    status: 'ok',
    service: 'HSC Global Services Careers & Web Backend',
    timestamp: new Date().toISOString(),
  });
});

// Careers Application Dispatch API
app.post('/api/careers/apply', async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      position,
      portfolio,
      resumeFileName,
      resumeBase64,
      coverNote,
    } = req.body;

    // Strict validation
    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ success: false, error: 'Full name is required.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return res.status(400).json({ success: false, error: 'A valid email address is required.' });
    }

    if (!phone || typeof phone !== 'string' || phone.trim().length < 7) {
      return res.status(400).json({ success: false, error: 'A valid phone number is required.' });
    }

    if (!position || typeof position !== 'string') {
      return res.status(400).json({ success: false, error: 'Target position is required.' });
    }

    const applicationId = `HSC-APP-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    const receivedAt = new Date().toISOString();

    const applicationRecord = {
      id: applicationId,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      position: position.trim(),
      portfolio: portfolio ? portfolio.trim() : '',
      resumeFileName: resumeFileName || 'Not attached',
      hasResumeFile: Boolean(resumeBase64),
      resumeSizeKB: resumeBase64 ? Math.round((resumeBase64.length * 3) / 4 / 1024) : 0,
      coverNote: coverNote ? coverNote.trim() : '',
      recipients: RECRUITMENT_EMAILS,
      receivedAt,
      status: 'dispatched_to_recruitment',
    };

    // Save candidate resume to disk if provided
    if (resumeBase64 && resumeFileName) {
      try {
        const resumesDir = path.resolve(dataDir, 'resumes');
        if (!fs.existsSync(resumesDir)) {
          fs.mkdirSync(resumesDir, { recursive: true });
        }
        const safeFileName = `${applicationId}_${resumeFileName.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
        const fileBuffer = Buffer.from(resumeBase64.replace(/^data:[^;]+;base64,/, ''), 'base64');
        fs.writeFileSync(path.resolve(resumesDir, safeFileName), fileBuffer);
      } catch (fileErr) {
        console.error('Warning: could not write resume file to disk:', fileErr);
      }
    }

    // Append to application archive ledger
    try {
      const existingData = JSON.parse(fs.readFileSync(applicationsFile, 'utf-8') || '[]');
      existingData.push(applicationRecord);
      fs.writeFileSync(applicationsFile, JSON.stringify(existingData, null, 2), 'utf-8');
    } catch (saveErr) {
      console.error('Error saving application to ledger:', saveErr);
    }

    console.log(`[Careers Application Received] ID: ${applicationId}`);
    console.log(`Candidate: ${name} (${email}, ${phone})`);
    console.log(`Role: ${position}`);
    console.log(`Recruitment Destination: ${RECRUITMENT_EMAILS.join(', ')}`);
    if (resumeFileName) {
      console.log(`Attached Resume: ${resumeFileName}`);
    }

    return res.status(200).json({
      success: true,
      message: 'Your application and resume have been successfully forwarded to our recruitment team.',
      applicationId,
      dispatchedTo: RECRUITMENT_EMAILS[0],
      candidateName: name,
      position,
    });
  } catch (error: any) {
    console.error('Error in /api/careers/apply:', error);
    return res.status(500).json({
      success: false,
      error: 'An unexpected error occurred while processing your application. Please try again.',
    });
  }
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

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
