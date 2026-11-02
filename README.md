# MyAds — Campaign & Rewards Admin

UI Laravel 12 / PHP 8.2 untuk alur campaign WhatsApp → pembayaran Midtrans → kupon dan reward.

## Jalankan

Dependensi sudah terpasang pada workspace ini:

```sh
php artisan serve
```

Buka http://127.0.0.1:8000 dan klik **Buat campaign**.

Untuk checkout baru: jalankan `composer install`, salin `.env.example` ke `.env`, lalu `php artisan key:generate` dan `php artisan serve`. Tidak perlu npm build atau database untuk UI.

## Fitur UI

- Daftar campaign, filter status, pencarian, detail, ekspor CSV data contoh.
- Form campaign satu halaman tanpa stepper, dengan review.
- Menu **Setup Kupon & Reward** (`/#coupon-templates`) menyediakan daftar serta halaman buat/edit dengan live preview WhatsApp. Campaign hanya memilih template kupon pada bagian **Setelah pembayaran berhasil**; merchant, reward, kuota, masa berlaku, syarat, pesan, dan CTA diatur di menu terpisah tersebut.
- Menu Template WhatsApp dengan halaman buat/edit tersendiri dan live preview WhatsApp di samping form (responsif). URL demo: `/#templates/create`. Campaign hanya memilih template yang tersedia; preview mengikuti template terpilih.
- Setiap template mendukung maksimal 2 CTA, masing-masing berisi nama tombol dan URL HTTP/HTTPS. Tombol dapat ditambah/dihapus, tampil pada preview template dan campaign, dan membuka URL di tab baru. URL bawaan menggunakan example.com sebagai ilustrasi.
- CTA pertama pada template pengingat wajib menuju pembayaran. Menu **Setup Pembayaran** (`/#payment-setups`) menyediakan daftar, form buat/edit, dan generate link checkout demo. CTA pada Template WhatsApp memilih setup pembayaran; campaign hanya memilih template. Placeholder `{{payment_url}}` otomatis diganti link setup terpilih. CTA kedua tetap opsional. Link demo menyertakan konfigurasi contoh agar preview bisa dibuka di tab baru, tanpa integrasi Midtrans atau penyimpanan backend.
- Pilihan audience, jadwal broadcast, metode pembayaran, masa berlaku, merchant, kuota, syarat kupon.
- Halaman overview, pembayaran, audience, laporan, pengaturan.

UI saja, seluruh data adalah ilustrasi. Tidak ada pengiriman WhatsApp, pemrosesan pembayaran, autentikasi, integrasi API, atau penyimpanan bisnis. Input form campaign berada di memori browser dan hilang saat refresh. File CSV audience hanya dipilih, tidak diunggah atau diproses. Simpan draft merupakan interaksi demo.

## Berkas utama

- `routes/web.php`
- `resources/views/admin.blade.php`
- `public/css/admin.css`
- `public/js/admin.js`
- `public/css/refinements.css`: sistem visual admin, form, navigasi, tabel, dan layout responsif.
- `public/js/ui.js`: ikon SVG lokal konsisten serta label aksesibilitas navigasi/filter.

Navigasi dikelompokkan menjadi Operasional, Persiapan Campaign, dan Preferensi. Alur persiapan: Setup Pembayaran → Template WhatsApp (CTA pembayaran) → Template Kupon → Campaign. Campaign tetap satu halaman, tanpa stepper dan tanpa mengatur ulang pembayaran atau kupon.

## Verifikasi

`php artisan test`, `php artisan view:cache`, dan `node --check public/js/admin.js`.

Render Laravel dan sintaks telah diperiksa. Pemeriksaan visual browser belum dilakukan. Google Fonts opsional dengan fallback sans-serif.

Regresi tombol buat telah diverifikasi di browser Edge headless: membuat/menyimpan pembayaran, template WhatsApp, template kupon, dan memilih template baru di campaign. Untuk mengulang, pasang `playwright` lokal (`npm install --no-save --package-lock=false playwright`), jalankan Laravel di port 8000, lalu `node tests/browser-create-flows.cjs`.
