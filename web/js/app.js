/**
 * Fintjam - Core Utilities
 */

const STORAGE_KEYS = {
    USERS: 'fintjam_users',
    CURRENT_USER: 'fintjam_currentUser',
    TRANSACTIONS: 'fintjam_transactions'
};

/**
 * Format number to Rupiah
 * @param {number} amount 
 * @returns {string}
 */
function formatRupiah(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

/**
 * Save data to LocalStorage
 * @param {string} key 
 * @param {any} data 
 */
function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

/**
 * Get data from LocalStorage
 * @param {string} key 
 * @returns {any}
 */
function getData(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

/**
 * Get current logged in user ID
 */
function getCurrentUserId() {
    return localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
}

/**
 * Get current user object
 */
function getCurrentUser() {
    const userId = getCurrentUserId();
    if (!userId) return null;
    
    const users = getData(STORAGE_KEYS.USERS) || [];
    return users.find(u => u.id === userId);
}

/**
 * Check authentication and redirect if necessary
 * @param {boolean} protectedPage 
 */
function checkAuth(protectedPage = true) {
    const userId = getCurrentUserId();
    const currentPage = window.location.pathname.split('/').pop();
    
    if (protectedPage && !userId) {
        if (currentPage !== 'login.html' && currentPage !== 'register.html') {
            window.location.href = 'login.html';
        }
    } else if (!protectedPage && userId) {
        // If already logged in and on login/register page
        window.location.href = 'index.html';
    }
    
    // Check if limit is set for logged in user
    if (userId && protectedPage && currentPage !== 'limit.html') {
        const user = getCurrentUser();
        if (user && (!user.limit || user.limit <= 0)) {
            window.location.href = 'limit.html';
        }
    }
}

/**
 * Logout user
 */
function logout() {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    window.location.href = 'login.html';
}

/**
 * Show Toast Notification
 * @param {string} message 
 * @param {string} type - 'success', 'error', 'warning'
 */
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg z-[9999] transition-all transform translate-y-0 opacity-100 font-body text-sm flex items-center gap-3 animate-bounce-in`;
    
    let bgColor = 'bg-primary text-on-primary';
    let icon = 'info';
    
    if (type === 'error') {
        bgColor = 'bg-error text-on-error';
        icon = 'error';
    } else if (type === 'warning') {
        bgColor = 'bg-tertiary-container text-on-tertiary-container';
        icon = 'warning';
    }
    
    toast.className += ` ${bgColor}`;
    
    toast.innerHTML = `
        <span class="material-symbols-outlined">${icon}</span>
        <span>${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.replace('opacity-100', 'opacity-0');
        toast.classList.replace('translate-y-0', 'translate-y-4');
        setTimeout(() => toast.remove(), 300);
    }, 5000);
}

// Add animation style for toast
const style = document.createElement('style');
style.innerHTML = `
    @keyframes bounce-in {
        0% { transform: translateY(100%); opacity: 0; }
        100% { transform: translateY(0); opacity: 1; }
    }
    .animate-bounce-in {
        animation: bounce-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
`;
document.head.appendChild(style);
