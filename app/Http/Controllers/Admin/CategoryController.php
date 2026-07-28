<?php

namespace App\Http\Controllers\Admin;

use App\Actions\Categories\ListCategories;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    /**
     * Display a listing of the categories.
     */
    public function index(Request $request): Response
    {
        $categories = ListCategories::handle($request->all());

        return Inertia::render('admin/categories/index', [
            'categories' => $categories,
            'filters' => $request->only(['search', 'sort', 'direction', 'per_page']),
        ]);
    }
}
