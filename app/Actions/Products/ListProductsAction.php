<?php

namespace App\Actions\Products;

use App\Data\ProductFilterData;
use App\Models\Product;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class ListProductsAction
{
    public static function handle(ProductFilterData $filters): LengthAwarePaginator
    {
        return Product::query()
            ->with('user:id,name,email')
            ->when($filters->search, fn ($query, $search) => $query
                ->where('name', 'like', "%{$search}%")
                ->orWhere('sku', 'like', "%{$search}%"))
            ->orderBy($filters->sort, $filters->direction)
            ->paginate($filters->perPage)
            ->withQueryString();
    }
}
