/**
 * HSC Global Services - Recruitment Portal Email Dispatcher
 * Google Apps Script Web App Handler
 *
 * This script receives job application payloads from the HSC Global Services
 * website backend and sends a branded notification email with the applicant's
 * attached resume to hscglobalenterprises5@gmail.com using MailApp.
 *
 * Setup Instructions:
 * 1. Open Google Apps Script: https://script.google.com/
 * 2. Create a new project: "HSC Global Services Careers Dispatcher"
 * 3. Paste this code into Code.gs
 * 4. In Project Settings -> Script Properties, add:
 *    - Key: SHARED_SECRET
 *    - Value: <generate a random secure secret token>
 * 5. Deploy -> New Deployment -> Web app:
 *    - Execute as: Me (your Google account)
 *    - Who has access: Anyone
 * 6. Copy the Web App URL and set it in your backend environment variables:
 *    - GOOGLE_APPS_SCRIPT_URL=<your web app URL>
 *    - GOOGLE_APPS_SCRIPT_SECRET=<the shared secret configured in step 4>
 */

// Fixed recruitment email destination - never overridden by client requests
var RECRUITMENT_EMAIL = 'hscglobalenterprises5@gmail.com';

// Maximum attachment size supported by Google MailApp (20 MB decoded binary, leaving 5MB headroom for 25MB MIME envelope)
var MAX_ATTACHMENT_BYTES = 20 * 1024 * 1024;

// Allowed resume file extensions
var ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx'];

/**
 * HTTP GET Handler - Health Check & Diagnostics
 */
function doGet(e) {
  var response = {
    status: 'ok',
    service: 'HSC Global Services Careers Email Dispatcher',
    recipient: RECRUITMENT_EMAIL,
    maxAttachmentSizeMB: 20,
    allowedExtensions: ALLOWED_EXTENSIONS,
    timestamp: new Date().toISOString()
  };

  return ContentService.createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * HTTP POST Handler - Process Application & Send Email
 */
function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return createJsonResponse(400, {
        success: false,
        error: 'Missing request payload. Expected JSON body.'
      });
    }

    var payload;
    try {
      payload = JSON.parse(e.postData.contents);
    } catch (parseErr) {
      return createJsonResponse(400, {
        success: false,
        error: 'Invalid JSON payload: ' + parseErr.message
      });
    }

    // 1. Authenticate Request via Shared Secret
    var configuredSecret = PropertiesService.getScriptProperties().getProperty('SHARED_SECRET');
    if (configuredSecret && configuredSecret.trim() !== '') {
      if (!payload.secret || payload.secret !== configuredSecret) {
        return createJsonResponse(401, {
          success: false,
          error: 'Unauthorized: Shared secret is missing or does not match.'
        });
      }
    }

    // 2. Validate Candidate Required Fields
    var name = (payload.name || '').toString().trim();
    var email = (payload.email || '').toString().trim().toLowerCase();
    var phone = (payload.phone || '').toString().trim();
    var position = (payload.position || '').toString().trim();
    var applicationId = (payload.applicationId || '').toString().trim() || ('HSC-APP-' + Utilities.getUuid().substring(0, 8).toUpperCase());
    var portfolio = (payload.portfolio || '').toString().trim();
    var coverNote = (payload.coverNote || '').toString().trim();
    var receivedAt = (payload.receivedAt || '').toString().trim() || new Date().toISOString();

    if (!name) {
      return createJsonResponse(400, { success: false, error: 'Candidate name is required.' });
    }

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return createJsonResponse(400, { success: false, error: 'Valid candidate email address is required.' });
    }

    if (!phone || phone.replace(/\D/g, '').length < 7) {
      return createJsonResponse(400, { success: false, error: 'Valid phone number with at least 7 digits is required.' });
    }

    if (!position) {
      return createJsonResponse(400, { success: false, error: 'Target position is required.' });
    }

    // 3. Process & Validate Resume Attachment (if provided)
    var attachments = [];
    var resumeFileName = (payload.resumeFileName || '').toString().trim();
    var resumeBase64 = (payload.resumeBase64 || '').toString().trim();

    if (resumeBase64) {
      // Validate file extension
      var ext = '';
      var lastDot = resumeFileName.lastIndexOf('.');
      if (lastDot !== -1) {
        ext = resumeFileName.substring(lastDot).toLowerCase();
      }

      var isAllowedExt = false;
      for (var i = 0; i < ALLOWED_EXTENSIONS.length; i++) {
        if (ALLOWED_EXTENSIONS[i] === ext) {
          isAllowedExt = true;
          break;
        }
      }

      if (!isAllowedExt) {
        return createJsonResponse(400, {
          success: false,
          error: 'Unsupported resume file type (' + ext + '). Only .pdf, .doc, and .docx files are permitted.'
        });
      }

      // Clean base64 string (remove data URI scheme if present)
      var cleanedBase64 = resumeBase64.replace(/^data:[^;]+;base64,/, '');

      // Decode base64
      var fileBytes;
      try {
        fileBytes = Utilities.base64Decode(cleanedBase64);
      } catch (decodeErr) {
        return createJsonResponse(400, {
          success: false,
          error: 'Invalid base64 encoding for resume attachment.'
        });
      }

      // Check decoded size limit (MailApp 25MB total message limit)
      if (fileBytes.length > MAX_ATTACHMENT_BYTES) {
        var sizeMB = (fileBytes.length / (1024 * 1024)).toFixed(1);
        return createJsonResponse(400, {
          success: false,
          error: 'Decoded resume size (' + sizeMB + ' MB) exceeds the 20 MB Google MailApp attachment limit.'
        });
      }

      // Sanitize filename
      var safeName = resumeFileName.replace(/[^a-zA-Z0-9._-]/g, '_');
      if (!safeName) {
        safeName = applicationId + '_resume' + ext;
      }

      // Determine MIME type
      var mimeType = 'application/octet-stream';
      if (ext === '.pdf') {
        mimeType = 'application/pdf';
      } else if (ext === '.docx') {
        mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      } else if (ext === '.doc') {
        mimeType = 'application/msword';
      }

      var blob = Utilities.newBlob(fileBytes, mimeType, safeName);
      attachments.push(blob);
    }

    // 4. Construct Branded Email Notification
    var emailSubject = '[HSC Careers Application] ' + position + ' - ' + name + ' (' + applicationId + ')';

    var plainTextBody = [
      '===========================================================',
      'HSC GLOBAL SERVICES - NEW CAREER APPLICATION',
      '===========================================================',
      '',
      'Application Reference : ' + applicationId,
      'Received At           : ' + receivedAt,
      'Position Applied      : ' + position,
      '',
      'CANDIDATE INFORMATION:',
      '-----------------------------------------------------------',
      'Full Name             : ' + name,
      'Email Address         : ' + email,
      'Phone Number          : ' + phone,
      'Portfolio / Profile   : ' + (portfolio || 'Not provided'),
      'Resume Attachment     : ' + (resumeFileName ? resumeFileName + ' (' + attachments.length + ' file attached)' : 'None'),
      '',
      coverNote ? 'COVER NOTE:\n-----------------------------------------------------------\n' + coverNote + '\n\n' : '',
      '-----------------------------------------------------------',
      'This email was automatically dispatched by the HSC Global Services Careers Portal.',
      'Recipient: ' + RECRUITMENT_EMAIL
    ].join('\n');

    var htmlBody = [
      '<!DOCTYPE html>',
      '<html>',
      '<head>',
      '<meta charset="utf-8">',
      '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
      '</head>',
      '<body style="margin:0;padding:24px;background-color:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Roboto,Helvetica,Arial,sans-serif;color:#1e293b;">',
      '  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #cbd5e1;box-shadow:0 4px 12px rgba(0,0,0,0.06);">',
      '    <!-- Header -->',
      '    <tr>',
      '      <td style="background:#071a2b;padding:28px 32px;border-bottom:3px solid #00d9f5;">',
      '        <table width="100%" cellpadding="0" cellspacing="0">',
      '          <tr>',
      '            <td>',
      '              <h1 style="margin:0;font-size:22px;color:#ffffff;font-weight:700;letter-spacing:-0.02em;">HSC Global Services</h1>',
      '              <p style="margin:4px 0 0 0;font-size:13px;color:#00d9f5;text-transform:uppercase;letter-spacing:0.12em;font-weight:600;">Careers Portal &bull; Candidate Application</p>',
      '            </td>',
      '            <td align="right">',
      '              <span style="display:inline-block;padding:6px 12px;background:rgba(0,217,245,0.15);border:1px solid #00d9f5;border-radius:20px;font-size:11px;color:#00d9f5;font-weight:600;">' + escapeHtml(position) + '</span>',
      '            </td>',
      '          </tr>',
      '        </table>',
      '      </td>',
      '    </tr>',
      '    <!-- Reference Badge -->',
      '    <tr>',
      '      <td style="padding:16px 32px;background:#f8fafc;border-bottom:1px solid #e2e8f0;font-size:13px;color:#64748b;">',
      '        Application Reference: <strong style="color:#0f172a;font-family:monospace;">' + escapeHtml(applicationId) + '</strong> &bull; ' + escapeHtml(receivedAt),
      '      </td>',
      '    </tr>',
      '    <!-- Candidate Details -->',
      '    <tr>',
      '      <td style="padding:28px 32px;">',
      '        <h2 style="margin:0 0 16px 0;font-size:16px;color:#0f172a;text-transform:uppercase;letter-spacing:0.05em;border-bottom:2px solid #e2e8f0;padding-bottom:8px;">Candidate Profile</h2>',
      '        <table width="100%" cellpadding="8" cellspacing="0" style="font-size:14px;border-collapse:collapse;">',
      '          <tr style="border-bottom:1px solid #f1f5f9;">',
      '            <td width="35%" style="color:#64748b;font-weight:600;">Full Name:</td>',
      '            <td style="color:#0f172a;font-weight:700;">' + escapeHtml(name) + '</td>',
      '          </tr>',
      '          <tr style="border-bottom:1px solid #f1f5f9;">',
      '            <td style="color:#64748b;font-weight:600;">Email Address:</td>',
      '            <td><a href="mailto:' + escapeHtml(email) + '" style="color:#0284c7;text-decoration:none;font-weight:600;">' + escapeHtml(email) + '</a></td>',
      '          </tr>',
      '          <tr style="border-bottom:1px solid #f1f5f9;">',
      '            <td style="color:#64748b;font-weight:600;">Phone Number:</td>',
      '            <td><a href="tel:' + escapeHtml(phone) + '" style="color:#0284c7;text-decoration:none;font-weight:600;">' + escapeHtml(phone) + '</a></td>',
      '          </tr>',
      '          <tr style="border-bottom:1px solid #f1f5f9;">',
      '            <td style="color:#64748b;font-weight:600;">Target Role:</td>',
      '            <td style="color:#0f172a;font-weight:600;">' + escapeHtml(position) + '</td>',
      '          </tr>',
      '          <tr style="border-bottom:1px solid #f1f5f9;">',
      '            <td style="color:#64748b;font-weight:600;">Portfolio / Profile:</td>',
      '            <td>' + (portfolio ? '<a href="' + escapeHtml(portfolio) + '" target="_blank" style="color:#0284c7;text-decoration:underline;">' + escapeHtml(portfolio) + '</a>' : '<span style="color:#94a3b8;">Not provided</span>') + '</td>',
      '          </tr>',
      '          <tr>',
      '            <td style="color:#64748b;font-weight:600;">Resume File:</td>',
      '            <td>' + (resumeFileName ? '<strong style="color:#059669;">&#128206; ' + escapeHtml(resumeFileName) + '</strong> (Attached)' : '<span style="color:#94a3b8;">None attached</span>') + '</td>',
      '          </tr>',
      '        </table>',
      (coverNote ? (
        '        <div style="margin-top:24px;padding:16px;background:#f8fafc;border-left:4px solid #00d9f5;border-radius:4px;">' +
        '          <p style="margin:0 0 6px 0;font-size:12px;font-weight:700;color:#475569;text-transform:uppercase;">Cover Note / Remarks:</p>' +
        '          <p style="margin:0;font-size:13px;line-height:1.6;color:#1e293b;white-space:pre-wrap;">' + escapeHtml(coverNote) + '</p>' +
        '        </div>'
      ) : ''),
      '      </td>',
      '    </tr>',
      '    <!-- Footer -->',
      '    <tr>',
      '      <td style="background:#f8fafc;padding:18px 32px;border-top:1px solid #e2e8f0;font-size:12px;color:#94a3b8;text-align:center;">',
      '        Sent automatically to <strong style="color:#475569;">' + RECRUITMENT_EMAIL + '</strong> via HSC Careers Dispatcher.<br/>',
      '        Candidate contact email: <a href="mailto:' + escapeHtml(email) + '" style="color:#0284c7;">' + escapeHtml(email) + '</a>',
      '      </td>',
      '    </tr>',
      '  </table>',
      '</body>',
      '</html>'
    ].join('\n');

    // 5. Send Email via MailApp
    var mailOptions = {
      to: RECRUITMENT_EMAIL,
      subject: emailSubject,
      body: plainTextBody,
      htmlBody: htmlBody,
      name: 'HSC Global Services Careers'
    };

    if (attachments.length > 0) {
      mailOptions.attachments = attachments;
    }

    MailApp.sendEmail(mailOptions);

    // 6. Return Success Confirmation
    return createJsonResponse(200, {
      success: true,
      message: 'Application and resume accepted and dispatched to recruitment email.',
      applicationId: applicationId,
      recipient: RECRUITMENT_EMAIL,
      hasAttachment: attachments.length > 0,
      candidateName: name,
      position: position,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    return createJsonResponse(500, {
      success: false,
      error: 'Google Apps Script MailApp Error: ' + (error.message || error.toString())
    });
  }
}

/**
 * Helper to build JSON responses with proper headers
 */
function createJsonResponse(statusCode, data) {
  var output = ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
  return output;
}

/**
 * HTML Escaping Helper to prevent injection in generated email HTML
 */
function escapeHtml(str) {
  if (!str) return '';
  return str.toString()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Diagnostic test function for script editor
 */
function testSendSampleEmail() {
  var mockEvent = {
    postData: {
      contents: JSON.stringify({
        secret: PropertiesService.getScriptProperties().getProperty('SHARED_SECRET') || '',
        applicationId: 'HSC-TEST-' + new Date().getTime(),
        name: 'Test Applicant',
        email: 'applicant@example.com',
        phone: '+91 98765 43210',
        position: 'Senior Full-Stack Engineer',
        portfolio: 'https://github.com/example',
        coverNote: 'Diagnostic verification test from Google Apps Script editor.',
        resumeFileName: 'test_sample.pdf',
        resumeBase64: Utilities.base64Encode('Sample test PDF content for diagnostic email')
      })
    }
  };

  var res = doPost(mockEvent);
  Logger.log(res.getContent());
}
