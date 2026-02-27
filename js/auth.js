// LutaMarkets – Authentication Logic

// Redirect if already logged in (used on login page)
async function checkSessionAndRedirect() {
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (session) {
        window.location.href = 'dashboard.html';
    }
}

// Protect dashboard page (used on dashboard.html)
async function protectRoute() {
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (!session) {
        window.location.href = 'index.html';
    }
    return session;
}

// Sign Up
async function signUp(email, password, fullName) {
    const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: fullName
            }
        }
    });

    if (error) throw error;
    return data;
}

// Sign In
async function signIn(email, password) {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password
    });

    if (error) throw error;
    return data;
}

// Sign Out
async function signOut() {
    const { error } = await supabaseClient.auth.signOut();
    if (error) throw error;
    window.location.href = 'index.html';
}

// Update UI with logged in user
function updateAuthUI(user) {
    const profileName = document.querySelector('.profile-name');
    const avatar = document.querySelector('.avatar');

    if (user && user.user_metadata) {
        const fullName = user.user_metadata.full_name || 'User';
        if (profileName) profileName.textContent = fullName;
        if (avatar) avatar.textContent = getInitials(fullName);
    }
}
