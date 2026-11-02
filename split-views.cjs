const fs=require('fs');
const path=require('path');
const old=fs.readFileSync('resources/views/admin.blade.php','utf8');
const seed=JSON.parse(fs.readFileSync('.view-refactor/data.json','utf8'));
const menus={overview:'Overview',campaigns:'Campaign',payments:'Transaksi pembayaran',audiences:'Audience',reports:'Laporan','payment-setups':'Setup Pembayaran','whatsapp-templates':'Template WhatsApp','coupon-templates':'Template Kupon',settings:'Pengaturan'};
const paths={campaign:'campaigns',payment:'payments',audience:'audiences',report:'reports',templates:'whatsapp-templates','payment-setups':'payment-setups','coupon-templates':'coupon-templates',overview:'overview',settings:'settings'};
const write=(p,s)=>{fs.mkdirSync(path.dirname(p),{recursive:true});fs.writeFileSync(p,s.trim()+'\n');};
function html(s){return s.replace(/data-icon-ready="true"/g,'').replace(/\{\{(nama|no_pelanggan|tagihan|payment_url)\}\}/g,'@{{$1}}').replace(/href="#([^"?]+)"/g,(all,h)=>{const [root,...rest]=h.split('/');return 'href="/'+(paths[root]||root)+(rest.length?'/'+rest.join('/'):'')+'"';}).replace(/></g,'>\n<');}
function page(body){return "@extends('layouts.admin')\n\n@section('content')\n"+body+"\n@endsection";}
let sidebar=old.match(/<aside class="sidebar">[\s\S]*?<\/aside>/)[0];
sidebar=sidebar.replace(/<button data-page="([^"]+)"([^>]*)>([\s\S]*?)<\/button>/g,(_,key,attrs,inner)=>{const menu=paths[key];attrs=attrs.replace(/class="active"/g,'');return `<a href="/${menu}" ${attrs} class="{{ $menu === '${menu}' ? 'active' : '' }}" aria-current="{{ $menu === '${menu}' ? 'page' : 'false' }}">${inner}</a>`;});
write('resources/views/partials/sidebar.blade.php',html(sidebar));
write('resources/views/partials/header.blade.php',html(old.match(/<header>[\s\S]*?<\/header>/)[0].replace('<b id="crumb">Campaign</b>','<b id="crumb">{{ $title }}</b>')));
write('resources/views/partials/footer.blade.php',html(old.match(/<footer>[\s\S]*?<\/footer>/)[0]));
write('resources/views/partials/feedback.blade.php',html('<div id="toast" role="status"></div><dialog id="modal"><button id="close-modal" type="button" class="icon-button" aria-label="Tutup"><span data-icon="close"></span></button><div id="modal-body"></div></dialog>'));
write('resources/views/layouts/admin.blade.php',`<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ $title }} · MyAds</title>
    @foreach (['admin', 'refinements'] as $stylesheet)
        <link rel="stylesheet" href="{{ asset('css/'.$stylesheet.'.css') }}?v={{ filemtime(public_path('css/'.$stylesheet.'.css')) }}">
    @endforeach
</head>
<body data-menu="{{ $menu }}" data-action="{{ $action }}" data-record-id="{{ $recordId ?? '' }}">
    @include('partials.sidebar')
    <div class="app">
        @include('partials.header')
        <main>
            @yield('content')
            @include('partials.footer')
        </main>
    </div>
    @include('partials.feedback')
    @stack('dialogs')
    @foreach (['admin-data', 'admin-app', 'ui'] as $script)
        <script src="{{ asset('js/'.$script.'.js') }}?v={{ filemtime(public_path('js/'.$script.'.js')) }}" defer></script>
    @endforeach
</body>
</html>`);
const managed=['campaigns','payment-setups','whatsapp-templates','coupon-templates'];
for(const [menu,title] of Object.entries(menus)){
 let index=menu==='campaigns'?old.slice(old.indexOf('<section id="listing">'),old.indexOf('<section id="wizard"')):fs.readFileSync('.view-refactor/'+menu+'-index.html','utf8');
 if(menu==='campaigns')index=index.replace('<button class="primary" id="new-campaign"><span>＋</span> Buat campaign</button>','<a class="primary" href="/campaigns/create"><span data-icon="plus"></span> Buat campaign</a>').replace(/<button id="flow-campaign">([\s\S]*?)<\/button>/,'<a href="/campaigns/create">$1</a>');
 if(menu==='whatsapp-templates')index=index.replace(/<button class="primary" id="new-template">([\s\S]*?)<\/button>/,'<a class="primary" href="/whatsapp-templates/create">$1</a>');
 if(managed.includes(menu))index=index.replace(/<tbody[^>]*>[\s\S]*?<\/tbody>/,'<tbody id="records-body"></tbody>').replace('<th></th>','<th>ACTIONS</th>').replace('ACTIONS','AKSI');
 write(`resources/views/${menu}/index.blade.php`,page(html(index)));
 if(!managed.includes(menu))continue;
 let form=fs.readFileSync(`.view-refactor/${menu}-create.html`,'utf8');
 const heading=menu==='campaigns'?'campaign':menu==='payment-setups'?'setup pembayaran':menu==='whatsapp-templates'?'template WhatsApp':'template kupon';
 form=form.replace(/<h1>[^<]*<\/h1>/, '<h1>{{ $heading }}</h1>');
 if(menu==='campaigns'){
  form=form.replace(/<button class="back" id="back-list">([\s\S]*?)<\/button>/,'<a class="back" href="/campaigns">$1</a>');
  form=form.replace(/<button class="secondary" id="prev">.*?<\/button>/,'<a class="secondary" href="/campaigns">Batal</a>').replace('<button class="secondary" id="save">','<button type="submit" class="primary" id="save">').replace('<button class="primary" id="next">','<button type="button" class="secondary" id="next">');
  form=form.replace('<div class="wizard-grid">','<form id="campaign-form"><div class="wizard-grid">')+'</form>';
 }
 // Existing runtime callbacks are bound by admin-app.js after the Blade page loads.
 form=form.replace(/ on\w+="[^"]*"/g,'');
 write(`resources/views/${menu}/_form.blade.php`,html(form));
 for(const action of ['create','edit'])write(`resources/views/${menu}/${action}.blade.php`,page(`@include('${menu}._form', ['heading' => '${action==='create'?'Buat':'Edit'} ${heading}'])`));
 write(`resources/views/${menu}/show.blade.php`,page(`<div class="page-heading"><div><a class="back" href="/${menu}"><span data-icon="back"></span> Kembali ke ${title.toLowerCase()}</a><h1>Detail ${heading}</h1><p>Data contoh untuk preview UI admin.</p></div><div class="detail-actions"><a class="secondary" href="/${menu}/{{ $recordId }}/edit">Edit</a><button type="button" class="secondary" id="delete-button">Hapus</button></div></div><section class="panel form-panel" id="record-detail"></section>\n@push('dialogs')\n@include('${menu}._delete')\n@endpush`));
 write(`resources/views/${menu}/_delete.blade.php`,`@include('partials.delete-dialog', ['label' => '${heading}'])`);
}
write('resources/views/partials/delete-dialog.blade.php',`<dialog id="delete-dialog" aria-labelledby="delete-title"><h2 id="delete-title">Hapus {{ $label }}?</h2><p id="delete-description">Data demo ini akan dihapus dari browser. Tindakan ini tidak dapat dibatalkan.</p><div class="detail-actions"><button type="button" class="secondary" id="cancel-delete">Batal</button><button type="button" class="primary" id="confirm-delete">Hapus</button></div></dialog>`);
write('resources/views/payment-checkout/show.blade.php',page('<section id="checkout-content"></section>'));
const demo={
 'payment-setups':seed.paymentSetups,
 'whatsapp-templates':seed.templates.filter(t=>t.type==='reminder'),
 'coupon-templates':seed.couponTemplates,
 campaigns:seed.campaigns.map((c,i)=>({...seed.data,id:c[1],name:c[0],status:c[2],audienceCount:c[3],paid:c[4],conversion:c[5],period:c[7],templateId:i%2?'due':'reminder',couponId:i%2?'shopping':'coffee',audienceFile:''}))
};
write('public/js/admin-data.js','window.AdminSeed = '+JSON.stringify(demo,null,2)+';');
write('routes/web.php',`<?php

use Illuminate\\Support\\Facades\\Route;

// UI-only GET routes. Records and CRUD demonstrations live in browser session storage.
Route::redirect('/', '/campaigns');

$menus = [
    'overview' => 'Overview',
    'campaigns' => 'Campaign',
    'payments' => 'Transaksi pembayaran',
    'audiences' => 'Audience',
    'reports' => 'Laporan',
    'payment-setups' => 'Setup Pembayaran',
    'whatsapp-templates' => 'Template WhatsApp',
    'coupon-templates' => 'Template Kupon',
    'settings' => 'Pengaturan',
];

foreach ($menus as $menu => $title) {
    Route::view('/'.$menu, $menu.'.index', compact('menu', 'title') + ['action' => 'index'])->name($menu.'.index');

    if (! in_array($menu, ['campaigns', 'payment-setups', 'whatsapp-templates', 'coupon-templates'], true)) {
        continue;
    }

    Route::view('/'.$menu.'/create', $menu.'.create', compact('menu', 'title') + ['action' => 'create'])->name($menu.'.create');

    Route::get('/'.$menu.'/{recordId}/edit', function (string $recordId) use ($menu, $title) {
        return view($menu.'.edit', compact('menu', 'title', 'recordId') + ['action' => 'edit']);
    })->name($menu.'.edit');

    Route::get('/'.$menu.'/{recordId}', function (string $recordId) use ($menu, $title) {
        return view($menu.'.show', compact('menu', 'title', 'recordId') + ['action' => 'show']);
    })->name($menu.'.show');
}

Route::view('/payment-preview', 'payment-checkout.show', ['menu' => 'payment-setups', 'title' => 'Preview pembayaran', 'action' => 'checkout'])->name('payment-checkout.show');`);
