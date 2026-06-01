# Casa Stegui Website Lead Automation

This branch adds the infrastructure for turning the Casa Stegui website inquiry form into a lead-capture system.

## Flow

Website inquiry → serverless endpoint → Google Apps Script webhook → Master Operations Workbook / Google Sheet → Gmail draft queue → follow-up rules → booking workflow.

## Files added

- `src/components/AutomatedInquiryForm.jsx` — reusable automated inquiry form.
- `api/lead.js` — Vercel-compatible serverless endpoint.
- `netlify/functions/lead.js` — Netlify-compatible serverless endpoint.
- `google-apps-script/CasaSteguiLeadAutomation.js` — Apps Script webhook that writes leads to the operating workbook and creates Gmail drafts.

## Required environment variables

### Frontend

`VITE_CASA_STEGUI_LEAD_ENDPOINT`

Use `/api/lead` for Vercel or `/.netlify/functions/lead` for Netlify.

### Backend

`CASA_STEGUI_LEAD_WEBHOOK_URL`

This is the deployed Google Apps Script Web App URL.

## Activation checklist

1. Open the Google Sheet version of the Casa Stegui Master Operations Workbook.
2. Add the `Website Form Submissions`, `Gmail Draft Queue`, and `Website Metrics` tabs from the v3.2 workbook.
3. Open Extensions → Apps Script.
4. Paste `google-apps-script/CasaSteguiLeadAutomation.js`.
5. Deploy as Web App: Execute as Me, Anyone with the link.
6. Copy the deployment URL to the hosting environment variable `CASA_STEGUI_LEAD_WEBHOOK_URL`.
7. Set the frontend environment variable `VITE_CASA_STEGUI_LEAD_ENDPOINT`.
8. Replace the current mailto contact form with `AutomatedInquiryForm`.
9. Submit one test inquiry and confirm the lead row and Gmail draft are created.

## Operating standard

Every website inquiry should receive a first response within 2 business hours. This is tracked in the v3.2 workbook under `Website Metrics`.
