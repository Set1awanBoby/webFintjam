/**
 * Fintjam - Dashboard Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    
    const user = getCurrentUser();
    const transactions = getData(STORAGE_KEYS.TRANSACTIONS) || [];
    const userTransactions = transactions.filter(t => t.user_id === user.id);
    
    // Calculate Totals
    let totalIncome = 0;
    let totalExpense = 0;
    
    userTransactions.forEach(t => {
        if (t.type === 'pemasukan') {
            totalIncome += t.amount;
        } else {
            totalExpense += t.amount;
        }
    });
    
    const balance = totalIncome - totalExpense;
    
    // Update UI
    document.getElementById('balance-amount').textContent = formatRupiah(balance).replace('Rp', '').trim();
    document.getElementById('total-income').textContent = formatRupiah(totalIncome);
    document.getElementById('total-expense').textContent = formatRupiah(totalExpense);
    
    // Render Recent Transactions
    const recentTxContainer = document.getElementById('recent-transactions');
    recentTxContainer.innerHTML = '';
    
    const recentTx = [...userTransactions].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 5);
    
    if (recentTx.length === 0) {
        recentTxContainer.innerHTML = '<p class="text-center text-sm text-on-surface-variant py-8">Belum ada transaksi.</p>';
    } else {
        recentTx.forEach(tx => {
            const date = new Date(tx.created_at);
            const dateStr = date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }) + ', ' + 
                          date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
            
            const isIncome = tx.type === 'pemasukan';
            const colorClass = isIncome ? 'text-primary' : 'text-error';
            const sign = isIncome ? '+' : '-';
            
            let icon = 'payments';
            if (tx.category === 'Makanan & Minuman') icon = 'restaurant';
            else if (tx.category === 'Transportasi') icon = 'directions_car';
            else if (tx.category === 'Belanja') icon = 'shopping_bag';
            else if (tx.category === 'Investasi') icon = 'trending_up';
            else if (tx.category === 'Temen Ngutang') icon = 'handshake';
            
            const txEl = document.createElement('div');
            txEl.className = 'flex items-center justify-between p-3 bg-surface-container-lowest rounded-lg';
            txEl.innerHTML = `
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center">
                        <span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 1;">${icon}</span>
                    </div>
                    <div>
                        <p class="font-semibold text-sm">${tx.note || tx.category}</p>
                        <p class="text-[10px] text-on-surface-variant uppercase font-label">${dateStr}</p>
                    </div>
                </div>
                <p class="font-bold ${colorClass} text-sm">${sign}${formatRupiah(tx.amount)}</p>
            `;
            recentTxContainer.appendChild(txEl);
        });
    }
    
    // Check Limit Alert
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const monthlyExpense = userTransactions
        .filter(t => {
            const d = new Date(t.created_at);
            return t.type === 'pengeluaran' && d.getMonth() === currentMonth && d.getFullYear() === currentYear;
        })
        .reduce((sum, t) => sum + t.amount, 0);
        
    const limit = user.limit;
    const warningThreshold = limit * 0.9;
    
    const alertContainer = document.getElementById('limit-alert');
    if (monthlyExpense >= warningThreshold) {
        alertContainer.classList.remove('hidden');
        const sisa = limit - monthlyExpense;
        const alertMsg = monthlyExpense >= limit 
            ? 'Peringatan: Pengeluaran Anda sudah melebihi limit bulanan!' 
            : 'Peringatan: Pengeluaran Anda hampir mencapai limit bulanan!';
        const sisaMsg = sisa >= 0 
            ? `Sisa anggaran Anda untuk bulan ini adalah ${formatRupiah(sisa)}.`
            : `Anda telah melebihi limit sebesar ${formatRupiah(Math.abs(sisa))}.`;
            
        alertContainer.querySelector('.alert-title').textContent = alertMsg;
        alertContainer.querySelector('.alert-desc').textContent = sisaMsg;
    } else {
        alertContainer.classList.add('hidden');
    }
    
    // Close alert button
    alertContainer.querySelector('button')?.addEventListener('click', () => {
        alertContainer.classList.add('hidden');
    });

    // Navigation and Buttons
    document.querySelectorAll('[data-nav]').forEach(btn => {
        btn.addEventListener('click', () => {
            const page = btn.getAttribute('data-nav');
            if (page === 'logout') logout();
            else window.location.href = page;
        });
    });
    
    document.getElementById('add-tx-btn')?.addEventListener('click', () => {
        window.location.href = 'transaction.html';
    });
});
