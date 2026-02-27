// LutaMarkets – Core Application (State, Database, Router)

// =============================================
// DATABASE (Supabase)
// =============================================

const LutaDB = {
    // --- Students ---
    async getStudents() {
        const { data, error } = await supabaseClient
            .from('students')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching students:', error);
            return [];
        }

        // Map back to camelCase for frontend compatibility
        return data.map(s => ({
            id: s.id,
            name: s.name,
            program: s.program,
            mode: s.mode,
            priceUSD: parseFloat(s.price_usd),
            paidAmountUSD: parseFloat(s.paid_amount_usd),
            paidAmount: parseFloat(s.paid_amount_tzs),
            remainingUSD: parseFloat(s.remaining_usd),
            remainingBalance: parseFloat(s.remaining_balance_tzs),
            status: s.status,
            receiptNumber: s.receipt_number,
            exchangeRate: parseFloat(s.exchange_rate),
            installmentCount: s.installment_count,
            country: s.country,
            createdAt: s.created_at
        }));
    },

    async getStudentById(id) {
        const { data, error } = await supabaseClient
            .from('students')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error('Error fetching student:', error);
            return null;
        }

        return {
            id: data.id,
            name: data.name,
            program: data.program,
            mode: data.mode,
            priceUSD: parseFloat(data.price_usd),
            paidAmountUSD: parseFloat(data.paid_amount_usd),
            paidAmount: parseFloat(data.paid_amount_tzs),
            remainingUSD: parseFloat(data.remaining_usd),
            remainingBalance: parseFloat(data.remaining_balance_tzs),
            status: data.status,
            receiptNumber: data.receipt_number,
            exchangeRate: parseFloat(data.exchange_rate),
            installmentCount: data.installment_count,
            country: data.country,
            createdAt: data.created_at
        };
    },

    async addStudent(student) {
        const { data: { user } } = await supabaseClient.auth.getUser();

        const { data, error } = await supabaseClient
            .from('students')
            .insert([{
                user_id: user.id,
                name: student.name,
                program: student.program,
                mode: student.mode,
                price_usd: student.priceUSD,
                paid_amount_usd: student.paidAmountUSD || 0,
                paid_amount_tzs: student.paidAmount || 0,
                remaining_usd: student.remainingUSD || 0,
                remaining_balance_tzs: student.remainingBalance || 0,
                status: student.status,
                receipt_number: student.receiptNumber,
                exchange_rate: student.exchangeRate || 2500,
                installment_count: student.installmentCount || 1,
                country: student.country
            }])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    async updateStudent(id, updates) {
        // Map updates to snake_case
        const mappedUpdates = {};
        if (updates.name) mappedUpdates.name = updates.name;
        if (updates.program) mappedUpdates.program = updates.program;
        if (updates.mode) mappedUpdates.mode = updates.mode;
        if (updates.priceUSD !== undefined) mappedUpdates.price_usd = updates.priceUSD;
        if (updates.paidAmountUSD !== undefined) mappedUpdates.paid_amount_usd = updates.paidAmountUSD;
        if (updates.paidAmount !== undefined) mappedUpdates.paid_amount_tzs = updates.paidAmount;
        if (updates.remainingUSD !== undefined) mappedUpdates.remaining_usd = updates.remainingUSD;
        if (updates.remainingBalance !== undefined) mappedUpdates.remaining_balance_tzs = updates.remainingBalance;
        if (updates.status) mappedUpdates.status = updates.status;
        if (updates.receiptNumber) mappedUpdates.receipt_number = updates.receiptNumber;
        if (updates.exchangeRate) mappedUpdates.exchange_rate = updates.exchangeRate;
        if (updates.installmentCount) mappedUpdates.installment_count = updates.installmentCount;
        if (updates.country) mappedUpdates.country = updates.country;

        mappedUpdates.updated_at = new Date().toISOString();

        const { data, error } = await supabaseClient
            .from('students')
            .update(mappedUpdates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    async deleteStudent(id) {
        const { error } = await supabaseClient
            .from('students')
            .delete()
            .eq('id', id);

        if (error) throw error;
    },

    async searchStudents(query, statusFilter) {
        let dbQuery = supabaseClient.from('students').select('*');

        if (query) {
            dbQuery = dbQuery.ilike('name', `%${query}%`);
        }

        if (statusFilter && statusFilter !== 'all') {
            if (statusFilter === 'Installment') {
                dbQuery = dbQuery.ilike('status', 'Installment%');
            } else {
                dbQuery = dbQuery.eq('status', statusFilter);
            }
        }

        const { data, error } = await dbQuery.order('name', { ascending: true });

        if (error) {
            console.error('Error searching students:', error);
            return [];
        }

        return data.map(s => ({
            id: s.id,
            name: s.name,
            program: s.program,
            priceUSD: parseFloat(s.price_usd),
            paidAmountUSD: parseFloat(s.paid_amount_usd),
            paidAmount: parseFloat(s.paid_amount_tzs),
            remainingUSD: parseFloat(s.remaining_usd),
            remainingBalance: parseFloat(s.remaining_balance_tzs),
            status: s.status,
            receiptNumber: s.receipt_number,
            exchangeRate: parseFloat(s.exchange_rate),
            installmentCount: s.installment_count,
            country: s.country
        }));
    },

    // --- Payments ---
    async getPayments() {
        const { data, error } = await supabaseClient
            .from('payments')
            .select('*')
            .order('date', { ascending: false });

        if (error) {
            console.error('Error fetching payments:', error);
            return [];
        }

        return data.map(p => ({
            id: p.id,
            studentId: p.student_id,
            amountUSD: parseFloat(p.amount_usd),
            amount: parseFloat(p.amount_tzs),
            receiptNumber: p.receipt_number,
            method: p.method,
            label: p.label,
            date: p.date
        }));
    },

    async getPaymentsByStudent(studentId) {
        const { data, error } = await supabaseClient
            .from('payments')
            .select('*')
            .eq('student_id', studentId)
            .order('date', { ascending: true });

        if (error) {
            console.error('Error fetching student payments:', error);
            return [];
        }

        return data.map(p => ({
            id: p.id,
            studentId: p.student_id,
            amountUSD: parseFloat(p.amount_usd),
            amount: parseFloat(p.amount_tzs),
            receiptNumber: p.receipt_number,
            method: p.method,
            label: p.label,
            date: p.date
        }));
    },

    async addPayment(payment) {
        const { data: { user } } = await supabaseClient.auth.getUser();

        const { data, error } = await supabaseClient
            .from('payments')
            .insert([{
                user_id: user.id,
                student_id: payment.studentId,
                amount_usd: payment.amountUSD,
                amount_tzs: payment.amount,
                receipt_number: payment.receiptNumber,
                method: payment.method,
                label: payment.label,
                date: new Date().toISOString()
            }])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    // --- Stats ---
    async getStats() {
        const students = await this.getStudents();
        const totalStudents = students.length;
        const totalRevenue = students.reduce((sum, s) => sum + (s.paidAmountUSD || 0), 0);
        const pendingInstallments = students.filter(s => s.status && s.status.includes('Installment')).length;
        return { totalStudents, totalRevenue, pendingInstallments };
    },

    async getRecentActivity(limit = 5) {
        const students = await this.getStudents();
        return students
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, limit);
    }
};


// =============================================
// ROUTER
// =============================================
const Router = {
    currentView: 'dashboard',

    init() {
        window.addEventListener('hashchange', () => this.handleRoute());
        this.handleRoute();
    },

    async handleRoute() {
        const hash = window.location.hash.replace('#', '') || 'dashboard';
        await this.navigate(hash);
    },

    async navigate(view) {
        this.currentView = view;
        window.location.hash = view;

        // Update nav items
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.toggle('active', item.dataset.view === view);
        });

        // Render the view
        const container = document.getElementById('app-content');
        if (!container) return;

        switch (view) {
            case 'dashboard':
                await renderDashboard(container);
                break;
            case 'receipt':
                openReceiptGenerator();
                break;
            case 'payments':
                await renderPayments(container);
                break;
            default:
                await renderDashboard(container);
        }

    }
};

// =============================================
// SIDEBAR NAVIGATION
// =============================================
function initNavigation() {
    document.querySelectorAll('.nav-item[data-view]').forEach(item => {
        item.addEventListener('click', async (e) => {
            e.preventDefault();
            await Router.navigate(item.dataset.view);
        });
    });

    // Mobile menu toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const sidebar = document.querySelector('.sidebar');
    if (mobileBtn && sidebar) {
        mobileBtn.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
    }
}

// =============================================
// INIT
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    Router.init();
});
