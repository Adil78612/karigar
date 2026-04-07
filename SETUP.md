# Karigar MVP — Setup Guide
## Go live in 20 minutes

---

## What you get
- `index.html` — Customer booking app (Urdu, mobile-first)
- `dashboard.html` — Your dispatcher dashboard
- `config.js` — Your settings (fill this in)
- `google-apps-script.js` — Backend that connects to Google Sheets

---

## Step 1 — Create your Google Sheet (2 min)

1. Go to sheets.google.com → Create new sheet
2. Name it: **Karigar**
3. That's it — the script creates the tabs automatically

---

## Step 2 — Add the backend script (5 min)

1. In your Google Sheet: **Extensions → Apps Script**
2. Delete everything in Code.gs
3. Copy everything from `google-apps-script.js` and paste it
4. Click **Save** (Ctrl+S)

---

## Step 3 — Deploy as Web App (5 min)

1. Click **Deploy → New deployment**
2. Click the gear icon → select **Web App**
3. Set:
   - Description: `Karigar backend`
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click **Deploy**
5. Copy the **Web App URL** — it looks like:
   `https://script.google.com/macros/s/XXXXXXXXXX/exec`

---

## Step 4 — Add your URL to config.js (1 min)

Open `config.js` and replace:
```
SHEET_WEBAPP_URL: 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE',
```
With your actual URL:
```
SHEET_WEBAPP_URL: 'https://script.google.com/macros/s/XXXXXX/exec',
```

Also update:
- `WHATSAPP_NUMBER` — your WhatsApp Business number (923001234567 format)
- `BUSINESS_NAME` — your brand name
- `BOOKING_FEE` — what you charge customers (Rs.)

---

## Step 5 — Host it free (5 min)

**Option A — Netlify (easiest, free)**
1. Go to netlify.com → Sign up free
2. Drag your karigar folder onto the Netlify dashboard
3. You get a URL like: `https://karigar-xyz.netlify.app`
4. Share `index.html` link with customers
5. Open `dashboard.html` yourself to dispatch

**Option B — GitHub Pages (also free)**
1. Create a GitHub account
2. New repo → upload all files
3. Settings → Pages → Deploy from main branch
4. URL: `https://yourusername.github.io/karigar`

---

## Step 6 — Add your first workers

1. Open `dashboard.html`
2. Click **+ Add Worker**
3. Fill in name, phone, trade, areas, CNIC
4. They appear in your roster immediately

---

## How it works day-to-day

1. Customer visits your `index.html` link and books
2. You get notified (check dashboard or set up email alerts in the script)
3. Open dashboard → click **Assign** next to the job
4. Select the right worker → WhatsApp opens automatically with the job details
5. Worker gets the message, calls the customer
6. After job done → click **Done ✓** on the dashboard
7. Your Google Sheet has a full record of everything

---

## Optional — Email alerts for new bookings

In `google-apps-script.js`, find the `notifyDispatcher` function and uncomment:
```js
MailApp.sendEmail('YOUR_EMAIL@gmail.com', ...)
```
Add your email. Now every new booking emails you instantly.

---

## Sharing with customers

Send this message to your network:
> "AC, bijli, plumbing, ya carpentry ka kaam chahiye?
> Hum verified karigars bhejte hain aapke ghar.
> Book karein: [YOUR LINK]"

---

## Cost
- Google Sheets: **Free**
- Netlify hosting: **Free**
- WhatsApp Business: **Free**
- Total: **Rs. 0**
