@extends('layouts.admin')

@section('content')
<div class="page-heading">
<div>
<div class="eyebrow">PAYMENT GATEWAY</div>
<h1>Setup Pembayaran</h1>
<p>Buat konfigurasi pembayaran dan generate link untuk CTA campaign.</p>
</div>
<a class="primary" href="/payment-setups/create">
<span class="inline-icon">
<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M12 5v14M5 12h14">
</path>
</svg>
</span> Buat setup pembayaran</a>
</div>
<div class="panel">
<div class="panel-title">
<h2>Daftar setup pembayaran</h2>
</div>
<div class="table-scroll">
<table>
<thead>
<tr>
<th>NAMA SETUP</th>
<th>NOMINAL</th>
<th>METODE</th>
<th>BATAS WAKTU</th>
<th>LINK PEMBAYARAN</th>
<th>AKSI</th>
</tr>
</thead>
<tbody id="records-body">
</tbody>
</table>
</div>
</div>
<p class="preview-note">Setup disimpan selama sesi halaman terbuka. Link membuka checkout demo tanpa memproses transaksi.</p>
@endsection
