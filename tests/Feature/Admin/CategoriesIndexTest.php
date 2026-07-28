<?php

use App\Models\Category;
use App\Models\User;

test('guests are redirected to login', function () {
    $this->get(route('admin.categories.index'))->assertRedirect(route('login'));
});

test('authenticated users see paginated categories', function () {
    $user = User::factory()->create();
    Category::factory(25)->create();

    $this->actingAs($user)
        ->get(route('admin.categories.index'))
        ->assertInertia(fn ($page) => $page
            ->component('admin/categories/index')
            ->has('categories.data', 15)
            ->where('categories.total', 25)
            ->where('categories.current_page', 1)
            ->where('categories.last_page', 2)
        );
});

test('categories index respects the page query parameter', function () {
    $user = User::factory()->create();
    Category::factory(25)->create();

    $this->actingAs($user)
        ->get(route('admin.categories.index', ['page' => 2]))
        ->assertInertia(fn ($page) => $page
            ->has('categories.data', 10)
            ->where('categories.current_page', 2)
        );
});
