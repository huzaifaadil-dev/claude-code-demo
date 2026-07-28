import { Button } from '@/components/ui/button';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from '@/components/ui/pagination';
import type { Paginated } from '@/types';

type DataTablePaginationProps = {
    meta: Omit<Paginated<unknown>, 'data' | 'links'>;
    onPageChange: (page: number) => void;
};

export function DataTablePagination({
    meta,
    onPageChange,
}: DataTablePaginationProps) {
    return (
        <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
                {meta.from ?? 0}–{meta.to ?? 0} of {meta.total}
            </p>
            <Pagination className="mx-0 w-auto justify-end">
                <PaginationContent>
                    <PaginationItem>
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={meta.current_page <= 1}
                            onClick={() => onPageChange(meta.current_page - 1)}
                        >
                            Previous
                        </Button>
                    </PaginationItem>
                    <PaginationItem className="px-2 text-sm text-muted-foreground">
                        Page {meta.current_page} of {meta.last_page}
                    </PaginationItem>
                    <PaginationItem>
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={meta.current_page >= meta.last_page}
                            onClick={() => onPageChange(meta.current_page + 1)}
                        >
                            Next
                        </Button>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
