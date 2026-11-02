@extends('layouts.admin')

@section('content')
<div class="page-heading">
    <div>
        <div class="eyebrow">WHATSAPP BUSINESS</div>
        <h1>Template WhatsApp</h1>
        <p>Kelola pesan dan tombol CTA untuk digunakan pada campaign.</p>
    </div>
    <a class="primary" href="/whatsapp-templates/create">
        <span class="inline-icon">
            <svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M12 5v14M5 12h14">
                </path>
            </svg>
        </span> Buat template</a>
</div>
<div class="panel">
    <div class="panel-title">
        <div>
            <h2>Daftar template</h2>
            <p>Template demo tersedia untuk dipilih pada setup campaign.</p>
        </div>
    </div>
    <div class="table-scroll">
        <table>
            <thead>
                <tr>
                    <th>NAMA TEMPLATE</th>
                    <th>JENIS PESAN</th>
                    <th>BAHASA</th>
                    <th>TOMBOL CTA</th>
                    <th>AKSI</th>
                </tr>
            </thead>
            <tbody id="records-body">
            </tbody>
        </table>
    </div>
</div>
<p class="preview-note">Mode demo: perubahan hanya berlaku selama halaman terbuka. Template tidak dikirim untuk persetujuan WhatsApp.</p>
@endsection
