// LutaMarkets – Receipt Generator (3-Step Wizard)

// =============================================
// LOGO BASE64 (embedded for reliable PNG export)
// =============================================
const RECEIPT_LOGO_BASE64 = 'data:image/jpeg;base64,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';
const LOGO_BASE64 = RECEIPT_LOGO_BASE64;

// =============================================
// PROGRAMS DATA
// =============================================
const PROGRAMS = [
  { name: 'Advanced Course', hasModes: true, prices: { online: 350, physical: 450 } },
  { name: 'Beginner to Advanced', hasModes: true, prices: { online: 400, physical: 450 } },
  { name: 'Financial Consultant', hasModes: false, prices: { custom: 0 } }
];

// =============================================
// STATE
// =============================================
let receiptState = {
  step: 1, useLiveRate: false, liveRate: null, manualRate: 2500, effectiveRate: 2500,
  selectedProgram: 0, selectedMode: 'online', priceUSD: 350, totalTZS: 0,
  paidAmountUSD: 0, paidCurrency: 'USD', paidInputValue: 0, remainingUSD: 0, status: '', installmentNumber: 0,
  studentName: '', country: 'Tanzania', region: '', district: '', ward: '', village: '', address: '',
  receiptNumber: '', receiptDate: ''
};

function resetReceiptState() {
  receiptState = {
    step: 1, useLiveRate: false, liveRate: null, manualRate: 2500, effectiveRate: 2500,
    selectedProgram: 0, selectedMode: 'online', priceUSD: 350, totalTZS: 0,
    paidAmountUSD: 0, paidCurrency: 'USD', paidInputValue: 0, remainingUSD: 0, status: '', installmentNumber: 0,
    studentName: '', country: 'Tanzania', region: '', district: '', ward: '', village: '', address: '',
    receiptNumber: '', receiptDate: ''
  };
}

// =============================================
// MAIN ENTRY
// =============================================
function openReceiptGenerator() {
  resetReceiptState();
  recalculate();
  renderReceiptOverlay();
  fetchLiveRate();
}

// =============================================
// FETCH LIVE RATE
// =============================================
async function fetchLiveRate() {
  try {
    const res = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    const data = await res.json();
    if (data?.rates?.TZS) {
      receiptState.liveRate = data.rates.TZS;
      const rateEl = document.getElementById('live-rate-value');
      const approxEl = document.getElementById('live-rate-approx');
      if (rateEl) rateEl.textContent = `1 USD = ${formatCurrency(Math.round(receiptState.liveRate))} TZS`;
      if (approxEl) approxEl.textContent = `Approx. ${formatCurrency(approximateRate(receiptState.liveRate))} TZS`;
      if (receiptState.useLiveRate) {
        receiptState.effectiveRate = approximateRate(receiptState.liveRate);
        recalculate(); updatePriceDisplay();
      }
    }
  } catch (err) {
    console.warn('Could not fetch live rate:', err);
    const rateEl = document.getElementById('live-rate-value');
    if (rateEl) rateEl.textContent = 'Rate unavailable';
  }
}

// =============================================
// CALCULATIONS
// =============================================
function recalculate() {
  const program = PROGRAMS[receiptState.selectedProgram];
  if (program.hasModes) receiptState.priceUSD = program.prices[receiptState.selectedMode];
  receiptState.totalTZS = receiptState.priceUSD * receiptState.effectiveRate;
  receiptState.remainingUSD = Math.max(0, receiptState.priceUSD - receiptState.paidAmountUSD);
  if (receiptState.paidAmountUSD >= receiptState.priceUSD && receiptState.priceUSD > 0) {
    receiptState.status = 'Fully Paid'; receiptState.installmentNumber = 0;
  } else if (receiptState.paidAmountUSD > 0) {
    receiptState.installmentNumber = 1; receiptState.status = 'Installment 1';
  } else {
    receiptState.status = ''; receiptState.installmentNumber = 0;
  }
}

function updatePriceDisplay() {
  const priceUsdEl = document.getElementById('price-usd');
  const totalTzsEl = document.getElementById('total-tzs');
  const paidEl = document.getElementById('paid-display');
  const remainingEl = document.getElementById('remaining-display');
  const statusEl = document.getElementById('payment-status');
  if (priceUsdEl) priceUsdEl.value = `$${formatCurrency(receiptState.priceUSD)}`;
  if (totalTzsEl) totalTzsEl.value = formatCurrency(receiptState.totalTZS);
  if (paidEl) paidEl.textContent = `$${formatCurrency(receiptState.paidAmountUSD)}`;
  if (remainingEl) remainingEl.textContent = `$${formatCurrency(receiptState.remainingUSD)}`;
  if (statusEl) {
    statusEl.className = receiptState.status === 'Fully Paid' ? 'badge badge-success' : receiptState.status ? 'badge badge-warning' : 'badge';
    statusEl.textContent = receiptState.status;
  }
}

// =============================================
// QR CODE HELPER
// =============================================
function generateQRCode(containerId, data) {
  const container = document.getElementById(containerId);
  if (!container || typeof QRCode === 'undefined') return;
  container.innerHTML = '';
  new QRCode(container, {
    text: data,
    width: 100,
    height: 100,
    colorDark: '#0f172a',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.M
  });
}

function buildQRData(student) {
  const data = {
    name: student.studentName || student.name,
    program: student.program || PROGRAMS[student.selectedProgram]?.name,
    fee: student.priceUSD + ' USD',
    paid: (student.paidAmountUSD || student.paidAmountUSD) + ' USD',
    remaining: (student.remainingUSD || student.remainingUSD) + ' USD',
    status: student.status,
    receipt: student.receiptNumber,
    date: formatDate(student.receiptDate || student.createdAt)
  };
  return JSON.stringify(data);
}

// =============================================
// RENDER OVERLAY
// =============================================
function renderReceiptOverlay() {
  const existing = document.getElementById('receipt-overlay');
  if (existing) existing.remove();
  const overlay = document.createElement('div');
  overlay.id = 'receipt-overlay';
  overlay.className = 'receipt-overlay';
  overlay.innerHTML = `
    <div class="receipt-overlay-header">
      <div class="header-left"><div class="receipt-icon">🧾</div><h3>Receipt Generator</h3></div>
      <button class="btn-icon" onclick="closeReceiptGenerator()" title="Close">✕</button>
    </div>
    <div class="receipt-overlay-body">
      <div class="wizard-container" id="wizard-container">${renderWizardContent()}</div>
    </div>`;
  document.body.appendChild(overlay);
}

function closeReceiptGenerator() {
  const o = document.getElementById('receipt-overlay');
  if (o) o.remove();
  Router.navigate('dashboard');
}

function renderWizardContent() {
  const stepLabels = ['1. Rate & Program', '2. Student Info', '3. Preview & Download'];
  let tabs = `<div class="wizard-tabs">`;
  stepLabels.forEach((l, i) => {
    tabs += `<button class="wizard-tab ${receiptState.step === i + 1 ? 'active' : ''} ${receiptState.step > i + 1 ? 'completed' : ''}">${l}</button>`;
  });
  tabs += `</div>`;
  const subtitles = ['Currency & Program Selection', 'Student Information', 'Preview & Download'];
  let header = `<div class="wizard-header"><h2>Generate New Receipt</h2><p class="wizard-subtitle">Step ${receiptState.step} of 3: ${subtitles[receiptState.step - 1]}</p></div>`;
  let body = '';
  switch (receiptState.step) { case 1: body = renderStep1(); break; case 2: body = renderStep2(); break; case 3: body = renderStep3(); break; }
  return header + tabs + body;
}

// =============================================
// STEP 1
// =============================================
function renderStep1() {
  const program = PROGRAMS[receiptState.selectedProgram];
  const showModes = program.hasModes;
  const isCustom = !program.hasModes;
  return `
    <div class="wizard-section">
      <div class="wizard-section-title"><span class="section-icon">💱</span> Currency Rate Selection</div>
      <div class="form-row" style="align-items:flex-start;">
        <div class="rate-display">
          <div class="rate-label">LIVE MARKET RATE</div>
          <div class="rate-value" id="live-rate-value">${receiptState.liveRate ? `1 USD = ${formatCurrency(Math.round(receiptState.liveRate))} TZS` : 'Loading...'}</div>
          <div class="rate-approx" id="live-rate-approx">${receiptState.liveRate ? `Approx. ${formatCurrency(approximateRate(receiptState.liveRate))} TZS` : ''}</div>
        </div>
        <div>
          <div class="toggle-container" style="margin-bottom:16px;">
            <label class="toggle"><input type="checkbox" id="live-rate-toggle" ${receiptState.useLiveRate ? 'checked' : ''} onchange="handleRateToggle(this)"><span class="toggle-slider"></span></label>
            <span class="toggle-label">Use Live Google Rate (Approx. to nearest hundred)</span>
          </div>
          <div id="manual-rate-container" style="${receiptState.useLiveRate ? 'display:none' : ''}">
            <label class="form-label">Manual Exchange Rate (TZS per 1 USD)</label>
            <input type="number" class="form-input" id="manual-rate-input" value="${receiptState.manualRate}" placeholder="e.g. 2500" onchange="handleManualRate(this.value)">
          </div>
        </div>
      </div>
    </div>
    <div class="wizard-section">
      <div class="wizard-section-title"><span class="section-icon">🎓</span> Program Selection</div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Select Program</label>
          <select class="form-select" id="program-select" onchange="handleProgramChange(this.value)">
            ${PROGRAMS.map((p, i) => `<option value="${i}" ${i === receiptState.selectedProgram ? 'selected' : ''}>${p.name}</option>`).join('')}
          </select>
        </div>
        <div class="form-group" id="mode-container" style="${showModes ? '' : 'display:none'}">
          <label class="form-label">Mode</label>
          <div class="radio-group">
            <label class="radio-label"><input type="radio" name="mode" value="online" ${receiptState.selectedMode === 'online' ? 'checked' : ''} onchange="handleModeChange('online')"> Online</label>
            <label class="radio-label"><input type="radio" name="mode" value="physical" ${receiptState.selectedMode === 'physical' ? 'checked' : ''} onchange="handleModeChange('physical')"> Physical</label>
          </div>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Course Fee (USD)</label>
          <input type="${isCustom ? 'number' : 'text'}" class="form-input ${isCustom ? '' : 'readonly'}" id="price-usd"
            value="${isCustom ? (receiptState.priceUSD || '') : '$' + formatCurrency(receiptState.priceUSD)}"
            ${isCustom ? 'placeholder="Enter price in USD" onchange="handleCustomPrice(this.value)"' : 'readonly'}>
        </div>
        <div class="form-group">
          <label class="form-label">Total Amount (TZS)</label>
          <input type="text" class="form-input readonly" id="total-tzs" value="${formatCurrency(receiptState.totalTZS)}" readonly>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Paid Amount</label>
          <div style="display:flex;gap:8px;">
            <select class="form-select" id="paid-currency" onchange="handlePaidCurrencyChange(this.value)" style="width:90px;flex-shrink:0;">
              <option value="USD" ${receiptState.paidCurrency === 'USD' ? 'selected' : ''}>USD</option>
              <option value="TZS" ${receiptState.paidCurrency === 'TZS' ? 'selected' : ''}>TZS</option>
            </select>
            <input type="number" class="form-input" id="paid-amount" value="${receiptState.paidInputValue || ''}" placeholder="Enter paid amount" oninput="handlePaidAmount(this.value)">
          </div>
          ${receiptState.paidCurrency === 'TZS' && receiptState.paidInputValue > 0 ? '<div style="font-size:0.8rem;color:var(--text-secondary);margin-top:4px;">Converted: $' + formatCurrency(receiptState.paidAmountUSD) + ' USD (at rate ' + formatCurrency(receiptState.effectiveRate) + ' TZS/USD)</div>' : ''}
        </div>
        <div class="form-group">
          <label class="form-label">Remaining Balance (USD)</label>
          <div style="display:flex;align-items:center;gap:12px;">
            <div class="form-input readonly" style="flex:1;display:flex;align-items:center;" id="remaining-display">$${formatCurrency(receiptState.remainingUSD)}</div>
            <span class="badge ${receiptState.status === 'Fully Paid' ? 'badge-success' : receiptState.status ? 'badge-warning' : ''}" id="payment-status">${receiptState.status}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="wizard-nav"><button class="btn btn-accent" onclick="goToStep(2)">Next Step →</button></div>`;
}

// =============================================
// STEP 1 HANDLERS
// =============================================
function handleRateToggle(el) {
  receiptState.useLiveRate = el.checked;
  const mc = document.getElementById('manual-rate-container');
  if (mc) mc.style.display = el.checked ? 'none' : '';
  receiptState.effectiveRate = el.checked && receiptState.liveRate ? approximateRate(receiptState.liveRate) : receiptState.manualRate;
  recalculate(); updatePriceDisplay();
}
function handleManualRate(val) {
  receiptState.manualRate = parseInt(val) || 0;
  if (!receiptState.useLiveRate) receiptState.effectiveRate = receiptState.manualRate;
  recalculate(); updatePriceDisplay();
}
function handleProgramChange(val) {
  receiptState.selectedProgram = parseInt(val);
  const p = PROGRAMS[receiptState.selectedProgram];
  receiptState.selectedMode = 'online';
  receiptState.priceUSD = p.hasModes ? p.prices.online : 0;
  recalculate();
  const c = document.getElementById('wizard-container');
  if (c) c.innerHTML = renderWizardContent();
}
function handleModeChange(mode) {
  receiptState.selectedMode = mode;
  const p = PROGRAMS[receiptState.selectedProgram];
  if (p.hasModes) receiptState.priceUSD = p.prices[mode];
  recalculate(); updatePriceDisplay();
}
function handleCustomPrice(val) { receiptState.priceUSD = parseFloat(val) || 0; recalculate(); updatePriceDisplay(); }
function handlePaidAmount(val) {
  receiptState.paidInputValue = parseFloat(val) || 0;
  if (receiptState.paidCurrency === 'TZS') {
    // Convert TZS to USD
    receiptState.paidAmountUSD = receiptState.effectiveRate > 0 ? Math.round((receiptState.paidInputValue / receiptState.effectiveRate) * 100) / 100 : 0;
  } else {
    receiptState.paidAmountUSD = receiptState.paidInputValue;
  }
  recalculate(); updatePriceDisplay();
  // Update the conversion hint if in TZS mode
  const c = document.getElementById('wizard-container');
  // Only re-render hint if needed
}
function handlePaidCurrencyChange(currency) {
  receiptState.paidCurrency = currency;
  // Re-convert the currently entered amount
  if (receiptState.paidInputValue > 0) {
    if (currency === 'TZS') {
      receiptState.paidAmountUSD = receiptState.effectiveRate > 0 ? Math.round((receiptState.paidInputValue / receiptState.effectiveRate) * 100) / 100 : 0;
    } else {
      receiptState.paidAmountUSD = receiptState.paidInputValue;
    }
  }
  recalculate();
  const c = document.getElementById('wizard-container');
  if (c) c.innerHTML = renderWizardContent();
}

// =============================================
// STEP 2
// =============================================
function renderStep2() {
  const opts = COUNTRIES.map(c => `<option value="${c}" ${c === receiptState.country ? 'selected' : ''}>${c}</option>`).join('');
  return `
    <div class="wizard-section">
      <div class="wizard-section-title"><span class="section-icon">👤</span> Student Information</div>
      <div class="form-group"><label class="form-label">Student Full Name *</label><input type="text" class="form-input" id="student-name" value="${receiptState.studentName}" placeholder="Enter student full name"></div>
      <div class="form-group"><label class="form-label">Country *</label><select class="form-select" id="student-country"><option value="">Select country</option>${opts}</select></div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">Region / State</label><input type="text" class="form-input" id="student-region" value="${receiptState.region}" placeholder="Optional"></div>
        <div class="form-group"><label class="form-label">District</label><input type="text" class="form-input" id="student-district" value="${receiptState.district}" placeholder="Optional"></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">Ward</label><input type="text" class="form-input" id="student-ward" value="${receiptState.ward}" placeholder="Optional"></div>
        <div class="form-group"><label class="form-label">Village</label><input type="text" class="form-input" id="student-village" value="${receiptState.village}" placeholder="Optional"></div>
      </div>
      <div class="form-group"><label class="form-label">Address Details</label><input type="text" class="form-input" id="student-address" value="${receiptState.address}" placeholder="Optional"></div>
    </div>
    <div class="wizard-nav" style="justify-content:space-between;">
      <button class="btn btn-outline" onclick="goToStep(1)">← Back</button>
      <button class="btn btn-accent" onclick="goToStep(3)">Next Step →</button>
    </div>`;
}

// =============================================
// STEP 3 – Preview & Download (auto-save on download)
// =============================================
function renderStep3() {
  if (!receiptState.receiptNumber) {
    receiptState.receiptNumber = generateReceiptNumber(receiptState.studentName);
    receiptState.receiptDate = new Date().toISOString();
  }
  const program = PROGRAMS[receiptState.selectedProgram];
  const isInstallment = receiptState.status !== 'Fully Paid' && receiptState.paidAmountUSD > 0;

  return `
    <div class="wizard-section" style="text-align:center;">
      <div class="wizard-section-title" style="justify-content:center;"><span class="section-icon">✅</span> Receipt Preview</div>
      <div class="receipt-wrapper">
        <!-- A5 Portrait Receipt -->
        <div class="receipt-card" id="receipt-to-download">
          <div class="print-status-watermark">${receiptState.status === 'Fully Paid' ? 'PAID' : 'DUE'}</div>
          
          <div class="receipt-header-redesign">
            <div class="receipt-logo-container">
              <img src="${LOGO_BASE64}" alt="LutaMarkets Logo">
            </div>
            <div class="company-info">
              <h2>LutaMarkets</h2>
              <p class="tagline">Financial Market Mentorship</p>
            </div>
          </div>

          <div class="receipt-meta-grid">
            <div class="meta-box">
              <label>Receipt No.</label>
              <span>${receiptState.receiptNumber}</span>
            </div>
            <div class="meta-box" style="text-align:right;">
              <label>Date Issued</label>
              <span>${formatDate(receiptState.receiptDate)}</span>
            </div>
          </div>

          <div class="customer-details">
            <div class="section-title">Student Information</div>
            <div class="details-grid">
              <div class="detail-item">
                <label>Name</label>
                <span>${receiptState.studentName}</span>
              </div>
              <div class="detail-item">
                <label>Program</label>
                <span>${program.name}</span>
              </div>
              <div class="detail-item">
                <label>Country</label>
                <span>${receiptState.country}</span>
              </div>
              <div class="detail-item">
                <label>Status</label>
                <span style="color:${receiptState.status === 'Fully Paid' ? 'var(--success)' : 'var(--warning)'}">${receiptState.status}</span>
              </div>
            </div>
          </div>

          <div class="payment-summary">
            <div class="section-title">Payment Summary</div>
            <div class="summary-row">
              <label>Paid Amount (TZS)</label>
              <span>${formatCurrency(Math.round(receiptState.paidAmountUSD * receiptState.effectiveRate))} TZS</span>
            </div>
            <div class="summary-row">
              <label>Paid Amount (USD)</label>
              <span>$${formatCurrency(receiptState.paidAmountUSD)}</span>
            </div>
            <div class="summary-row total">
              <label>Remaining Balance</label>
              <span>$${formatCurrency(receiptState.remainingUSD)}</span>
            </div>
          </div>

          ${isInstallment ? `
          <div class="receipt-history">
            <div class="section-title">Payment History</div>
            <table class="history-table">
              <thead>
                <tr>
                  <th>Installment</th>
                  <th>Date</th>
                  <th style="text-align:right;">Amount (USD)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Installment 1</td>
                  <td>${formatDate(receiptState.receiptDate)}</td>
                  <td style="text-align:right;">$${formatCurrency(receiptState.paidAmountUSD)}</td>
                </tr>
              </tbody>
            </table>
          </div>` : ''}

          <div class="receipt-footer-redesign">
            <div class="footer-left">
              <div class="thanks">Thank you for your payment!</div>
              <div class="contact">LutaMarkets Academy | Management System</div>
            </div>
            <div class="qr-container">
              <div class="qr-code" id="receipt-qr-code"></div>
              <div class="qr-label">Verify Receipt</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="wizard-nav" style="justify-content:space-between;">
      <button class="btn btn-outline" onclick="goToStep(2)">← Back</button>
      <button class="btn btn-accent" onclick="handleDownloadAndSave()">⬇ Download Receipt (PNG)</button>
    </div>
`;
}

// =============================================
// After step 3 renders, generate QR
// =============================================
function afterStep3Render() {
  const qrData = buildQRData({
    studentName: receiptState.studentName,
    program: PROGRAMS[receiptState.selectedProgram].name,
    priceUSD: receiptState.priceUSD,
    paidAmountUSD: receiptState.paidAmountUSD,
    remainingUSD: receiptState.remainingUSD,
    status: receiptState.status,
    receiptNumber: receiptState.receiptNumber,
    receiptDate: receiptState.receiptDate
  });
  generateQRCode('receipt-qr-code', qrData);
}

// =============================================
// WIZARD NAVIGATION
// =============================================
function goToStep(step) {
  if (step > receiptState.step) {
    if (receiptState.step === 1) {
      if (receiptState.priceUSD <= 0) { alert('Please select a program and ensure the price is set.'); return; }
      if (receiptState.paidAmountUSD <= 0) { alert('Please enter the paid amount.'); return; }
    }
    if (receiptState.step === 2) {
      const name = document.getElementById('student-name')?.value?.trim();
      const country = document.getElementById('student-country')?.value;
      if (!name) { alert('Please enter the student name.'); return; }
      if (!country) { alert('Please select a country.'); return; }
      receiptState.studentName = name;
      receiptState.country = country;
      receiptState.region = document.getElementById('student-region')?.value?.trim() || '';
      receiptState.district = document.getElementById('student-district')?.value?.trim() || '';
      receiptState.ward = document.getElementById('student-ward')?.value?.trim() || '';
      receiptState.village = document.getElementById('student-village')?.value?.trim() || '';
      receiptState.address = document.getElementById('student-address')?.value?.trim() || '';
    }
  }
  receiptState.step = step;
  const c = document.getElementById('wizard-container');
  if (c) c.innerHTML = renderWizardContent();
  // After rendering step 3, generate QR code
  if (step === 3) setTimeout(afterStep3Render, 100);
}

// =============================================
// DOWNLOAD + AUTO-SAVE (combined, no separate Save button)
// =============================================
async function handleDownloadAndSave() {
  // Show saving indicator
  const btn = document.querySelector('button[onclick="handleDownloadAndSave()"]');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<span class="loader-dots"><span>.</span><span>.</span><span>.</span></span> Saving...`;
  }

  try {
    // Save student to DB first
    const program = PROGRAMS[receiptState.selectedProgram];
    const paidTZS = receiptState.paidAmountUSD * receiptState.effectiveRate;
    const remainTZS = receiptState.remainingUSD * receiptState.effectiveRate;

    const student = await LutaDB.addStudent({
      name: receiptState.studentName, country: receiptState.country,
      region: receiptState.region, district: receiptState.district,
      ward: receiptState.ward, village: receiptState.village, address: receiptState.address,
      program: program.name, mode: program.hasModes ? receiptState.selectedMode : null,
      priceUSD: receiptState.priceUSD, exchangeRate: receiptState.effectiveRate,
      totalAmount: receiptState.totalTZS, paidAmountUSD: receiptState.paidAmountUSD,
      paidAmount: paidTZS, remainingUSD: receiptState.remainingUSD,
      remainingBalance: remainTZS, status: receiptState.status,
      installmentCount: receiptState.status === 'Fully Paid' ? 0 : 1,
      receiptNumber: receiptState.receiptNumber, receiptDate: receiptState.receiptDate
    });

    await LutaDB.addPayment({
      studentId: student.id, amountUSD: receiptState.paidAmountUSD,
      amount: paidTZS, receiptNumber: receiptState.receiptNumber,
      method: 'Initial Payment',
      label: receiptState.status === 'Fully Paid' ? 'Full Payment' : 'Installment 1'
    });

    // Download PNG
    await downloadReceiptAsPNG('receipt-to-download', `LutaMarkets_Receipt_${receiptState.receiptNumber}.png`);

    // Close and go to dashboard
    closeReceiptGenerator();

    // Refresh dashboard if we are there
    const container = document.getElementById('app-content');
    if (Router.currentView === 'dashboard') {
      await renderDashboard(container);
    }
  } catch (err) {
    console.error('Error saving receipt:', err);
    alert('Failed to save receipt to cloud. Please check your connection.');
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = `⬇ Download Receipt (PNG)`;
    }
  }
}

// =============================================
// REGENERATE RECEIPT FOR EXISTING STUDENT
// =============================================
async function regenerateReceipt(studentId) {
  const student = await LutaDB.getStudentById(studentId);
  if (!student) return;

  const existing = document.getElementById('receipt-overlay');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'receipt-overlay';
  overlay.className = 'receipt-overlay';

  const payments = await LutaDB.getPaymentsByStudent(studentId);
  const paidUSD = student.paidAmountUSD;
  const remainUSD = student.remainingUSD;
  const isInstallment = student.status && student.status.includes('Installment');

  // Build installment history
  let historyHTML = '';
  if (isInstallment && payments.length > 0) {
    historyHTML = `
          <div class="receipt-installments">
            <h4>Payment History</h4>
            <table class="installment-table">
              <thead><tr><th>#</th><th>Date</th><th>Amount (USD)</th><th>Method</th></tr></thead>
              <tbody>
                ${payments.map((p, i) => `
                  <tr>
                    <td>${p.label || ('Installment ' + (i + 1))}</td>
                    <td>${formatDate(p.date)}</td>
                    <td>$${formatCurrency(p.amountUSD || Math.round(p.amount / (student.exchangeRate || 2500)))}</td>
                    <td>${p.method || '-'}</td>
                  </tr>`).join('')}
              </tbody>
            </table>
          </div>`;
  }

  // Build QR data
  const qrDataStr = JSON.stringify({
    name: student.name, program: student.program,
    fee: student.priceUSD + ' USD', paid: paidUSD + ' USD',
    remaining: remainUSD + ' USD', status: student.status,
    receipt: student.receiptNumber, date: formatDate(student.receiptDate || student.createdAt)
  });

  overlay.innerHTML = `
    <div class="receipt-overlay-header">
      <div class="header-left"><div class="receipt-icon">🧾</div><h3>Receipt Viewer</h3></div>
      <button class="btn-icon" onclick="document.getElementById('receipt-overlay').remove()" title="Close">✕</button>
    </div>
    <div class="receipt-overlay-body">
      <div class="wizard-container" style="text-align:center;">
        <div class="wizard-header"><h2>Student Receipt</h2><p class="wizard-subtitle">${student.name} – ${student.program}</p></div>
        <div class="receipt-wrapper">
          <!-- A5 Portrait Receipt (Regeneration) -->
          <div class="receipt-card" id="receipt-to-download">
            <div class="print-status-watermark">${student.status === 'Fully Paid' ? 'PAID' : 'DUE'}</div>

            <div class="receipt-header-redesign">
              <div class="receipt-logo-container">
                <img src="${LOGO_BASE64}" alt="LutaMarkets Logo">
              </div>
              <div class="company-info">
                <h2>LutaMarkets</h2>
                <p class="tagline">Financial Market Mentorship</p>
              </div>
            </div>

            <div class="receipt-meta-grid">
              <div class="meta-box">
                <label>Receipt No.</label>
                <span>${student.receiptNumber}</span>
              </div>
              <div class="meta-box" style="text-align:right;">
                <label>Date Issued</label>
                <span>${formatDate(student.receiptDate || student.createdAt)}</span>
              </div>
            </div>

            <div class="customer-details">
              <div class="section-title">Student Information</div>
              <div class="details-grid">
                <div class="detail-item">
                  <label>Name</label>
                  <span>${student.name}</span>
                </div>
                <div class="detail-item">
                  <label>Program</label>
                  <span>${student.program}</span>
                </div>
                <div class="detail-item">
                  <label>Country</label>
                  <span>${student.country}</span>
                </div>
                <div class="detail-item">
                  <label>Status</label>
                  <span style="color:${student.status === 'Fully Paid' ? 'var(--success)' : 'var(--warning)'}">${student.status}</span>
                </div>
              </div>
            </div>

            <div class="payment-summary">
              <div class="section-title">Payment Summary</div>
              <div class="summary-row">
                <label>Paid Amount (TZS)</label>
                <span>${formatCurrency(Math.round(paidUSD * (student.exchangeRate || 2500)))} TZS</span>
              </div>
              <div class="summary-row">
                <label>Paid Amount (USD)</label>
                <span>$${formatCurrency(paidUSD)}</span>
              </div>
              <div class="summary-row total">
                <label>Remaining Balance</label>
                <span>$${formatCurrency(remainUSD)}</span>
              </div>
            </div>

            ${isInstallment && payments.length > 0 ? `
            <div class="receipt-history">
              <div class="section-title">Payment History</div>
              <table class="history-table">
                <thead>
                  <tr>
                    <th>Installment</th>
                    <th>Date</th>
                    <th style="text-align:right;">Amount (USD)</th>
                  </tr>
                </thead>
                <tbody>
                  ${payments.map((p, i) => `
                    <tr>
                      <td>${p.label || ('Installment ' + (i + 1))}</td>
                      <td>${formatDate(p.date)}</td>
                      <td style="text-align:right;">$${formatCurrency(p.amountUSD || Math.round(p.amount / (student.exchangeRate || 2500)))}</td>
                    </tr>`).join('')}
                </tbody>
              </table>
            </div>` : ''}

            <div class="receipt-footer-redesign">
              <div class="footer-left">
                <div class="thanks">Thank you for your payment!</div>
                <div class="contact">LutaMarkets Academy | Management System</div>
              </div>
              <div class="qr-container">
                <div class="qr-code" id="regen-qr-code"></div>
                <div class="qr-label">Verify Receipt</div>
              </div>
            </div>
          </div>
        </div>
        <div style="margin-top:24px;">
          <button class="btn btn-accent" onclick="downloadReceiptAsPNG('receipt-to-download','LutaMarkets_Receipt_${student.receiptNumber}.png')">⬇ Download Receipt (PNG)</button>
        </div>
      </div>
    </div>
`;

  document.body.appendChild(overlay);
  // Generate QR after DOM insertion
  setTimeout(() => generateQRCode('regen-qr-code', qrDataStr), 100);
}
