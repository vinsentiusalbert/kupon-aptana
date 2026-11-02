@extends('layouts.admin')

@section('content')
<div class="page-heading">
<div>
<div class="eyebrow">CUSTOMER REWARDS</div>
<h1>Template Kupon</h1>
<p>Kelola template kupon dan pesan setelah pembayaran berhasil.</p>
</div>
<a class="primary" href="/coupon-templates/create">
<span class="inline-icon">
<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M12 5v14M5 12h14">
</path>
</svg>
</span> Buat template kupon</a>
</div>
<div class="panel">
<div class="panel-title">
<h2>Template kupon</h2>
</div>
<div class="table-scroll">
<table>
<thead>
<tr>
<th>NAMA TEMPLATE</th>
<th>REWARD / MERCHANT</th>
<th>KUOTA</th>
<th>BERLAKU HINGGA</th>
<th>AKSI</th>
</tr>
</thead>
<tbody id="records-body">
</tbody>
</table>
</div>
</div>
<p class="preview-note">Template tersedia untuk dipilih pada campaign. Perubahan demo berlaku selama halaman terbuka.</p>
@endsection
