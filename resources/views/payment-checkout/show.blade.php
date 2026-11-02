@extends('layouts.admin')

@section('content')
<section id="checkout-content">
    <div class="panel form-panel checkout-panel">
        <span class="badge draft">Pembayaran demo</span>
        <div class="eyebrow">INDIHOME · MIDTRANS</div>
        <h1 id="checkout-name"></h1>
        <p>Nomor pelanggan contoh: 1234567890</p>
        <div class="reward-card">
            <small>Total tagihan</small>
            <strong id="checkout-amount"></strong>
        </div>
        <p>Batas waktu pembayaran: <span id="checkout-expiry"></span>.</p>
        <div class="form-section">Metode pembayaran tersedia</div>
        <div id="checkout-methods"></div>
        <div class="info">Ini preview UI pembayaran, bukan tagihan atau transaksi Midtrans aktif.</div>
        <br>
        <button class="primary" id="payment-demo-button">Lihat simulasi pembayaran</button>
    </div>
</section>
@endsection
