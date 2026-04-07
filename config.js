// ─────────────────────────────────────────────
//  KARIGAR CONFIG — fill these in before launch
// ─────────────────────────────────────────────

const KARIGAR_CONFIG = {

  // 1. Your Google Apps Script Web App URL
  //    (see SETUP.md step 3 for how to get this)
  SHEET_WEBAPP_URL: 'https://script.google.com/macros/s/AKfycby5FYqhbcA-Jtana_ym4BIP1G34b6Txlfpb6ruxW5bufPj3U6VTV0idB7MW74i0WkdS/exec',

  // 2. Your WhatsApp Business number (with country code, no +)
  //    Customers will be redirected here for support
  WHATSAPP_NUMBER: '923208237973',

  // 3. Your business name
  BUSINESS_NAME: 'Karigar',

  // 4. Your city (shown in the app)
  CITY: 'Karachi',

  // 5. Coordination fee you charge customers (Rs.)
  BOOKING_FEE: 150,
};

// ─────────────────────────────────────────────
//  Google Sheets submit function
//  Sends booking data to your sheet via Apps Script
// ─────────────────────────────────────────────
async function submitToSheet(booking) {
  if (KARIGAR_CONFIG.SHEET_WEBAPP_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
    // Demo mode — logs to console instead of sending
    console.log('📋 Booking (demo mode):', booking);
    await new Promise(r => setTimeout(r, 1000)); // simulate delay
    return { success: true };
  }

  const params = new URLSearchParams({ ...booking, action: 'addBooking' });
  const res = await fetch(KARIGAR_CONFIG.SHEET_WEBAPP_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });
  if (!res.ok) throw new Error('Sheet error');
  return res.json();
}

async function getBookings() {
  if (KARIGAR_CONFIG.SHEET_WEBAPP_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
    return getMockBookings();
  }
  const url = `${KARIGAR_CONFIG.SHEET_WEBAPP_URL}?action=getBookings`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Fetch error');
  return res.json();
}

async function updateBooking(rowId, updates) {
  if (KARIGAR_CONFIG.SHEET_WEBAPP_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
    console.log('Update booking (demo):', rowId, updates);
    return { success: true };
  }
  const params = new URLSearchParams({ action: 'updateBooking', rowId, ...updates });
  const res = await fetch(KARIGAR_CONFIG.SHEET_WEBAPP_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });
  return res.json();
}

async function getWorkers() {
  if (KARIGAR_CONFIG.SHEET_WEBAPP_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
    return getMockWorkers();
  }
  const url = `${KARIGAR_CONFIG.SHEET_WEBAPP_URL}?action=getWorkers`;
  const res = await fetch(url);
  return res.json();
}

// ── Mock data for demo mode ──
function getMockBookings() {
  return [
    { id: 1, timestamp: '07/04/2025, 10:30', name: 'Sara Ahmed', phone: '0300-1112222', service: 'AC Repair', area: 'DHA Phase 5', address: 'Street 12', time: 'Abhi (1 ghante mein)', notes: 'AC thanda nahin kar raha', status: 'New', worker: '', fee: '' },
    { id: 2, timestamp: '07/04/2025, 11:15', name: 'Bilal Khan', phone: '0311-3334444', service: 'Electrician', area: 'Gulshan-e-Iqbal', address: 'Block 13D', time: 'Aaj baad mein — 2 baje', notes: '', status: 'Assigned', worker: 'Hamid Butt', fee: '150' },
    { id: 3, timestamp: '07/04/2025, 09:00', name: 'Nadia Rauf', phone: '0333-5556666', service: 'Plumber', area: 'Clifton Block 5', address: '', time: 'Kal subah', notes: 'Leakage hai bathroom mein', status: 'Done', worker: 'Rashid Khan', fee: '150' },
    { id: 4, timestamp: '07/04/2025, 12:00', name: 'Omar Sheikh', phone: '0321-7778888', service: 'AC Repair', area: 'PECHS Block 2', address: 'House 45', time: 'Abhi (1 ghante mein)', notes: '', status: 'New', worker: '', fee: '' },
  ];
}

function getMockWorkers() {
  return [
    { id: 1, name: 'Usman Malik', phone: '0311-1010101', trade: 'AC Repair', areas: 'DHA, Clifton', status: 'Available', rating: 4.8, jobs: 23, cnic: '42201-XXXXXXX-X' },
    { id: 2, name: 'Hamid Butt', phone: '0333-2020202', trade: 'Electrician', areas: 'Gulshan, PECHS', status: 'Busy', rating: 4.6, jobs: 17, cnic: '42201-XXXXXXX-X' },
    { id: 3, name: 'Rashid Khan', phone: '0321-3030303', trade: 'Plumber', areas: 'Clifton, DHA', status: 'Available', rating: 4.9, jobs: 31, cnic: '42201-XXXXXXX-X' },
    { id: 4, name: 'Tariq Mehmood', phone: '0300-4040404', trade: 'Carpenter', areas: 'Gulshan, Johar', status: 'Available', rating: 4.5, jobs: 12, cnic: '42201-XXXXXXX-X' },
    { id: 5, name: 'Zubair Ahmed', phone: '0345-5050505', trade: 'AC Repair', areas: 'PECHS, Gulshan', status: 'Available', rating: 4.7, jobs: 19, cnic: '42201-XXXXXXX-X' },
  ];
}
