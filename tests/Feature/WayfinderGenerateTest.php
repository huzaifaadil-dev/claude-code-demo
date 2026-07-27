<?php

use Illuminate\Support\Facades\File;

test('wayfinder generate command runs without the removed --with-form option', function () {
    $this->artisan('wayfinder:generate', ['--fresh' => true])
        ->assertSuccessful();

    $profileController = base_path('resources/js/wayfinder/App/Http/Controllers/Settings/ProfileController.ts');

    expect(File::exists($profileController))->toBeTrue();
    expect(File::get($profileController))->toContain('.form =');
});
