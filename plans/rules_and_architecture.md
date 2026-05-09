# Aturan dan Arsitektur Fintjam

Dokumen ini mendefinisikan aturan dasar dan arsitektur untuk pengembangan aplikasi Laporan Keuangan Fintjam.

## 1. Struktur Proyek
Sesuai dengan instruksi, semua kode sumber (HTML, CSS, JS) akan ditempatkan pada folder `@web`.

Struktur ideal di dalam folder `web`:
```text
web/
├── css/
│   └── style.css       (Untuk style kustom atau penyesuaian jika diperlukan)
├── js/
│   ├── app.js          (Logika utama aplikasi dan utility)
│   ├── auth.js         (Logika registrasi, login, dan manajemen session)
│   ├── dashboard.js    (Logika untuk halaman dashboard dan transaksi)
│   └── settings.js     (Logika untuk pengaturan dan batas limit)
├── index.html          (Halaman Dashboard Utama)
├── login.html          (Halaman Login)
├── register.html       (Halaman Registrasi)
├── limit.html          (Halaman Set Limit Pertama Kali)
├── report.html         (Halaman Cetak Laporan)
└── settings.html       (Halaman Pengaturan)
```

## 2. Aturan Pengembangan (Rules)
1. **Tanpa Framework JavaScript**: Semua logika akan menggunakan Vanilla JavaScript (tanpa React, Vue, Angular, dll).
2. **Desain UI/UX**: Mengacu langsung pada file `code.html` dari masing-masing folder desain di direktori `@design`. Jangan mengacu pada gambar PNG. Semua class Tailwind dan script konfigurasi `tailwind.config` pada file desain akan disalin ke file HTML pengembangan.
3. **Penyimpanan Data**: Semua data disimpan **eksklusif** menggunakan `localStorage` API dari browser. Tidak ada backend atau database eksternal.
4. **Session Management**: Session login akan ditandai dengan menyimpan `userId` atau `currentUser` di dalam `localStorage`.
5. **Konvensi Penamaan File**: Seperti aturan global, pembuatan folder menggunakan kebab-case dan isi komponen utamanya (jika ada) menggunakan format yang standar. Namun, karena ini adalah arsitektur Vanilla HTML/JS, halaman akan dipisah menjadi `.html` dan logic dalam `js/`.
6. **Mata Uang**: Semua nilai nominal uang yang ditampilkan harus diformat menjadi format Rupiah (Rp).

## 3. Acuan Desain
Setiap halaman harus merujuk pada folder desain berikut:
- Halaman Login: `@design/login_fintjam/code.html`
- Halaman Registrasi: `@design/registrasi_fintjam/code.html`
- Halaman Atur Limit: `@design/atur_limit_fintjam/code.html`
- Halaman Dashboard (Index): `@design/dashboard_fintjam/code.html`
- Halaman Pengaturan: `@design/pengaturan_fintjam/code.html`
- Cetak Laporan: `@design/laporan_cetak_fintjam/code.html`
- Tambah Transaksi: `@design/tambah_transaksi_fintjam/code.html` (Bisa dalam bentuk modal atau halaman terpisah, mengacu pada struktur desainnya).
