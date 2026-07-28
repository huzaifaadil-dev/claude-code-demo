import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Category } from '@/types';

type SortableColumn = 'name' | 'created_at';

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

export function buildColumns(options: ColumnsOptions): ColumnDef<Category>[] {
    return [
        {
            accessorKey: 'name',
            header: () => sortableHeader('Name', 'name', options),
        },
        {
            accessorKey: 'slug',
            header: 'Slug',
        },
        {
            accessorKey: 'description',
            header: 'Description',
            cell: ({ row }) => (
                <span className="text-muted-foreground">
                    {row.original.description ?? '—'}
                </span>
            ),
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
        {
            accessorKey: 'created_at',
            header: () => sortableHeader('Created', 'created_at', options),
        },
    ];
}
