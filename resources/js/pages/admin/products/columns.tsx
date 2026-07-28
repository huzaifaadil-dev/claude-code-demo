import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Product } from '@/types';

type SortableColumn = 'name' | 'price' | 'stock' | 'created_at';

type ColumnsOptions = {
    sort?: string;
    direction?: 'asc' | 'desc';
    onSort: (column: SortableColumn) => void;
};

function sortableHeader(
    label: string,
    column: SortableColumn,
    options: ColumnsOptions,
) {
    return (
        <Button
            variant="ghost"
            size="sm"
            className="-ml-3"
            onClick={() => options.onSort(column)}
        >
            {label}
            <ArrowUpDown
                className={
                    options.sort === column ? 'opacity-100' : 'opacity-40'
                }
            />
        </Button>
    );
}

export function buildColumns(options: ColumnsOptions): ColumnDef<Product>[] {
    return [
        {
            accessorKey: 'name',
            header: () => sortableHeader('Name', 'name', options),
        },
        {
            accessorKey: 'sku',
            header: 'SKU',
        },
        {
            id: 'owner',
            header: 'Owner',
            cell: ({ row }) => (
                <div className="flex flex-col">
                    <span>{row.original.user.name}</span>
                    <span className="text-xs text-muted-foreground">
                        {row.original.user.email}
                    </span>
                </div>
            ),
        },
        {
            accessorKey: 'price',
            header: () => sortableHeader('Price', 'price', options),
            cell: ({ row }) => `$${row.original.price}`,
        },
        {
            accessorKey: 'stock',
            header: () => sortableHeader('Stock', 'stock', options),
        },
        {
            accessorKey: 'is_active',
            header: 'Status',
            cell: ({ row }) => (
                <Badge
                    variant={row.original.is_active ? 'default' : 'secondary'}
                >
                    {row.original.is_active ? 'Active' : 'Inactive'}
                </Badge>
            ),
        },
    ];
}
