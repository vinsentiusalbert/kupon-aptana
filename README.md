# MyAds — Admin UI Laravel

UI admin Laravel 12 / PHP 8.2 untuk pembayaran, template WhatsApp, template kupon, dan campaign IndiHome. Halaman menggunakan route Laravel dan Blade terpisah per menu.

## Menjalankan

```sh
composer install
php artisan serve
```

Untuk checkout baru, salin `.env.example` ke `.env` dan jalankan `php artisan key:generate`. Buka http://127.0.0.1:8000/campaigns. UI tidak memerlukan database atau build npm.

## Struktur Blade

```text
resources/views/
├── layouts/admin.blade.php
├── partials/
│   ├── sidebar.blade.php
│   ├── header.blade.php
│   ├── footer.blade.php
│   ├── feedback.blade.php
│   ├── delete-dialog.blade.php
│   └── whatsapp-preview.blade.php
├── campaigns/
├── payment-setups/
├── whatsapp-templates/
├── coupon-templates/
├── overview/index.blade.php
├── payments/index.blade.php
├── audiences/index.blade.php
├── reports/index.blade.php
├── settings/index.blade.php
└── payment-checkout/show.blade.php
```

Empat menu yang dapat dikelola (`campaigns`, `payment-setups`, `whatsapp-templates`, `coupon-templates`) masing-masing mempunyai:

- `index.blade.php`: daftar.
- `create.blade.php`: halaman buat.
- `edit.blade.php`: halaman edit.
- `show.blade.php`: halaman detail.
- `_form.blade.php`: form bersama untuk create/edit.
- `_delete.blade.php`: konfirmasi hapus dari halaman detail.

Template WhatsApp juga memiliki `_cta.blade.php` untuk baris input CTA yang berulang. Menu ringkasan/transaksi hanya mempunyai view baca sesuai fungsinya.

## Route

Setiap menu yang dapat dikelola memakai URL dan named route Laravel:

| Halaman | Contoh URL | Route name |
| --- | --- | --- |
| Daftar | `/payment-setups` | `payment-setups.index` |
| Buat | `/payment-setups/create` | `payment-setups.create` |
| Edit | `/payment-setups/{recordId}/edit` | `payment-setups.edit` |
| Detail / hapus | `/payment-setups/{recordId}` | `payment-setups.show` |

Pola yang sama berlaku untuk campaign, template WhatsApp, dan template kupon. Root `/` mengarah ke `/campaigns`. Preview link pembayaran menggunakan `/payment-preview?setup=...`.

## Flow UI

1. Setup Pembayaran: nama pembayaran, nominal rupiah, metode, dan masa berlaku.
2. Template WhatsApp: isi pesan dan maksimal 2 CTA. CTA pertama wajib memilih nama pembayaran; link terisi otomatis. CTA kedua opsional.
3. Template Kupon: merchant, reward, kuota, masa berlaku, syarat, pesan WhatsApp biasa, dan CTA kupon.
4. Campaign: satu halaman tanpa stepper. Pilih template WhatsApp, file audience, tanggal/waktu pengiriman WIB, dan kupon yang dipakai setelah pembayaran berhasil.

## Batas demo

Tidak ada autentikasi, pengiriman WhatsApp, upload CSV, pemrosesan transaksi, atau integrasi API. Create/edit/delete disimulasikan memakai `sessionStorage` browser agar data bertahan saat berpindah route dan refresh pada sesi tab yang sama. Menutup sesi tab mengakhiri data demo. Hapus data yang masih dirujuk template/campaign diblokir agar relasi demo tetap konsisten.

`public/js/admin-data.js` berisi fixture, `public/js/admin-app.js` mengatur interaksi UI dan state demo, dan `public/js/ui.js` menyediakan ikon SVG lokal. `public/css/admin.css` dan `refinements.css` mengatur desain responsif.

## Tutorial perkenalan

Klik **Panduan** di header atau **Buka panduan** di sidebar untuk tutorial animasi 7 langkah. Tutorial menyorot menu terkait, mendukung Lanjut/Kembali/Lewati/Selesai, Escape, tombol panah, tampilan mobile, dan preferensi reduced motion. Tutorial tidak berpindah halaman atau mengubah draft form.

- `resources/views/partials/tutorial.blade.php`: dialog panduan.
- `public/js/tutorial.js`: konten langkah, navigasi, dan posisi sorotan.
- `public/css/tutorial.css`: animasi dan layout.
- Jalankan `npm run test:tutorial` dengan server Laravel aktif untuk mengulang pengujian browser.

## Pemeriksaan aplikasi

```sh
php artisan test
php artisan view:cache
node --check public/js/admin-app.js
```

Pengujian browser menggunakan Microsoft Edge yang terpasang dan server Laravel aktif pada port 8000:

```sh
npm install
npm run test:browser
```

Set `TEST_URL` jika server menggunakan URL lain. Tes browser mencakup seluruh menu, CRUD keempat modul, preview nominal, relasi CTA/template/campaign, maksimum dua CTA, penghapusan data terpakai, link invalid, data tidak ditemukan, layout mobile, dan error JavaScript. Test Laravel memeriksa route, view, dan literal variabel WhatsApp.
