# Langkah-Langkah Pengembangan (Development Steps)

Dokumen ini merincikan langkah-langkah teknis untuk mengembangkan Laporan Keuangan Fintjam di folder `@web`.

## Fase 1: Persiapan dan Setup Struktur
1. **Buat Direktori Utama**: Buat folder `web` dan subfolder `web/css` dan `web/js`.
2. **Setup Skrip Utility**: Buat file `web/js/app.js` sebagai core utility yang akan di-include di semua halaman.
   - Fungsi format uang (Rupiah).
   - Fungsi cek autentikasi (redirect jika tidak login).
   - Fungsi logout.

## Fase 2: Autentikasi & Setup Akun (Logic)
1. **Halaman Register**: 
   - Salin file `code.html` dari `@design/registrasi_fintjam` menjadi `web/register.html`.
   - Buat `web/js/auth.js`. Hubungkan form di `register.html` untuk memvalidasi input, membuat ID UUID sederhana, dan menyimpannya ke `fintjam_users` di LocalStorage.
2. **Halaman Login**:
   - Salin file dari `@design/login_fintjam` menjadi `web/login.html`.
   - Hubungkan form login di `auth.js` untuk mengecek kredensial. Jika berhasil, simpan ID di `fintjam_currentUser`.
3. **Halaman Atur Limit Pertama**:
   - Salin file dari `@design/atur_limit_fintjam` menjadi `web/limit.html`.
   - Buat logika di `app.js` (atau khusus) untuk membaca input limit, memperbarui data user bersangkutan di array, lalu menyimpannya kembali ke LocalStorage. Lalu redirect ke Dashboard.

## Fase 3: Dashboard Utama & Transaksi
1. **Halaman Dashboard**:
   - Salin file dari `@design/dashboard_fintjam` menjadi `web/index.html`.
   - Buat `web/js/dashboard.js`. 
   - Muat ringkasan (Total Pemasukan, Pengeluaran, Saldo) dari data transaksi di LocalStorage (filter berdasarkan current user).
   - Buat logika Toast Alert: hitung (total pengeluaran / limit bulanan). Jika mendekati atau lebih (misal > 90%), tampilkan Toast Peringatan.
2. **Halaman Tambah Transaksi**:
   - Salin file dari `@design/tambah_transaksi_fintjam`. Tergantung dari desain, ini bisa jadi modal di index atau di halaman `tambah-transaksi.html`.
   - Sesuaikan Dropdown Kategori menjadi pilihan spesifik: "Makanan & Minuman", "Transportasi", "Belanja", "Gaji / Pendapatan", "Investasi", dan "Temen Ngutang".
   - Buat form submit untuk menambahkan objek transaksi ke array `fintjam_transactions`.

## Fase 4: Fitur Pelengkap
1. **Halaman Cetak Laporan**:
   - Salin file dari `@design/laporan_cetak_fintjam` menjadi `web/report.html`.
   - Implementasi logika untuk merender tabel laporan berdasarkan semua data transaksi user di LocalStorage.
   - Tombol Print akan memanggil `window.print()`.
2. **Halaman Pengaturan**:
   - Salin file dari `@design/pengaturan_fintjam` menjadi `web/settings.html`.
   - Buat logika untuk menampilkan form Ganti Username, Password, dan Limit. (Abaikan bagian Avatar/Full Name pada form HTML).
   - Tombol simpan akan memperbarui data akun di LocalStorage.

## Fase 5: Finalisasi & Testing
- Lakukan manual testing untuk semua flow (Register -> Login -> Set Limit -> Dashboard -> Tambah Transaksi -> Report -> Settings).
- Verifikasi toast alert muncul dengan benar ketika mendekati limit.
- Verifikasi keamanan session (halaman tertutup tidak bisa diakses tanpa login).
