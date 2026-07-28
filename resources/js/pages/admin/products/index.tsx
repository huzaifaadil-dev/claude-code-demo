import { Head, router } from '@inertiajs/react';
import { useRef } from 'react';
import { DataTable } from '@/components/data-table/data-table';
import { DataTablePagination } from '@/components/data-table/data-table-pagination';
import { Input } from '@/components/ui/input';
import type { Paginated, Product } from '@/types';
import { index as productsIndex } from '@/wayfinder/routes/admin/products';
import { buildColumns } from './columns';

type Filters = {
    search?: string;
    sort?: string;
    direction?: 'asc' | 'desc';
    per_page?: number;
};

type Props = {
    products: Paginated<Product>;
    filters: Filters;
};

export default function ProductsIndex({ products, filters }: Props) {
    const searchTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);

    const visit = (params: Record<string, unknown>) => {
        router.reload({
            data: { ...filters, ...params },
            only: ['products', 'filters'],
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
            <Head title="Products" />
            <div className="flex flex-col gap-4 p-4">
                <Input
                    placeholder="Search by name or SKU..."
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
                <DataTable columns={columns} data={products.data} />
                <DataTablePagination
                    meta={products}
                    onPageChange={(page) => visit({ page })}
                />
            </div>
        </>
    );
}

ProductsIndex.layout = {
    breadcrumbs: [{ title: 'Products', href: productsIndex().url }],
};
