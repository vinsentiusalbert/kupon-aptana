<?php

namespace Tests\Feature;

use Tests\TestCase;

class AdminViewsTest extends TestCase
{
    public function test_home_redirects_to_campaigns(): void
    {
        $this->get('/')->assertRedirect('/campaigns');
    }

    public function test_menu_pages_render_their_own_blade_views(): void
    {
        foreach (['overview', 'campaigns', 'payments', 'audiences', 'reports', 'payment-setups', 'whatsapp-templates', 'coupon-templates', 'settings'] as $menu) {
            $this->get('/'.$menu)
                ->assertOk()
                ->assertViewIs($menu.'.index')
                ->assertSee('data-menu="'.$menu.'"', false);
        }
    }

    public function test_managed_menus_have_create_edit_and_detail_views(): void
    {
        foreach (['campaigns', 'payment-setups', 'whatsapp-templates', 'coupon-templates'] as $menu) {
            $this->get('/'.$menu.'/create')->assertOk()->assertViewIs($menu.'.create');
            $this->get('/'.$menu.'/demo-record/edit')->assertOk()->assertViewIs($menu.'.edit');
            $this->get('/'.$menu.'/demo-record')->assertOk()->assertViewIs($menu.'.show')->assertSee('delete-dialog');
        }
    }

    public function test_whatsapp_variables_are_preserved_as_literal_text(): void
    {
        $this->get('/whatsapp-templates/create')->assertOk()->assertSee('{{nama}}')->assertSee('{{tagihan}}');
    }

    public function test_checkout_view_and_unknown_routes(): void
    {
        $this->get('/payment-preview')->assertOk()->assertViewIs('payment-checkout.show');
        $this->get('/not-an-admin-menu')->assertNotFound();
    }

    public function test_missing_public_assets_do_not_crash_the_blade_layout(): void
    {
        $originalPublicPath = public_path();
        $this->app->usePublicPath(storage_path('framework/testing/missing-public-assets'));

        try {
            $this->get('/campaigns')
                ->assertOk()
                ->assertSee('src="'.asset('js/admin-app.js').'"', false)
                ->assertSee('href="'.asset('css/admin.css').'"', false);
        } finally {
            $this->app->usePublicPath($originalPublicPath);
        }
    }
}
