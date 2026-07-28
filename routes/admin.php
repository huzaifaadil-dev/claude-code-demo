<?php

use App\Http\Controllers\Admin\ProductController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('products', [ProductController::class, 'index'])->name('products.index');
});
