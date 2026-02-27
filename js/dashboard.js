// LutaMarkets – Dashboard View

async function renderDashboard(container) {
  // Show loading state first
  container.innerHTML = `
      <div class="page-content" style="display:flex;align-items:center;justify-content:center;min-height:60vh;">
        <div style="text-align:center;color:var(--text-muted);">
          <div style="font-size:2.5rem;margin-bottom:16px;">⏳</div>
          <p>Fetching dashboard data...</p>
        </div>
      </div>
    `;

  const stats = await LutaDB.getStats();
  const recent = await LutaDB.getRecentActivity(5);
  const today = formatDateLong();

  // Get user name for welcome message
  const { data: { user } } = await supabaseClient.auth.getUser();
  const fullName = user?.user_metadata?.full_name || 'Admin';

  const avatarColors = ['blue', 'gold', 'green', 'purple', 'orange', 'teal'];

  container.innerHTML = `
    <div class="page-content animate-in">
      <!-- Page Header -->
      <div class="page-header" style="display:flex;align-items:flex-start;justify-content:space-between;">
        <div>
          <h2>Welcome back, ${fullName}</h2>
          <p>Financial market mentorship overview for today.</p>
        </div>
        <div class="date-badge">
          <span class="date-icon">📅</span>
          ${today}
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-card-header">
            <div class="stat-icon blue">👥</div>
            <span class="stat-trend up">+12%</span>
          </div>
          <div class="stat-label">Total Students</div>
          <div class="stat-value">${formatCurrency(stats.totalStudents)}</div>
        </div>
        <div class="stat-card">
          <div class="stat-card-header">
            <div class="stat-icon gold">💰</div>
            <span class="stat-trend up">+5%</span>
          </div>
          <div class="stat-label">Total Revenue (USD)</div>
          <div class="stat-value">$${formatCurrency(stats.totalRevenue)}</div>
        </div>
        <div class="stat-card">
          <div class="stat-card-header">
            <div class="stat-icon red">📋</div>
            <span class="stat-trend down">-2%</span>
          </div>
          <div class="stat-label">Pending Installments</div>
          <div class="stat-value">${stats.pendingInstallments}</div>
        </div>
      </div>

      <!-- Feature Cards -->
      <div class="feature-row">
        <div class="feature-card" onclick="Router.navigate('receipt')">
          <div class="feature-card-icons">
            <div class="feature-icon gold">🧾</div>
          </div>
          <div class="feature-bg-icon">📋</div>
          <h3>Generate Receipt</h3>
          <p>Create a new payment record and generate a professional receipt card for students instantly.</p>
          <span class="feature-link">Get Started →</span>
        </div>
        <div class="feature-card" onclick="Router.navigate('payments')">
          <div class="feature-card-icons">
            <div class="feature-icon blue">💳</div>
          </div>
          <div class="feature-bg-icon">🗃️</div>
          <h3>Student Payments</h3>
          <p>Manage student records, track installments, and update payment status in real-time.</p>
          <span class="feature-link">Manage Records →</span>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="data-section slide-up">
        <div class="data-section-header">
          <h3>Recent Activity</h3>
          <a href="#payments" class="view-all">View All</a>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Program</th>
              <th>Amount Paid</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            ${recent.length === 0 ? `
              <tr><td colspan="5" style="text-align:center;padding:40px;color:var(--text-muted);">
                No students yet. Click "Generate Receipt" to add your first student.
              </td></tr>
            ` : recent.map((s, i) => `
              <tr>
                <td>
                  <div class="name-cell">
                    <div class="avatar-sm ${avatarColors[i % avatarColors.length]}">${getInitials(s.name)}</div>
                    ${s.name}
                  </div>
                </td>
                <td>${s.program || '-'}</td>
                <td class="fw-700">$${formatCurrency(s.paidAmountUSD)}</td>
                <td><span class="badge ${s.status === 'Fully Paid' ? 'badge-success' : 'badge-warning'}">${s.status}</span></td>
                <td class="text-muted">${formatDate(s.createdAt)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

