/**
 * Fintjam - Authentication Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');
    const isRegisterPage = window.location.pathname.includes('register.html');
    
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const usernameInput = document.getElementById('username');
            const passwordInput = document.getElementById('password');
            const confirmPasswordInput = document.getElementById('confirm-password');
            
            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();
            
            if (isRegisterPage) {
                // Register Logic
                const confirmPassword = confirmPasswordInput.value.trim();
                
                if (password !== confirmPassword) {
                    showToast('Password tidak cocok!', 'error');
                    return;
                }
                
                if (password.length < 8) {
                    showToast('Password minimal 8 karakter!', 'error');
                    return;
                }
                
                const users = getData(STORAGE_KEYS.USERS) || [];
                if (users.find(u => u.username === username)) {
                    showToast('Username sudah terdaftar!', 'error');
                    return;
                }
                
                const newUser = {
                    id: Date.now().toString(),
                    username,
                    password,
                    limit: 0
                };
                
                users.push(newUser);
                saveData(STORAGE_KEYS.USERS, users);
                
                showToast('Registrasi berhasil! Silakan login.', 'success');
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 1500);
                
            } else {
                // Login Logic
                const users = getData(STORAGE_KEYS.USERS) || [];
                const user = users.find(u => u.username === username && u.password === password);
                
                if (user) {
                    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, user.id);
                    showToast('Login berhasil!', 'success');
                    
                    setTimeout(() => {
                        // Redirect based on limit set or not
                        if (!user.limit || user.limit <= 0) {
                            window.location.href = 'limit.html';
                        } else {
                            window.location.href = 'index.html';
                        }
                    }, 1000);
                } else {
                    showToast('Username atau password salah!', 'error');
                }
            }
        });
    }
});
