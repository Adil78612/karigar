// ════════════════════════════════════════════════════════════
//  KARIGAR — Google Apps Script Backend
//  Paste this entire file into:
//  Google Sheets → Extensions → Apps Script → replace Code.gs
//  Then: Deploy → New deployment → Web App → Anyone → Deploy
//  Copy the Web App URL into config.js
// ════════════════════════════════════════════════════════════

const SHEETS = {
  BOOKINGS: 'Bookings',
  WORKERS:  'Workers',
};

const BOOKING_COLS  = ['ID','Timestamp','Name','Phone','Service','Area','Address','Time','Notes','Status','Worker','Fee'];
const WORKER_COLS   = ['ID','Name','Phone','Trade','Areas','CNIC','Status','Rating','Jobs'];

// ── Entry point ──────────────────────────────────────────────
function doGet(e) {
  const action = e.parameter.action;
  try {
    if (action === 'getBookings') return jsonResponse(getBookings());
    if (action === 'getWorkers')  return jsonResponse(getWorkers());
    return jsonResponse({ error: 'Unknown action' });
  } catch(err) {
    return jsonResponse({ error: err.message });
  }
}

function doPost(e) {
  const p = e.parameter;
  try {
    if (p.action === 'addBooking')    return jsonResponse(addBooking(p));
    if (p.action === 'updateBooking') return jsonResponse(updateBooking(p));
    if (p.action === 'addWorker')     return jsonResponse(addWorker(p));
    return jsonResponse({ error: 'Unknown action' });
  } catch(err) {
    return jsonResponse({ error: err.message });
  }
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── Get sheet, create if missing ─────────────────────────────
function getOrCreateSheet(name, headers) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// ── Bookings ─────────────────────────────────────────────────
function getBookings() {
  const sheet = getOrCreateSheet(SHEETS.BOOKINGS, BOOKING_COLS);
  const rows = sheet.getDataRange().getValues();
  if (rows.length <= 1) return [];
  return rows.slice(1).map((row, i) => ({
    id: row[0] || i + 2,
    timestamp: row[1], name: row[2], phone: row[3],
    service: row[4], area: row[5], address: row[6],
    time: row[7], notes: row[8], status: row[9],
    worker: row[10], fee: row[11],
  }));
}

function addBooking(p) {
  const sheet = getOrCreateSheet(SHEETS.BOOKINGS, BOOKING_COLS);
  const id = sheet.getLastRow(); // use row number as ID
  const row = [
    id, p.timestamp, p.name, p.phone, p.service,
    p.area, p.address || '', p.time, p.notes || '',
    'New', '', ''
  ];
  sheet.appendRow(row);

  // Send yourself a WhatsApp notification via wa.me link (logged)
  Logger.log(`New booking: ${p.name} — ${p.service} — ${p.area}`);

  return { success: true, id };
}

function updateBooking(p) {
  const sheet = getOrCreateSheet(SHEETS.BOOKINGS, BOOKING_COLS);
  const rows = sheet.getDataRange().getValues();
  const rowId = parseInt(p.rowId);

  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0] == rowId) {
      const r = i + 1;
      if (p.status)  sheet.getRange(r, 10).setValue(p.status);
      if (p.worker)  sheet.getRange(r, 11).setValue(p.worker);
      if (p.fee)     sheet.getRange(r, 12).setValue(p.fee);
      return { success: true };
    }
  }
  return { error: 'Row not found' };
}

// ── Workers ──────────────────────────────────────────────────
function getWorkers() {
  const sheet = getOrCreateSheet(SHEETS.WORKERS, WORKER_COLS);
  const rows = sheet.getDataRange().getValues();
  if (rows.length <= 1) return [];
  return rows.slice(1).map((row, i) => ({
    id: row[0] || i + 2,
    name: row[1], phone: row[2], trade: row[3],
    areas: row[4], cnic: row[5], status: row[6],
    rating: row[7], jobs: row[8],
  }));
}

function addWorker(p) {
  const sheet = getOrCreateSheet(SHEETS.WORKERS, WORKER_COLS);
  const id = sheet.getLastRow();
  sheet.appendRow([id, p.name, p.phone, p.trade, p.areas, p.cnic || '', 'Available', 5.0, 0]);
  return { success: true, id };
}

// ── Utility: send email notification to yourself ─────────────
function notifyDispatcher(booking) {
  // Optional — add your email below to get notified on new bookings
  // MailApp.sendEmail('YOUR_EMAIL@gmail.com',
  //   `New Booking: ${booking.service} — ${booking.area}`,
  //   `Customer: ${booking.name}\nPhone: ${booking.phone}\nTime: ${booking.time}\nNotes: ${booking.notes}`
  // );
}
