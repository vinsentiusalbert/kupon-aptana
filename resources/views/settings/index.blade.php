@extends('layouts.admin')

@section('content')
<div class="page-heading">
    <div>
        <div class="eyebrow">WORKSPACE</div>
        <h1>Pengaturan</h1>
        <p>Ringkasan pengaturan Anda · data ilustrasi.</p>
    </div>
</div>
<div class="panel form-panel">
    <h2>Profil workspace</h2>
    <p>Identitas bisnis yang digunakan pada admin.</p>
    <div class="fields">
        <label class="field">Nama workspace<input value="IndiHome">
        </label>
        <label class="field">Email admin<input type="email" value="admin@indihome.co.id">
        </label>
    </div>
    <div class="info">WhatsApp Business · IndiHome<br>Payment gateway · Midtrans (sandbox)<br>Reward partner · Kuponku.id</div>
    <br>
    <button class="primary" id="settings-save">Simpan perubahan</button>
</div>
@endsection
