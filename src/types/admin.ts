import type { ColumnDef } from "@tanstack/react-table";

export type TableSearchFilterOption = {
  value: string;
  label: string;
};

export type AdminPagedDataTableShellProps<TData, TValue = unknown> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  start: number;
  end: number;
  total: number;
  paginationLabel: string;
  emptyMessage?: string;
  loading?: boolean;
};

export type TableSearchFilterHeaderProps = {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  filterValue: string;
  onFilterChange: (value: string) => void;
  filterOptions: TableSearchFilterOption[];
  filterPlaceholder?: string;
  filterAriaLabel?: string;
  filterLoadMoreValue?: string;
  onFilterLoadMore?: () => void;
  className?: string;
};
