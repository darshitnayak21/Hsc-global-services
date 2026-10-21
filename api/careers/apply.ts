import type { IncomingMessage, ServerResponse } from 'http';
import {
  RECRUITMENT_EMAIL,
  generateApplicationId,
  validateApplication,
  dispatchToAppsScript,
} from '../../src/server/careersService';

/**
 * Vercel Serverless Function Handler: POST /api/careers/apply
 *
 * Enables seamless serverless execution when hosted on Vercel without
 * requiring a persistent Node.js express server process.
 */
export default async function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed. Use POST.' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const validation = validateApplication(body);

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

    if (!dispatchResult.success) {
      return res.status(dispatchResult.httpStatus || 502).json({
        success: false,
        error: dispatchResult.error || 'Failed to dispatch application to recruitment email service.',
        applicationId,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Your application and resume have been successfully transmitted and accepted by our recruitment email service.',
      applicationId: dispatchResult.applicationId || applicationId,
      dispatchedTo: RECRUITMENT_EMAIL,
      candidateName: candidate.name,
      position: candidate.position,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: 'An unexpected internal error occurred while processing application on Vercel.',
    });
  }
}
