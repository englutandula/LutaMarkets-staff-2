// LutaMarkets – Student Payments Management

let paymentsState = {
  searchQuery: '',
  statusFilter: 'all',
  currentPage: 1,
  perPage: 10
};

// =============================================
// MAIN RENDER
// =============================================
async function renderPayments(container) {
  // Show loading state
  container.innerHTML = `
    <div class="page-content" style="display:flex;align-items:center;justify-content:center;min-height:60vh;">
      <div style="text-align:center;color:var(--text-muted);">
        <div style="font-size:2.5rem;margin-bottom:16px;">⏳</div>
        <p>Fetching student records...</p>
      </div>
    </div>
  `;

  const filtered = await LutaDB.searchStudents(paymentsState.searchQuery, paymentsState.statusFilter);
  const totalPages = Math.ceil(filtered.length / paymentsState.perPage) || 1;
  const start = (paymentsState.currentPage - 1) * paymentsState.perPage;
  const pageStudents = filtered.slice(start, start + paymentsState.perPage);

  const avatarColors = ['blue', 'gold', 'green', 'purple', 'orange', 'teal'];

  container.innerHTML = `
    <div class="page-content animate-in">
      <div class="page-header">
        <h2>Student Payments Database</h2>
        <p>Manage, track and update student tuition fee records.</p>
      </div>

      <div class="data-section">
        <!-- Toolbar -->
        <div class="toolbar">
          <div class="toolbar-search">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" id="payment-search" placeholder="Search by student name..."
              value="${paymentsState.searchQuery}" oninput="handlePaymentSearch(this.value)">
          </div>
          <div class="toolbar-actions">
            <div style="display:flex;align-items:center;gap:8px;">
              <label style="font-size:0.85rem;color:var(--text-secondary);font-weight:500;">Status:</label>
              <select class="form-select" id="status-filter" onchange="handleStatusFilter(this.value)" style="min-width:140px;">
                <option value="all" ${paymentsState.statusFilter === 'all' ? 'selected' : ''}>All Statuses</option>
                <option value="Fully Paid" ${paymentsState.statusFilter === 'Fully Paid' ? 'selected' : ''}>Fully Paid</option>
                <option value="Installment" ${paymentsState.statusFilter === 'Installment' ? 'selected' : ''}>Installment</option>
              </select>
            </div>
            <button class="btn btn-primary btn-sm" onclick="handleExportData()">
              📥 Export Data
            </button>
          </div>
        </div>

        <!-- Table -->
        <table class="data-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Program</th>
              <th>Fee (USD)</th>
              <th>Paid (USD)</th>
              <th>Balance (USD)</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${pageStudents.length === 0 ? `
              <tr><td colspan="7" style="text-align:center;padding:40px;color:var(--text-muted);">
                ${paymentsState.searchQuery ? 'No students found matching your search.' : 'No student records yet. Generate a receipt to add students.'}
              </td></tr>
            ` : pageStudents.map((s, i) => {
    const paidUSD = s.paidAmountUSD;
    const remainUSD = s.remainingUSD;
    const isInstallment = s.status && s.status.includes('Installment');
    return `
              <tr>
                <td>
                  <div class="name-cell">
                    <div class="avatar-sm ${avatarColors[i % avatarColors.length]}">${getInitials(s.name)}</div>
                    ${s.name}
                  </div>
                </td>
                <td>${s.program}</td>
                <td class="fw-700">$${formatCurrency(s.priceUSD)}</td>
                <td class="text-success fw-700">$${formatCurrency(paidUSD)}</td>
                <td class="${remainUSD > 0 ? 'text-danger' : 'text-muted'} fw-700">${remainUSD > 0 ? '$' + formatCurrency(remainUSD) : '$0'}</td>
                <td><span class="badge ${s.status === 'Fully Paid' ? 'badge-success' : 'badge-warning'}">${s.status}</span></td>
                <td>
                  <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;">
                    ${isInstallment ? `
                      <button class="btn btn-primary btn-sm" onclick="openAddPaymentModal('${s.id}')">
                        💳 Add Payment
                      </button>
                    ` : ''}
                    <button class="btn-icon" onclick="regenerateReceipt('${s.id}')" title="View Receipt">👁️</button>
                    <button class="btn-icon" onclick="downloadStudentReceipt('${s.id}')" title="Download Receipt">⬇️</button>
                    <button class="btn-icon btn-danger" onclick="handleDeleteStudent('${s.id}', '${s.name.replace(/'/g, "\\'")}')" title="Delete Student">🗑️</button>
                  </div>
                </td>
              </tr>
            `;
  }).join('')}
          </tbody>
        </table>

        <!-- Pagination -->
        <div class="pagination">
          <span class="pagination-info">Showing ${pageStudents.length} of ${filtered.length} students</span>
          <div class="pagination-buttons">
            <button ${paymentsState.currentPage === 1 ? 'disabled' : ''} onclick="goToPaymentPage(${paymentsState.currentPage - 1})">Previous</button>
            ${Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
    const page = i + 1;
    return `<button class="${page === paymentsState.currentPage ? 'active' : ''}" onclick="goToPaymentPage(${page})">${page}</button>`;
  }).join('')}
            <button ${paymentsState.currentPage === totalPages ? 'disabled' : ''} onclick="goToPaymentPage(${paymentsState.currentPage + 1})">Next</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Payment Modal Container -->
    <div id="payment-modal-container"></div>
  `;
}

// =============================================
// SEARCH & FILTER HANDLERS
// =============================================
async function handlePaymentSearch(query) {
  paymentsState.searchQuery = query;
  paymentsState.currentPage = 1;
  await renderPayments(document.getElementById('app-content'));
}

async function handleStatusFilter(status) {
  paymentsState.statusFilter = status;
  paymentsState.currentPage = 1;
  await renderPayments(document.getElementById('app-content'));
}

async function goToPaymentPage(page) {
  paymentsState.currentPage = page;
  await renderPayments(document.getElementById('app-content'));
}

// =============================================
// DELETE STUDENT
// =============================================
async function handleDeleteStudent(studentId, studentName) {
  if (confirm(`Are you sure you want to delete "${studentName}"? This will remove all their payment records and cannot be undone.`)) {
    try {
      await LutaDB.deleteStudent(studentId);
      await renderPayments(document.getElementById('app-content'));
    } catch (err) {
      console.error('Error deleting student:', err);
      alert('Failed to delete student. Please try again.');
    }
  }
}

// =============================================
// ADD PAYMENT MODAL
// =============================================
async function openAddPaymentModal(studentId) {
  const student = await LutaDB.getStudentById(studentId);
  if (!student) return;

  const modalContainer = document.getElementById('payment-modal-container');
  if (!modalContainer) return;

  const avatarColors = ['blue', 'gold', 'green', 'purple', 'orange', 'teal'];
  const colorIndex = Math.abs(student.name.charCodeAt(0) % avatarColors.length);
  const remainUSD = student.remainingUSD || Math.round(student.remainingBalance / (student.exchangeRate || 2500));
  const installmentCount = student.installmentCount || 1;

  modalContainer.innerHTML = `
    <div class="modal-overlay active" id="add-payment-modal" onclick="closePaymentModal(event)">
      <div class="modal-content" onclick="event.stopPropagation()">
        <div class="modal-header">
          <h3>Add New Payment</h3>
          <button class="modal-close" onclick="closePaymentModalDirect()">✕</button>
        </div>

        <div style="margin-bottom:16px;font-size:0.85rem;color:var(--text-secondary);">Student</div>
        <div class="modal-student-info">
          <div class="avatar-sm ${avatarColors[colorIndex]}">${getInitials(student.name)}</div>
          <div class="student-details">
            <div class="student-name">${student.name}</div>
            <div class="student-program">${student.program} (ID: #${student.receiptNumber})</div>
          </div>
        </div>

        <div class="balance-display">
          <div>
            <div style="font-size:0.8rem;color:var(--text-secondary);margin-bottom:2px;">Current Balance (USD)</div>
            <div class="balance-amount">$${formatCurrency(remainUSD)}</div>
          </div>
          <div class="form-group" style="flex:1;margin-bottom:0;">
            <label class="form-label">Payment Method</label>
            <select class="form-select" id="payment-method">
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Mobile Money">Mobile Money</option>
              <option value="Cash">Cash</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Add Payment Amount (USD)</label>
          <input type="number" class="form-input" id="new-payment-amount" placeholder="Enter amount in USD"
            oninput="updateModalBalance('${studentId}', this.value)">
        </div>

        <div class="updated-balance" id="updated-balance-display" style="display:none;">
          <span class="label">Updated Remaining Balance:</span>
          <span class="value" id="updated-balance-value">$0</span>
        </div>

        <div class="modal-actions">
          <button class="btn btn-primary" id="confirm-payment-btn" onclick="confirmPayment('${studentId}')" disabled>
            Confirm Payment
          </button>
          <button class="btn btn-outline" onclick="closePaymentModalDirect()">Cancel</button>
        </div>
      </div>
    </div>
  `;
}

async function updateModalBalance(studentId, value) {
  const student = await LutaDB.getStudentById(studentId);
  if (!student) return;

  const amount = parseFloat(value) || 0;
  const remainUSD = student.remainingUSD;
  const newBalance = Math.max(0, remainUSD - amount);

  const displayEl = document.getElementById('updated-balance-display');
  const valueEl = document.getElementById('updated-balance-value');
  const confirmBtn = document.getElementById('confirm-payment-btn');

  if (amount > 0) {
    displayEl.style.display = 'flex';
    valueEl.textContent = `$${formatCurrency(newBalance)}`;
    confirmBtn.disabled = false;
  } else {
    displayEl.style.display = 'none';
    confirmBtn.disabled = true;
  }
}

async function confirmPayment(studentId) {
  const student = await LutaDB.getStudentById(studentId);
  if (!student) return;

  const amountInput = document.getElementById('new-payment-amount');
  const methodSelect = document.getElementById('payment-method');
  const amountUSD = parseFloat(amountInput?.value) || 0;
  const method = methodSelect?.value || 'Bank Transfer';

  const btn = document.getElementById('confirm-payment-btn');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<span class="loader-dots"><span>.</span><span>.</span><span>.</span></span> Saving...`;
  }

  try {
    if (amountUSD <= 0) {
      alert('Please enter a valid payment amount.');
      return;
    }

    const remainUSD = student.remainingUSD;

    if (amountUSD > remainUSD) {
      alert('Payment amount cannot exceed the remaining balance.');
      return;
    }

    // Calculate new values
    const rate = student.exchangeRate || 2500;
    const amountTZS = amountUSD * rate;
    const newPaidUSD = student.paidAmountUSD + amountUSD;
    const newPaidTZS = newPaidUSD * rate;
    const newRemainUSD = Math.max(0, student.priceUSD - newPaidUSD);
    const newRemainTZS = newRemainUSD * rate;
    const installmentCount = (student.installmentCount || 1) + 1;

    let newStatus;
    if (newRemainUSD <= 0) {
      newStatus = 'Fully Paid';
    } else {
      newStatus = `Installment ${installmentCount}`;
    }

    await LutaDB.updateStudent(studentId, {
      paidAmountUSD: newPaidUSD,
      paidAmount: newPaidTZS,
      remainingUSD: newRemainUSD,
      remainingBalance: newRemainTZS,
      status: newStatus,
      installmentCount: installmentCount
    });

    // Add payment record
    const receiptNum = generateReceiptNumber(student.name);
    await LutaDB.addPayment({
      studentId: studentId,
      amountUSD: amountUSD,
      amount: amountTZS,
      receiptNumber: receiptNum,
      method: method,
      label: newStatus === 'Fully Paid' ? 'Final Payment' : `Installment ${installmentCount}`
    });

    // Close modal and refresh
    closePaymentModalDirect();
    await renderPayments(document.getElementById('app-content'));
  } catch (err) {
    console.error('Error confirming payment:', err);
    alert('Failed to save payment to cloud.');
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = `Confirm Payment`;
    }
  }
}

function closePaymentModal(event) {
  if (event.target.classList.contains('modal-overlay')) {
    closePaymentModalDirect();
  }
}

function closePaymentModalDirect() {
  const modal = document.getElementById('add-payment-modal');
  if (modal) {
    modal.classList.remove('active');
    setTimeout(() => modal.remove(), 300);
  }
}

// =============================================
// DOWNLOAD & EXPORT
// =============================================
// =============================================
// DOWNLOAD & EXPORT
// =============================================
async function downloadStudentReceipt(studentId) {
  await regenerateReceipt(studentId);
  setTimeout(() => {
    downloadReceiptAsPNG('receipt-to-download', `LutaMarkets_Receipt_${studentId}.png`);
  }, 800);
}

async function handleExportData() {
  const students = await LutaDB.getStudents();
  if (students.length === 0) {
    alert('No data to export.');
    return;
  }

  let csv = 'Name,Program,Mode,Fee (USD),Paid (USD),Balance (USD),Status,Receipt No.,Date,Country\n';
  students.forEach(s => {
    csv += `"${s.name}","${s.program}","${s.mode || 'N/A'}",${s.priceUSD},${s.paidAmountUSD},${s.remainingUSD},"${s.status}","${s.receiptNumber}","${formatDate(s.createdAt)}","${s.country}"\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv' });
  const link = document.createElement('a');
  link.download = 'LutaMarkets_Student_Payments.csv';
  link.href = URL.createObjectURL(blob);
  link.click();
}
