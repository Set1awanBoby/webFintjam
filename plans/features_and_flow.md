# Fitur Utama dan Alur Aplikasi (Flow)

Dokumen ini menjelaskan alur kerja sistem dan rincian fitur-fitur dari Laporan Keuangan Fintjam berdasarkan kebutuhan yang diminta.

## 1. Alur Kerja (User Flow)
1. **Akses Pertama Kali (Unauthenticated)**:
   - Jika user membuka halaman aplikasi seperti `index.html`, `settings.html`, `report.html`, atau `tambah-transaksi`, sistem akan mengecek keberadaan `fintjam_currentUser` di localStorage.
   - Jika tidak ada, user akan **diredirect secara otomatis** ke halaman `login.html`.
2. **Registrasi Akun**:
   - Dari halaman login, user yang belum punya akun dapat menekan link daftar menuju `register.html`.
   - Proses registrasi hanya membutuhkan data `username` dan `password` biasa. Data disimpan ke array localStorage.
3. **Login & Set Limit Pertama Kali**:
   - Jika kredensial cocok, `userId` disimpan ke `fintjam_currentUser`.
   - Sistem akan mengecek apakah data user tersebut memiliki nilai `limit` > 0.
   - Jika limit belum diset (limit null/0), sistem akan redirect user ke halaman **Input Limit Pertama** (`limit.html`).
   - Jika limit sudah ada, user langsung diredirect ke `index.html` (Dashboard).
4. **Dashboard & Transaksi**:
   - Di `index.html`, user dapat melihat ringkasan keuangan dan melakukan *Tambah Pemasukan dan Pengeluaran*.
   - User dapat melihat daftar transaksi.
   - Terdapat fitur untuk mencetak laporan (redirect/tampil di `report.html`).

## 2. Rincian Fitur Utama

### A. Fitur Transaksi & Laporan
- **Tambah Pemasukan & Pengeluaran**: Sistem akan mengurangi atau menambah saldo berdasarkan tipe transaksi.
- **Pilihan Kategori Tersedia**:
  1. Makanan & Minuman
  2. Transportasi
  3. Belanja
  4. Gaji / Pendapatan
  5. Investasi
  6. Temen Ngutang
- **Cetak Laporan**: Fitur `Print` bawaan browser (via `window.print()`) pada halaman atau tampilan Laporan khusus.
- **Format Mata Uang Rupiah**: Semua nilai menggunakan penulisan rupiah. (Misal: Rp 50.000).

### B. Fitur Notifikasi & Peringatan Limit
- **Toast Alert Peringatan Limit**: Jika total pengeluaran bulan ini sudah mendekati batas `limit` atau bahkan melebihinya, sebuah Toast Alert (notifikasi pop-up kecil di pojok layar) akan muncul memberi peringatan pada user di halaman Dashboard.

### C. Fitur Pengaturan Akun
- **Halaman Pengaturan Sederhana**: Disediakan khusus untuk modifikasi data dasar profil.
  - Ganti Username
  - Ganti Password
  - Ganti Limit Pengeluaran Perbulan
  - *(Catatan: Avatar dan Full Name tidak digunakan sesuai instruksi).*
