{{-- Shared WhatsApp message preview. Only the message and CTA change per menu. --}}
<aside class="preview-panel">
    <div class="preview-label"><b>Preview WhatsApp</b><span>LIVE PREVIEW</span></div>
    <p>Gambaran pesan yang diterima pelanggan.</p>
    <div @if(isset($containerId)) id="{{ $containerId }}" @endif>
        <div class="phone">
            <div class="phone-top">9:41 <span>● ▰</span></div>
            <div class="wa-header">
                <span class="wa-avatar">IH</span>
                <div><b>IndiHome <span>✓</span></b><small>Akun bisnis resmi</small></div>
            </div>
            <div class="wa-body">
                <span class="today">HARI INI</span>
                <div class="message">
                    <div @if(isset($messageId)) id="{{ $messageId }}" @endif style="white-space:pre-wrap;overflow-wrap:anywhere"></div>
                    <small>09.41 ✓✓</small>
                    <div class="wa-cta" @if(isset($ctaId)) id="{{ $ctaId }}" @endif></div>
                </div>
                <div class="encrypted"><span data-icon="lock"></span> Pesan dari akun bisnis resmi.</div>
            </div>
            <div class="phone-bottom"><span data-icon="plus"></span><div>Ketik pesan</div><span data-icon="mic"></span></div>
        </div>
        <p class="preview-note">Preview ilustrasi. Tidak ada pesan yang dikirim.</p>
    </div>
</aside>
