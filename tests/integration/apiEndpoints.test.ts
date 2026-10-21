import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import request from 'supertest';
import { app } from '../../server';
import { RECRUITMENT_EMAIL } from '../../src/server/careersService';

describe('Integration Tests: Express Backend Endpoints & Apps Script Dispatch', () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    vi.restoreAllMocks();
    process.env.GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycb_SIMULATED_TEST_DEPLOYMENT_ID/exec';
    process.env.GOOGLE_APPS_SCRIPT_SECRET = 'test-secret-token-12345';
  });

  afterEach(() => {
    process.env = { ...originalEnv };
    vi.restoreAllMocks();
  });

  it('GET /api/health should return 200 OK with service metadata and recruitment email', async () => {
    const response = await request(app).get('/api/health');

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.status).toBe('ok');
    expect(response.body.service).toContain('HSC Global Services');
    expect(response.body.recruitmentEmail).toBe('hscglobalenterprises5@gmail.com');
    expect(response.body.emailServiceConfigured).toBe(true);
    expect(response.body.timestamp).toBeDefined();
  });

  it('POST /api/careers/apply should reject request with missing name', async () => {
    const response = await request(app)
      .post('/api/careers/apply')
      .send({
        email: 'applicant@example.com',
        phone: '1234567890',
        position: 'Cloud Engineer',
      });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toContain('Full name is required');
  });

  it('POST /api/careers/apply should reject request with invalid email format', async () => {
    const response = await request(app)
      .post('/api/careers/apply')
      .send({
        name: 'Alex Johnson',
        email: 'invalid-email-no-at-sign',
        phone: '1234567890',
        position: 'Cloud Engineer',
      });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toContain('valid email address');
  });

  it('POST /api/careers/apply should reject request with too short phone number', async () => {
    const response = await request(app)
      .post('/api/careers/apply')
      .send({
        name: 'Alex Johnson',
        email: 'alex@example.com',
        phone: '123',
        position: 'Cloud Engineer',
      });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toContain('7 digits');
  });

  it('POST /api/careers/apply should reject disallowed resume file types (e.g. .exe)', async () => {
    const response = await request(app)
      .post('/api/careers/apply')
      .send({
        name: 'Alex Johnson',
        email: 'alex@example.com',
        phone: '9876543210',
        position: 'Cloud Engineer',
        resumeFileName: 'exploit.exe',
        resumeBase64: 'dGVzdA==',
      });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toContain('Invalid resume file type');
  });

  it('POST /api/careers/apply should reject oversized resume files exceeding 20MB', async () => {
    // 20.5 MB binary -> ~27.3 MB base64 (within 32MB HTTP limit, rejected by 20MB MailApp validation)
    const oversizedBuffer = Buffer.alloc(Math.floor(20.5 * 1024 * 1024));
    const oversizedBase64 = oversizedBuffer.toString('base64');

    const response = await request(app)
      .post('/api/careers/apply')
      .send({
        name: 'Alex Johnson',
        email: 'alex@example.com',
        phone: '9876543210',
        position: 'Cloud Engineer',
        resumeFileName: 'massive.pdf',
        resumeBase64: oversizedBase64,
      });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toContain('exceeds the maximum limit of 20MB');
    expect(response.body.error).toContain('Google MailApp');
  });

  it('POST /api/careers/apply should dispatch email via Apps Script and return success when accepted', async () => {
    let capturedRequestUrl = '';
    let capturedPayload: any = null;

    vi.spyOn(globalThis, 'fetch').mockImplementation(async (url, init) => {
      capturedRequestUrl = url.toString();
      capturedPayload = JSON.parse(init?.body as string);

      return new Response(
        JSON.stringify({
          success: true,
          message: 'Application and resume accepted and dispatched to recruitment email.',
          applicationId: capturedPayload.applicationId,
          recipient: RECRUITMENT_EMAIL,
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    });

    const testCandidate = {
      name: 'Integration Test Candidate',
      email: 'candidate.test@example.com',
      phone: '+1 555-123-4567',
      position: 'Senior Systems Architect',
      portfolio: 'https://github.com/example/portfolio',
      coverNote: 'Excited about the enterprise delivery model.',
      resumeFileName: 'test_resume.pdf',
      resumeBase64: 'dGVzdCByZXN1bWUgY29udGVudA==',
      recipient: 'attacker@malicious.com', // Attempted override from client
    };

    const response = await request(app)
      .post('/api/careers/apply')
      .send(testCandidate);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.applicationId).toMatch(/^HSC-APP-/);
    expect(response.body.candidateName).toBe(testCandidate.name);
    expect(response.body.position).toBe(testCandidate.position);

    // Verify recipient address is strictly fixed to hscglobalenterprises5@gmail.com
    expect(response.body.dispatchedTo).toBe('hscglobalenterprises5@gmail.com');

    // Verify Apps Script webhook call payload
    expect(capturedRequestUrl).toBe('https://script.google.com/macros/s/AKfycb_SIMULATED_TEST_DEPLOYMENT_ID/exec');
    expect(capturedPayload).toBeDefined();
    expect(capturedPayload.secret).toBe('test-secret-token-12345');
    expect(capturedPayload.name).toBe(testCandidate.name);
    expect(capturedPayload.email).toBe(testCandidate.email);
    expect(capturedPayload.resumeFileName).toBe('test_resume.pdf');
    expect(capturedPayload.resumeBase64).toBe('dGVzdCByZXN1bWUgY29udGVudA==');
  });

  it('POST /api/careers/apply should return error when Apps Script rejects shared secret (401)', async () => {
    vi.spyOn(globalThis, 'fetch').mockImplementation(async () => {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Unauthorized: Shared secret is missing or does not match.',
        }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    });

    const response = await request(app)
      .post('/api/careers/apply')
      .send({
        name: 'Unauthorized Candidate',
        email: 'unauthorized@example.com',
        phone: '1234567890',
        position: 'QA Engineer',
      });

    // Must return failure and NOT false success!
    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toContain('Unauthorized');
  });

  it('POST /api/careers/apply should return 502/error when Apps Script fails with MailApp error', async () => {
    vi.spyOn(globalThis, 'fetch').mockImplementation(async () => {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Google Apps Script MailApp Error: Email quota exceeded for today.',
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    });

    const response = await request(app)
      .post('/api/careers/apply')
      .send({
        name: 'Alex Johnson',
        email: 'alex@example.com',
        phone: '1234567890',
        position: 'Backend Developer',
      });

    // Must return failure and NOT false success!
    expect(response.status).toBe(500);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toContain('Email quota exceeded');
  });

  it('POST /api/careers/apply should return 504 Gateway Timeout when Apps Script times out', async () => {
    vi.spyOn(globalThis, 'fetch').mockImplementation(async () => {
      const abortErr = new Error('The operation was aborted');
      abortErr.name = 'AbortError';
      throw abortErr;
    });

    const response = await request(app)
      .post('/api/careers/apply')
      .send({
        name: 'Alex Johnson',
        email: 'alex@example.com',
        phone: '1234567890',
        position: 'Backend Developer',
      });

    expect(response.status).toBe(504);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toContain('timed out');
  });

  it('POST /api/careers/apply should return 503 when GOOGLE_APPS_SCRIPT_URL is not configured', async () => {
    delete process.env.GOOGLE_APPS_SCRIPT_URL;

    const response = await request(app)
      .post('/api/careers/apply')
      .send({
        name: 'Alex Johnson',
        email: 'alex@example.com',
        phone: '1234567890',
        position: 'Backend Developer',
      });

    expect(response.status).toBe(503);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toContain('GOOGLE_APPS_SCRIPT_URL');
  });
});
