"use client";

import { DataTable } from "@/components/ui/data-table";
import TableSkeleton from "@/components/table-skleton/table-skleton";
import { AdminPagedDataTableShellProps } from "@/types/school";

export function AdminPagedDataTableShell<TData, TValue = unknown>({
  columns,
  data,
  page,
  totalPages,
  onPageChange,
  start,
  end,
  total,
  paginationLabel,
  emptyMessage = "No results.",
  loading = false,
}: AdminPagedDataTableShellProps<TData, TValue>) {
  return (
    <div>
      {loading ? (
        <TableSkeleton />
      ) : (
        <DataTable
          columns={columns}
          data={data}
          emptyMessage={emptyMessage}
          page={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
          start={start}
          end={end}
          total={total}
          paginationLabel={paginationLabel}
           className="border-none"
          headerRowClassName="bg-gray-106 border-b-[1px] border-foreground-50 h-[56px] rounded-none"
          headerCellClassName="font-inter  font-semibold text-[12px] text-dark-gray-2 tracking-wider uppercase bg-transparent "
          footerClassName="border-t-[0.8px]  border-gray-105 "
          footerTextClassName="text-dark-gray-2 font-arail font-[400] text-[14px]"
          paginationBtnClassName ="bg-dark-blue border-none"
        />
      )}
    </div>
  );
}

export default AdminPagedDataTableShell;
