# HSC Global Services - Careers Portal Email Delivery Setup Guide

This guide provides instructions for deploying and configuring real recruitment email delivery using Google Apps Script and `MailApp`.

---

## Architecture Overview

```
[Candidate Browser (React SPA)]
             │
             │ POST /api/careers/apply (Candidate Details + Base64 Resume)
             ▼
[Website Backend (Express server.ts / Vercel Serverless api/careers/apply.ts)]
             │
             │ Validates fields, allowed extensions (.pdf, .doc, .docx),
             │ enforeces 20MB decoded limit (MailApp envelope safety),
             │ generates unique HSC-APP tracking ID, checks deduplication
             ▼
[Google Apps Script Web App (doPost Handler with MailApp)]
             │
             │ Verifies SHARED_SECRET
             │ Converts base64 to binary blob attachment
             │ Formats branded HTML + Plain text email
             ▼
[Recruitment Inbox: hscglobalenterprises5@gmail.com]
```

---

## Step 1: Create the Google Apps Script Project

1. Log into your Google account (using `hscglobalenterprises5@gmail.com` or an account authorized to send recruitment emails).
2. Navigate to [script.google.com](https://script.google.com/).
3. Click **+ New project** in the top left.
4. Rename the project from *Untitled project* to **`HSC Global Careers Email Dispatcher`**.

---

## Step 2: Add the Script Code

1. In the Apps Script code editor, delete any template code in `Code.gs`.
2. Copy the entire contents of `google-apps-script/Code.gs` from this repository and paste it into `Code.gs`.
3. Click **Save project** (disk icon or `Ctrl+S` / `Cmd+S`).

---

## Step 3: Configure the Shared Secret Token

To prevent unauthorized third parties from triggering emails via your Apps Script URL, configure a shared secret:

1. In the left sidebar of the Apps Script editor, click the **Project Settings** (gear icon ⚙️).
2. Scroll down to the **Script Properties** section.
3. Click **Add script property**.
   - **Property**: `SHARED_SECRET`
   - **Value**: Enter a strong, random alphanumeric string (e.g., `hsc_recruitment_sec_9f7a2c84d1e05b38`).
4. Click **Save script properties**.

---

## Step 4: Deploy as a Web App

1. In the top right corner of the Apps Script editor, click **Deploy** > **New deployment**.
2. Click the gear icon next to "Select type" and select **Web app**.
3. Fill in the deployment details:
   - **Description**: `HSC Careers Portal Webhook v1`
   - **Execute as**: `Me (your_email@gmail.com)`
   - **Who has access**: `Anyone` *(Note: Access must be set to "Anyone" so that your server backend can POST payloads. Security is enforced by the `SHARED_SECRET` authentication check inside `doPost`)*.
4. Click **Deploy**.
5. When prompted with **Authorization required**, click **Authorize access**:
   - Choose your Google account.
   - Click **Advanced** > **Go to HSC Global Careers Email Dispatcher (unsafe)**.
   - Click **Allow** to grant permissions for `MailApp.sendEmail`.
6. Once deployed, copy the **Web app URL**. It will look like:
   ```
   https://script.google.com/macros/s/AKfycbx.../exec
   ```

---

## Step 5: Configure Backend Environment Variables

### For Local Development:
Create or update your `.env` file in the project root:
```env
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/AKfycbx.../exec
GOOGLE_APPS_SCRIPT_SECRET=hsc_recruitment_sec_9f7a2c84d1e05b38
```

Restart your local dev server:
```bash
npm run dev
```

### For Production Hosting (e.g. Node Server, Docker, Render, Railway):
Add `GOOGLE_APPS_SCRIPT_URL` and `GOOGLE_APPS_SCRIPT_SECRET` into your host's environment settings.

---

## Step 6: Deploying to Vercel

The application is structured to run both as a persistent Node.js server (`server.ts`) and on Vercel via Serverless Functions:

1. Push your repository to GitHub / GitLab.
2. In the [Vercel Dashboard](https://vercel.com/):
   - Click **Add New Project** and import your repository.
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Under **Environment Variables**, add:
   - `GOOGLE_APPS_SCRIPT_URL`: `<your Apps Script web app URL>`
   - `GOOGLE_APPS_SCRIPT_SECRET`: `<your shared secret>`
4. Click **Deploy**.
5. Verify that the backend is active:
   Open `https://<your-vercel-domain>/api/health` in your browser. It should return:
   ```json
   {
     "status": "ok",
     "service": "HSC Global Services Careers & Web Backend (Vercel Serverless)",
     "recruitmentEmail": "hscglobalenterprises5@gmail.com",
     "emailServiceConfigured": true
   }
   ```

---

## Step 7: End-to-End Application Delivery Test

1. Open the live Careers Portal: `/careers` (e.g., `https://<your-domain>/careers`).
2. Click **Apply for Role** on any open opportunity (e.g., *Senior Full-Stack Engineer*).
3. Enter candidate details:
   - **Full Name**: Your test name
   - **Email Address**: Your personal test email
   - **Contact Phone**: `+91 98765 43210`
   - **Portfolio**: `https://linkedin.com/in/test`
   - **Resume**: Attach a sample `.pdf` or `.docx` file (under 20MB)
4. Click **Submit Candidate Profile**.
5. Verification:
   - The UI modal shows **Application Dispatched** with a tracking ID (`HSC-APP-...`) and confirmed dispatch to `hscglobalenterprises5@gmail.com`.
   - Check the inbox of **`hscglobalenterprises5@gmail.com`**:
     - Subject: `[HSC Careers Application] Senior Full-Stack Engineer - <Name> (<ID>)`
     - Clean, branded HTML email table with applicant details.
     - Attached original resume file.

---

## Key Constraints & Security Details

1. **Fixed Recipient Address**: Recipient is hardcoded to `hscglobalenterprises5@gmail.com` across the client, backend server, and Apps Script. Client-side attempts to pass custom recipient addresses are rejected/ignored.
2. **Quota & Attachment Limits**:
   - Google `MailApp` enforces a strict **25 MB total MIME message size limit**.
   - Because Base64 attachments experience ~33% MIME overhead, decoded attachments cannot exceed **20 MB**. The server enforces this with explicit user-friendly error messages.
   - Free Gmail accounts have a sending quota of 100 emails/day; Google Workspace accounts have 1,500 emails/day.
3. **Deduplication**:
   - Submissions with identical candidate fingerprints (email, role, resume size) within a 5-minute window are deduplicated to avoid sending double emails if a user double-clicks or experiences a retry.
4. **Privacy**:
   - The server and Apps Script never log raw resume contents or shared secret tokens into console logs.
