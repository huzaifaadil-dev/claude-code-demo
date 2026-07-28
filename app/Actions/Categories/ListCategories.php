<?php

namespace App\Actions\Categories;

use App\Data\CategoryFilterData;
use App\Models\Category;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class ListCategories
{
    /**
     * @var array<int, string>
     */
    private const SORTABLE = ['name', 'created_at'];

    /**
     * @param  array<string, mixed>  $data
     */
    public static function handle(array $data): LengthAwarePaginator
    {
        $filters = new CategoryFilterData(
            search: $data['search'] ?? null,
            sort: in_array($data['sort'] ?? null, self::SORTABLE, true) ? $data['sort'] : 'created_at',
            direction: ($data['direction'] ?? null) === 'asc' ? 'asc' : 'desc',
            perPage: min(max((int) ($data['per_page'] ?? 15), 1), 100),
        );

        return Category::query()
            ->when($filters->search, fn ($query, $search) => $query
                ->where('name', 'like', "%{$search}%")
                ->orWhere('slug', 'like', "%{$search}%"))
            ->orderBy($filters->sort, $filters->direction)
            ->paginate($filters->perPage)
            ->withQueryString();
    }
}
