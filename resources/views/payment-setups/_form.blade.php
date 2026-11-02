<div class="page-heading">
<div>
<a class="back" href="/payment-setups">
<span class="inline-icon">
<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M20 12H4m6-6-6 6 6 6">
</path>
</svg>
</span> Kembali ke setup pembayaran</a>
<h1>{{ $heading }}</h1>
<p>Pilih setup ini pada CTA template WhatsApp. Campaign menggunakan CTA dari template.</p>
</div>
</div>
<div class="wizard-grid">
<form id="payment-form">
<div class="panel form-panel">
<h2>Informasi pembayaran</h2>
<p>Gunakan kembali setup ini pada beberapa campaign.</p>
<label class="field">Nama setup<input name="setupName" required="" maxlength="100" value="" placeholder="Contoh: Tagihan IndiHome November">
</label>
<label class="field">Payment gateway<input readonly="" value="Midtrans · Demo">
</label>
<div class="form-section">Metode pembayaran</div>
<label class="choice">
<input type="checkbox" name="method" value="QRIS" checked="">QRIS</label>
<label class="choice">
<input type="checkbox" name="method" value="GoPay" checked="">GoPay</label>
<label class="choice">
<input type="checkbox" name="method" value="Virtual account">Virtual account</label>
<label class="choice">
<input type="checkbox" name="method" value="Kartu kredit / debit">Kartu kredit / debit</label>
<div class="form-section">Pengaturan tagihan</div>
<label class="field">Nominal tagihan (Rp)<input name="amount" type="number" inputmode="numeric" min="1" max="999999999999" step="1" required="" value="" placeholder="Contoh: 395000">
<small>Masukkan nominal dalam rupiah tanpa titik atau koma.</small>
</label>
<label class="field">Batas waktu pembayaran<select name="expiry">
<option value="6">6 jam</option>
<option value="12">12 jam</option>
<option value="24" selected="">24 jam</option>
<option value="48">48 jam</option>
</select>
</label>
<div class="info">Pembayaran berhasil → kirim kupon.<br>Pembayaran gagal / kedaluwarsa → kupon tidak dikirim.</div>
</div>
<div class="wizard-footer">
<a class="secondary" href="/payment-setups">Batal</a>
<button class="primary" type="submit">Simpan &amp; generate link</button>
</div>
</form>
<aside class="preview-panel">
<div class="preview-label">
<b>Preview pembayaran</b>
<span>DEMO</span>
</div>
<div class="panel form-panel" style="margin-top:20px">
<div class="eyebrow">INDIHOME</div>
<h2 id="payment-preview-name" style="margin-top:18px">Nama setup pembayaran</h2>
<p>Total tagihan contoh</p>
<h1 id="payment-preview-amount">Rp—</h1>
<div class="info" id="payment-preview-methods">QRIS · GoPay · 24 jam</div>
<p class="preview-note">Nominal mengikuti pengaturan tagihan di atas. Tidak ada transaksi yang diproses.</p>
</div>
</aside>
</div>
