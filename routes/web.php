<?php

use Illuminate\Support\Facades\Route;

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

Route::view('/payment-preview', 'payment-checkout.show', ['menu' => 'payment-setups', 'title' => 'Preview pembayaran', 'action' => 'checkout'])->name('payment-checkout.show');
