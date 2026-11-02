<div class="page-heading">
    <div>
        <a class="back" href="/campaigns">
            <span class="inline-icon">
                <svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M20 12H4m6-6-6 6 6 6">
                    </path>
                </svg>
            </span> Kembali ke campaign</a>
        <h1>{{ $heading }}</h1>
        <p>Pilih template, audience, dan jadwal pengiriman campaign.</p>
    </div>
    <span class="badge draft">Draft campaign</span>
</div>
<form id="campaign-form">
    <div class="wizard-grid">
        <div>
            <div class="panel form-panel" id="step-content">
                <section class="campaign-form-section" data-section="0">
                    <h2>Informasi campaign</h2>
                    <p>Isi nama, pilih template pesan, lalu tentukan jadwal pengiriman.</p>
                    <label class="field">Nama campaign *<input data-key="name" type="text" value="Reminder Tagihan November">
                    </label>
                    <div class="campaign-template-picker">
                        <label class="field">Pilih template WhatsApp<select data-key="templateId" aria-describedby="template-help-templateId">
                                <option value="reminder" selected="">Pengingat tagihan IndiHome</option>
                                <option value="due">Pengingat jatuh tempo</option>
                            </select>
                            <small id="template-help-templateId">Pilih template dari menu Template WhatsApp. Preview pesan langsung mengikuti pilihan Anda.</small>
                        </label>
                        <div id="selected-template-summary-templateId" class="info" aria-live="polite">
                            <b>Pengingat tagihan IndiHome</b>
                            <br>Tombol CTA:<br>Bayar Sekarang<small class="subtext" style="white-space:normal;overflow-wrap:anywhere">http://127.0.0.1:8000/#pay?setup=%7B%22name%22%3A%22Tagihan%20IndiHome%20November%22%2C%22amount%22%3A395000%2C%22methods%22%3A%5B%22QRIS%22%2C%22GoPay%22%2C%22Virtual%20account%22%5D%2C%22expiry%22%3A%2224%22%7D</small>
                        </div>
                    </div>
                    <div class="fields">
                        <label class="field">Tanggal mulai<input data-key="start" type="date" value="2026-11-01">
                        </label>
                        <label class="field">Tanggal berakhir<input data-key="end" type="date" value="2026-11-20">
                        </label>
                    </div>
                    <div class="form-section">Penerima campaign</div>
                    <div class="upload">
                        <span>⇧</span>
                        <b>Tambahkan audience dari file CSV</b>
                        <p>Kolom: nama, no_whatsapp, no_pelanggan</p>
                        <input type="file" id="audience-file" accept=".csv" aria-label="Pilih file audience">
                        <p id="file-note">File hanya dipilih untuk preview, tidak diunggah.</p>
                    </div>
                    <label class="field">Nomor WhatsApp pengirim<select data-key="sender">
                            <option selected="">IndiHome · +62 811 1000 100</option>
                        </select>
                    </label>
                    <div class="form-section">Jadwal pengiriman</div>
                    <div class="fields">
                        <label class="field">Tanggal pengiriman<input data-key="sendDate" type="date" value="2026-11-02">
                        </label>
                        <label class="field">Waktu pengiriman (WIB)<input data-key="time" type="time" value="09:00">
                        </label>
                    </div>
                    <p class="preview-note">Jadwal pengiriman menggunakan zona waktu WIB (Asia/Jakarta).</p>
                </section>
                <section class="campaign-form-section" data-section="1">
                    <h2 class="success-heading">Setelah pembayaran berhasil</h2>
                    <p>Pilih template kupon untuk dikirim kepada pelanggan yang berhasil membayar.</p>
                    <label class="field">Template kupon<select data-key="couponId">
                            <option value="coffee" selected="">Kupon Kopi Sareeng</option>
                            <option value="shopping">Kupon Belanja Pelanggan</option>
                        </select>
                        <small>Pengaturan kupon dan pesan dikelola di menu Template Kupon.</small>
                    </label>
                    <div class="info" id="coupon-selection">
                        <b>Kupon Kopi Sareeng</b>
                        <br>Diskon 50% Kopi · Kopi Sareeng<br>Kuota 10000 · Berlaku hingga 2026-12-31</div>
                    <br>
                    <button type="button" class="secondary" id="preview-coupon">Preview pesan kupon</button>
                </section>
            </div>
            <div class="wizard-footer">
                <a class="secondary" href="/campaigns">Batal</a>
                <div>
                    <button type="submit" class="primary" id="save">Simpan draft</button>
                    <button type="button" class="secondary" id="next">Review campaign</button>
                </div>
            </div>
        </div>
        @include('partials.whatsapp-preview', ['messageId' => 'preview-message', 'ctaId' => 'preview-cta'])
    </div>
</form>
