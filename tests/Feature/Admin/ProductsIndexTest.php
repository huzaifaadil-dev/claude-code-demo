<?php

use App\Models\Product;
use App\Models\User;

test('guests are redirected to login', function () {
    $this->get(route('admin.products.index'))->assertRedirect(route('login'));
});

test('authenticated users see paginated products', function () {
    $user = User::factory()->create();
    Product::factory(25)->for($user)->create();

    $this->actingAs($user)
        ->get(route('admin.products.index'))
        ->assertInertia(fn ($page) => $page
            ->component('admin/products/index')
            ->has('products.data', 15)
            ->where('products.total', 25)
            ->where('products.current_page', 1)
            ->where('products.last_page', 2)
        );
});

test('products index respects the page query parameter', function () {
    $user = User::factory()->create();
    Product::factory(25)->for($user)->create();

    $this->actingAs($user)
        ->get(route('admin.products.index', ['page' => 2]))
        ->assertInertia(fn ($page) => $page
            ->has('products.data', 10)
            ->where('products.current_page', 2)
        );
});
