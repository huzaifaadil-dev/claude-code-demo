<?php

namespace App\Actions\Products;

use App\Data\ProductFilterData;
use App\Models\Product;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class ListProducts
{
    /**
     * @var array<int, string>
     */
    private const SORTABLE = ['name', 'price', 'stock', 'created_at'];

    /**
     * @param  array<string, mixed>  $data
     */
    public static function handle(array $data): LengthAwarePaginator
    {
        $filters = new ProductFilterData(
            search: $data['search'] ?? null,
            sort: in_array($data['sort'] ?? null, self::SORTABLE, true) ? $data['sort'] : 'created_at',
            direction: ($data['direction'] ?? null) === 'asc' ? 'asc' : 'desc',
            perPage: min(max((int) ($data['per_page'] ?? 15), 1), 100),
        );

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
