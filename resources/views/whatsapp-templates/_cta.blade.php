{{-- Repeated client-side CTA controls. The form supports one payment CTA and one optional link. --}}
<template id="cta-row">
    <div class="cta-editor">
        <div class="cta-editor-heading">
            <b data-cta-heading></b>
            <button type="button" class="back" data-cta-remove>Hapus</button>
        </div>
        <label class="field">
            Nama CTA
            <input data-cta-name required maxlength="25" placeholder="Contoh: Bayar Sekarang">
        </label>
        <label class="field" data-payment-choice>
            Pilih nama pembayaran
            <select required></select>
            <small>Daftar berasal dari Setup Pembayaran. Link CTA otomatis mengikuti pilihan ini.</small>
        </label>
        <label class="field">
            Link tujuan
            <input data-cta-url type="url" placeholder="https://contoh.com/info">
            <small data-cta-note></small>
        </label>
    </div>
</template>
