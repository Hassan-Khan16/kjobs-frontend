"use client";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Pagination from "@/components/ui/Pagination";

export type DataTableColumnDef<TData, TValue = unknown> = ColumnDef<
  TData,
  TValue
>;

interface DataTableProps<TData, TValue = unknown> {
  columns: DataTableColumnDef<TData, TValue>[];
  data: TData[];
  emptyMessage?: string;
  className?: string;
  headerRowClassName?: string;
  headerCellClassName?: string;
  /** Applied to the pagination / “Showing x of y” footer bar */
  footerClassName?: string;
  footerTextClassName?: string
  paginationBtnClassName?: string
  page?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  start?: number;
  end?: number;
  total?: number;
  paginationLabel?: string; // e.g., "athletes"

}

export function DataTable<TData, TValue = unknown>({
  columns,
  data,
  emptyMessage = "No results.",
  className,
  headerRowClassName,
  headerCellClassName,
  footerClassName,
  footerTextClassName,
  paginationBtnClassName,
  page,
  totalPages,
  onPageChange,
  start,
  end,
  total,
  paginationLabel = "items",

}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const showPagination =
    page !== undefined &&
    totalPages !== undefined &&
    onPageChange !== undefined &&
    start !== undefined &&
    end !== undefined &&
    total !== undefined;

  return (
    <div className={className}>
      <div className="w-full">
        {/* Header Table */}
        <Table containerClassName="">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className={cn(
                  "bg-gray-100 border-gray-20 rounded-xl overflow-hidden",
                  headerRowClassName,
                )}
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={cn(
                      "px-4 text-[12px] font-arial font-extrabold tracking-wide text-gray-116 sticky top-0 z-10 bg-gray-100",
                      headerCellClassName,
                    )}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="border-gray-20">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="px-4 py-4 text-[14px] font-inter text-black-10 "
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-sm text-gray-103 "
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          {/* </div> */}
        </Table>
      </div>

      {showPagination && (
        <div
          className={cn(
            "border-t border-gray-20 p-4 mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3",
            footerClassName,
          )}
        >
          <div className={cn("text-[13px] font-arial text-dark-gray",
            footerTextClassName
          )}>
            Showing {start} to {end} of {total} {paginationLabel}
          </div>
          <Pagination
            page={Math.min(page, totalPages)}
            totalPages={totalPages}
            onPageChange={onPageChange}
            useArrowtheme={false}
            buttonClassName={cn("bg-primary text-primary-foreground border-primary hover:bg-primary/90 ",
              paginationBtnClassName
            )}

          />
        </div>
      )}
    </div>
  );
}
