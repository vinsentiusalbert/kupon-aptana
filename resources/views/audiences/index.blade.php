@extends('layouts.admin')

@section('content')
<div class="page-heading">
    <div>
        <div class="eyebrow">WORKSPACE</div>
        <h1>Audience</h1>
        <p>Ringkasan audience Anda · data ilustrasi.</p>
    </div>
</div>
<div class="panel form-panel">
    <h2>Daftar audience</h2>
    <p>Segmen pelanggan untuk broadcast WhatsApp.</p>
    <div class="table-scroll">
        <table>
            <thead>
                <tr>
                    <th>NAMA AUDIENCE</th>
                    <th>PELANGGAN</th>
                    <th>TERAKHIR DIPERBARUI</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Pelanggan IndiHome · November 2026</td>
                    <td>12.500</td>
                    <td>01 Nov 2026</td>
                </tr>
                <tr>
                    <td>Pelanggan jatuh tempo</td>
                    <td>4.000</td>
                    <td>01 Nov 2026</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
@endsection
