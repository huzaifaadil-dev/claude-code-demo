<?php

namespace App\Http\Controllers\Admin;

use App\Actions\Products\ListProductsAction;
use App\Data\ProductFilterData;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    /**
     * Display a listing of the products.
     */
    public function index(Request $request): Response
    {
        $products = ListProductsAction::handle(ProductFilterData::from($request->all()));

        return Inertia::render('admin/products/index', [
            'products' => $products,
            'filters' => $request->only(['search', 'sort', 'direction', 'per_page']),
        ]);
    }
}
