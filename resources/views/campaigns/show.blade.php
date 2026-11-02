@extends('layouts.admin')

@section('content')
<div class="page-heading"><div><a class="back" href="/campaigns"><span data-icon="back"></span> Kembali ke campaign</a><h1>Detail campaign</h1><p>Data contoh untuk preview UI admin.</p></div><div class="detail-actions"><a class="secondary" href="/campaigns/{{ $recordId }}/edit">Edit</a><button type="button" class="secondary" id="delete-button">Hapus</button></div></div><section class="panel form-panel" id="record-detail"></section>
@push('dialogs')
@include('campaigns._delete')
@endpush
@endsection
