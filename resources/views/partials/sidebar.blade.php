<aside class="sidebar">
    <a class="brand" href="/">MyAds<span>BUSINESS PLATFORM</span>
    </a>
    <div class="workspace">
        <div class="workspace-icon">I</div>
        <div>
            <b>IndiHome</b>
            <small>Enterprise workspace</small>
        </div>
        <span>⌄</span>
    </div>
    <p class="nav-label">OPERASIONAL</p>
    <nav aria-label="Operasional">
        <a href="/overview"  aria-label="Overview" title="Overview"  class="{{ $menu === 'overview' ? 'active' : '' }}" aria-current="{{ $menu === 'overview' ? 'page' : 'false' }}">
            <i data-icon="grid">
            </i>
            <span class="nav-text">Overview</span>
        </a>
        <a href="/campaigns"  aria-label="Campaign" title="Campaign"  class="{{ $menu === 'campaigns' ? 'active' : '' }}" aria-current="{{ $menu === 'campaigns' ? 'page' : 'false' }}">
            <i data-icon="send">
            </i>
            <span class="nav-text">Campaign</span>
            <span class="nav-count">6</span>
        </a>
        <a href="/payments"  aria-label="Transaksi pembayaran" title="Transaksi pembayaran"  class="{{ $menu === 'payments' ? 'active' : '' }}" aria-current="{{ $menu === 'payments' ? 'page' : 'false' }}">
            <i data-icon="receipt">
            </i>
            <span class="nav-text">Transaksi pembayaran</span>
        </a>
        <a href="/audiences"  aria-label="Audience" title="Audience"  class="{{ $menu === 'audiences' ? 'active' : '' }}" aria-current="{{ $menu === 'audiences' ? 'page' : 'false' }}">
            <i data-icon="users">
            </i>
            <span class="nav-text">Audience</span>
        </a>
        <a href="/reports"  aria-label="Laporan" title="Laporan"  class="{{ $menu === 'reports' ? 'active' : '' }}" aria-current="{{ $menu === 'reports' ? 'page' : 'false' }}">
            <i data-icon="chart">
            </i>
            <span class="nav-text">Laporan</span>
        </a>
    </nav>
    <p class="nav-label">PERSIAPAN CAMPAIGN</p>
    <nav aria-label="Persiapan campaign">
        <a href="/payment-setups"  aria-label="Setup Pembayaran" title="Setup Pembayaran"  class="{{ $menu === 'payment-setups' ? 'active' : '' }}" aria-current="{{ $menu === 'payment-setups' ? 'page' : 'false' }}">
            <i data-icon="card">
            </i>
            <span class="nav-text">Setup Pembayaran</span>
        </a>
        <a href="/whatsapp-templates"  aria-label="Template WhatsApp" title="Template WhatsApp"  class="{{ $menu === 'whatsapp-templates' ? 'active' : '' }}" aria-current="{{ $menu === 'whatsapp-templates' ? 'page' : 'false' }}">
            <i data-icon="message">
            </i>
            <span class="nav-text">Template WhatsApp</span>
        </a>
        <a href="/coupon-templates"  aria-label="Template Kupon" title="Template Kupon"  class="{{ $menu === 'coupon-templates' ? 'active' : '' }}" aria-current="{{ $menu === 'coupon-templates' ? 'page' : 'false' }}">
            <i data-icon="ticket">
            </i>
            <span class="nav-text">Template Kupon</span>
        </a>
    </nav>
    <p class="nav-label">PREFERENSI</p>
    <nav aria-label="Preferensi">
        <a href="/settings"  aria-label="Pengaturan" title="Pengaturan"  class="{{ $menu === 'settings' ? 'active' : '' }}" aria-current="{{ $menu === 'settings' ? 'page' : 'false' }}">
            <i data-icon="settings">
            </i>
            <span class="nav-text">Pengaturan</span>
        </a>
    </nav>
    <div class="sidebar-bottom">
        <div class="help">
            <b>Butuh bantuan?</b>
            <p>Panduan untuk campaign pertamamu.</p>
            <button id="guide">Buka panduan ↗</button>
        </div>
        <div class="profile">
            <span class="avatar">AP</span>
            <div>
                <b>Admin Partner</b>
                <small>admin@indihome.co.id</small>
            </div>
            <span>⌄</span>
        </div>
    </div>
</aside>
