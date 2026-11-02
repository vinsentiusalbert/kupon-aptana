@extends('layouts.admin')

@section('content')
<div class="page-heading"><div><a class="back" href="/whatsapp-templates"><span data-icon="back"></span> Kembali ke template whatsapp</a><h1>Detail template WhatsApp</h1><p>Data contoh untuk preview UI admin.</p></div><div class="detail-actions"><a class="secondary" href="/whatsapp-templates/{{ $recordId }}/edit">Edit</a><button type="button" class="secondary" id="delete-button">Hapus</button></div></div><section class="panel form-panel" id="record-detail"></section>
@push('dialogs')
@include('whatsapp-templates._delete')
@endpush
@endsection
