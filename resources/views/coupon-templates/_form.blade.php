<div class="page-heading">
<div>
<a class="back" href="/coupon-templates">
<span class="inline-icon">
<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M20 12H4m6-6-6 6 6 6">
</path>
</svg>
</span> Kembali ke template kupon</a>
<h1>{{ $heading }}</h1>
<p>Siapkan reward dan pesan apresiasi dalam satu template.</p>
</div>
</div>
<div class="wizard-grid">
<form id="coupon-form">
<div class="panel form-panel">
<h2>Informasi kupon</h2>
<p>Template ini digunakan setelah pelanggan berhasil membayar.</p>
<label class="field">Nama template kupon<input name="name" type="text" required="" maxlength="200" value="">
</label>
<label class="field">Merchant<input name="merchant" type="text" required="" maxlength="200" value="">
</label>
<label class="field">Nama reward<input name="reward" type="text" required="" maxlength="200" value="">
</label>
<div class="fields">
<label class="field">Kuota kupon<input name="quota" type="number" required="" min="1" max="1000000000" step="1" value="1000">
</label>
<label class="field">Berlaku hingga<input name="valid" type="date" required="" maxlength="200" value="2026-12-31">
</label>
</div>
<label class="field">Syarat &amp; ketentuan<textarea name="terms" required="" maxlength="2000">
</textarea>
</label>
<div class="form-section">Pesan WhatsApp setelah pembayaran</div>
<label class="field">Isi pesan<textarea name="message" required="" maxlength="2000">Halo @{{nama}}, terima kasih! Pembayaran Anda berhasil. Berikut kupon untuk Anda.</textarea>
<small>Gunakan @{{nama}} untuk nama pelanggan.</small>
</label>
<label class="field">Nama CTA kupon<input name="cta" type="text" required="" maxlength="25" value="Lihat Kupon">
</label>
<label class="field">Link kupon<input name="url" type="url" required="" maxlength="200" value="">
</label>
<div class="info">Kupon dikirim setelah pembayaran berhasil. Pembayaran gagal atau kedaluwarsa tidak mengirim kupon.</div>
</div>
<div class="wizard-footer">
<a class="secondary" href="/coupon-templates">Batal</a>
<button class="primary" type="submit">Simpan template kupon</button>
</div>
</form>
<aside class="preview-panel">
<div class="preview-label">
<b>Preview WhatsApp</b>
<span>LIVE PREVIEW</span>
</div>
<div id="coupon-live-preview">
<div class="phone">
<div class="phone-top">9:41 <span>● ▰</span>
</div>
<div class="wa-header">
<span class="wa-avatar">IH</span>
<div>
<b>IndiHome ✓</b>
<small>Akun bisnis resmi</small>
</div>
</div>
<div class="wa-body">
<span class="today">HARI INI</span>
<div class="message">
<div style="white-space:pre-wrap;overflow-wrap:anywhere">Halo Ardiansyah, terima kasih! Pembayaran Anda berhasil. Berikut kupon untuk Anda.</div>
<small>09.41 ✓✓</small>
<div class="wa-cta">
<span class="cta-link">↗ Lihat Kupon</span>
</div>
</div>
</div>
</div>
<p class="preview-note">
</p>
</div>
</aside>
</div>
