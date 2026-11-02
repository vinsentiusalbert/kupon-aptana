@extends('layouts.admin')

@section('content')
<div class="page-heading"><div><a class="back" href="/payment-setups"><span data-icon="back"></span> Kembali ke setup pembayaran</a><h1>Detail setup pembayaran</h1><p>Data contoh untuk preview UI admin.</p></div><div class="detail-actions"><a class="secondary" href="/payment-setups/{{ $recordId }}/edit">Edit</a><button type="button" class="secondary" id="delete-button">Hapus</button></div></div><section class="panel form-panel" id="record-detail"></section>
@push('dialogs')
@include('payment-setups._delete')
@endpush
@endsection
