<div class="page-heading">
    <div>
        <a class="back" href="/whatsapp-templates">
            <span class="inline-icon">
                <svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M20 12H4m6-6-6 6 6 6">
                    </path>
                </svg>
            </span> Kembali ke template WhatsApp</a>
        <h1>{{ $heading }}</h1>
        <p>Siapkan pesan Anda dan lihat tampilannya sebelum digunakan pada campaign.</p>
    </div>
    <span class="badge draft">Template demo</span>
</div>
<div class="wizard-grid">
    <form id="template-form">
        <div class="panel form-panel">
            <h2>Informasi template</h2>
            <p>Identitas dan jenis pesan yang akan dipilih pada campaign.</p>
            <label class="field">Nama template<input name="name" required="" maxlength="100" placeholder="Contoh: Pengingat tagihan bulanan" value="">
            </label>
            <div class="fields">
                <label class="field">Jenis pesan<select name="type">
                        <option value="reminder">Pengingat tagihan</option>
                    </select>
                </label>
                <label class="field">Bahasa<input value="Indonesia" readonly="">
                </label>
            </div>
            <div class="form-section">Konten pesan</div>
            <label class="field">Isi pesan<textarea name="message" required="" maxlength="2000" style="min-height:230px">Halo @{{nama}},</textarea>
                <small id="message-count">14 / 2.000 karakter</small>
            </label>
            <div class="info">Variabel personalisasi: @{{nama}}, @{{no_pelanggan}}, @{{tagihan}}. Preview menggunakan contoh data pelanggan.</div>
            <div class="form-section">Tombol tindakan</div>
            <p class="preview-note">Maksimal 2 tombol. Isi nama dan link tujuan untuk setiap CTA.</p>
            <div id="cta-fields"></div>
            <button type="button" class="secondary" id="add-cta">
                <span class="inline-icon">
                    <svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M12 5v14M5 12h14">
                        </path>
                    </svg>
                </span> Tambah CTA</button>
        </div>
        <div class="wizard-footer">
            <a class="secondary" href="/whatsapp-templates">Batal</a>
            <button class="primary" type="submit">Simpan template demo</button>
        </div>
    </form>
    @include('partials.whatsapp-preview', ['messageId' => 'template-preview', 'ctaId' => 'template-cta'])
</div>

@include('whatsapp-templates._cta')
