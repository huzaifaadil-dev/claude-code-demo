import { Head, router } from '@inertiajs/react';
import { useRef } from 'react';
import { DataTable } from '@/components/data-table/data-table';
import { DataTablePagination } from '@/components/data-table/data-table-pagination';
import { Input } from '@/components/ui/input';
import type { Category, Paginated } from '@/types';
import { index as categoriesIndex } from '@/wayfinder/routes/admin/categories';
import { buildColumns } from './columns';

type Filters = {
    search?: string;
    sort?: string;
    direction?: 'asc' | 'desc';
    per_page?: number;
};

type Props = {
    categories: Paginated<Category>;
    filters: Filters;
};

export default function CategoriesIndex({ categories, filters }: Props) {
    const searchTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);

    const visit = (params: Record<string, unknown>) => {
        router.reload({
            data: { ...filters, ...params },
            only: ['categories', 'filters'],
        });
    };

    const columns = buildColumns({
        sort: filters.sort,
        direction: filters.direction,
        onSort: (column) =>
            visit({
                sort: column,
                direction:
                    filters.sort === column && filters.direction === 'asc'
                        ? 'desc'
                        : 'asc',
                page: 1,
            }),
    });

    return (
        <>
            <Head title="Categories" />
            <div className="flex flex-col gap-4 p-4">
                <Input
                    placeholder="Search by name or slug..."
                    defaultValue={filters.search ?? ''}
                    className="max-w-sm"
                    onChange={(e) => {
                        const value = e.target.value;
                        clearTimeout(searchTimeout.current);
                        searchTimeout.current = setTimeout(
                            () =>
                                visit({ search: value || undefined, page: 1 }),
                            300,
                        );
                    }}
                />
                <DataTable columns={columns} data={categories.data} />
                <DataTablePagination
                    meta={categories}
                    onPageChange={(page) => visit({ page })}
                />
            </div>
        </>
    );
}

CategoriesIndex.layout = {
    breadcrumbs: [{ title: 'Categories', href: categoriesIndex().url }],
};
