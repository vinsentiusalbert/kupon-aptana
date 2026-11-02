@extends('layouts.admin')

@section('content')
<section id="listing">
<div class="page-heading">
<div>
<div class="eyebrow">BROADCAST & REWARDS</div>
<h1>Campaign</h1>
<p>Bangun koneksi, ingatkan pembayaran, berikan apresiasi.</p>
</div>
<a class="primary" href="/campaigns/create">
<span data-icon="plus">
</span> Buat campaign</a>
</div>
<div class="journey-banner">
<div class="banner-copy">
<div class="banner-icon" data-icon="send">
</div>
<div>
<b>Siapkan sekali. Jalankan setiap campaign.</b>
<p>Pembayaran terhubung ke CTA pesan. Kupon dikirim setelah pembayaran berhasil.</p>
</div>
</div>
<div class="setup-flow">
<a href="/payment-setups">
<span data-icon="card">
</span> Setup pembayaran</a>
<span data-icon="arrow">
</span>
<a href="/whatsapp-templates">
<span data-icon="message">
</span> Template WhatsApp</a>
<span data-icon="arrow">
</span>
<a href="/coupon-templates">
<span data-icon="ticket">
</span> Template kupon</a>
<span data-icon="arrow">
</span>
<a href="/campaigns/create">
<span data-icon="send">
</span> Buat campaign</a>
</div>
</div>
<div class="stats">
<article>
<span>Total campaign <i>◉</i>
</span>
<strong>6<small>campaign</small>
</strong>
<p>
<em>2 aktif</em> sedang berjalan</p>
</article>
<article>
<span>Pesan terkirim <i>↗</i>
</span>
<strong>24.850<small>pesan</small>
</strong>
<p>
<em>↑ 12,8%</em> dari bulan lalu</p>
</article>
<article>
<span>Pembayaran berhasil <i>▣</i>
</span>
<strong>18.420<small>pelanggan</small>
</strong>
<p>
<em>74,1%</em> dari pesan terkirim</p>
</article>
<article>
<span>Kupon ditukarkan <i>♧</i>
</span>
<strong>8.264<small>kupon</small>
</strong>
<p>
<em>44,9%</em> dari kupon dibagikan</p>
</article>
</div>
<section class="panel">
<div class="panel-title">
<div>
<h2>Semua campaign <span class="count">6</span>
</h2>
<p>Kelola broadcast dan pantau perjalanan campaign Anda.</p>
</div>
<button class="secondary" id="export">↓ &nbsp; Ekspor</button>
</div>
<div class="table-toolbar">
<div class="tabs" role="tablist">
<button class="selected" data-filter="Semua">Semua <span>6</span>
</button>
<button data-filter="Aktif">Aktif <span>2</span>
</button>
<button data-filter="Terjadwal">Terjadwal <span>1</span>
</button>
<button data-filter="Draft">Draft <span>2</span>
</button>
<button data-filter="Selesai">Selesai <span>1</span>
</button>
</div>
<div class="search-tools">
<label class="search">⌕ <input id="search" placeholder="Cari campaign…" aria-label="Cari campaign">
</label>
<select id="channel" aria-label="Filter channel">
<option value="">Semua channel</option>
<option>WhatsApp</option>
</select>
</div>
</div>
<div class="table-scroll">
<table>
<thead>
<tr>
<th>CAMPAIGN</th>
<th>STATUS</th>
<th>AUDIENCE</th>
<th>PEMBAYARAN</th>
<th>REWARD</th>
<th>PERIODE</th>
<th>AKSI</th>
</tr>
</thead>
<tbody id="records-body">
</tbody>
</table>
</div>
<div class="table-footer">
<span id="row-count">Menampilkan 6 dari 6 campaign</span>
<div>
<button disabled>← Sebelumnya</button>
<button class="current">1</button>
<button disabled>Selanjutnya →</button>
</div>
</div>
</section>
<div class="bottom-note">♧ &nbsp; Setiap pembayaran tepat waktu, sebuah apresiasi yang berarti.<span>Data ilustrasi · November 2026</span>
</div>
</section>

@endsection
