import { RECRUITMENT_EMAIL, isPlaceholderAppsScriptUrl } from '../src/server/careersService';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
  const isConfigured = Boolean(scriptUrl && !isPlaceholderAppsScriptUrl(scriptUrl));
  res.status(200).json({
    status: 'ok',
    service: 'HSC Global Services Careers & Web Backend (Vercel Serverless)',
    recruitmentEmail: RECRUITMENT_EMAIL,
    emailServiceConfigured: isConfigured,
    timestamp: new Date().toISOString(),
  });
}
