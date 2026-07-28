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
}
