@extends('layouts.admin')

@section('content')
<div class="page-heading"><div><a class="back" href="/coupon-templates"><span data-icon="back"></span> Kembali ke template kupon</a><h1>Detail template kupon</h1><p>Data contoh untuk preview UI admin.</p></div><div class="detail-actions"><a class="secondary" href="/coupon-templates/{{ $recordId }}/edit">Edit</a><button type="button" class="secondary" id="delete-button">Hapus</button></div></div><section class="panel form-panel" id="record-detail"></section>
@push('dialogs')
@include('coupon-templates._delete')
@endpush
@endsection
