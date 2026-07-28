<?php

namespace App\Data;

readonly class ProductFilterData
{
    public function __construct(
        public ?string $search = null,
        public string $sort = 'created_at',
        public string $direction = 'desc',
        public int $perPage = 15,
    ) {}

    /**
     * @param  array<string, mixed>  $data
     */
    public static function from(array $data): self
    {
        return new self(
            search: $data['search'] ?? null,
            sort: in_array($data['sort'] ?? null, self::sortable(), true) ? $data['sort'] : 'created_at',
            direction: ($data['direction'] ?? null) === 'asc' ? 'asc' : 'desc',
            perPage: min(max((int) ($data['per_page'] ?? 15), 1), 100),
        );
    }

    /**
     * @return array<int, string>
     */
    public static function sortable(): array
    {
        return ['name', 'price', 'stock', 'created_at'];
    }
}
