"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import AdminPagedDataTableShell from "@/components/admin-paged-data-table-shell/AdminPagedDataTableShell";
import {
  TableSearchFilterHeader,
  DEFAULT_TABLE_STATUS_FILTER_OPTIONS,
} from "@/components/table-search-filter-header/TableSearchFilterHeader";
import ConfirmDialog from "@/components/ui/confirm-dialog";
import { AdminTableIconActions } from "@/components/admin-table-icon-actions/AdminTableIconActions";
import { StatusBadge } from "@/components/status-badge/StatusBadge";
import { useDebounce } from "@/hooks/use-debounce";
import { PAGE_SIZE, API_UNAVAILABLE_MESSAGE } from "@/constants";
import { getEmployers, patchEmployerStatus } from "@/services/employer-service";
import type { AdminEmployerListItem } from "@/types/employer";
import { handleOpenToast } from "@/helper/toast";

export default function AdminEmployerManagement() {
  const router = useRouter();
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [page, setPage] = React.useState(1);
  const [items, setItems] = React.useState<AdminEmployerListItem[]>([]);
  const [total, setTotal] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [statusTarget, setStatusTarget] =
    React.useState<AdminEmployerListItem | null>(null);
  const [statusLoading, setStatusLoading] = React.useState(false);
  const debouncedSearch = useDebounce(search, 500);

  React.useEffect(() => setPage(1), [debouncedSearch, statusFilter]);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      const res = await getEmployers({
        page,
        limit: PAGE_SIZE,
        search: debouncedSearch,
        status: statusFilter,
      });
      if (cancelled) return;
      setLoading(false);
      setItems(res.data.items);
      setTotal(res.data.meta.total);
      setTotalPages(res.data.meta.totalPages);
    })();
    return () => {
      cancelled = true;
    };
  }, [page, debouncedSearch, statusFilter]);

  const columns: ColumnDef<AdminEmployerListItem>[] = [
    { accessorKey: "companyName", header: "Company" },
    { accessorKey: "contactName", header: "Contact" },
    { accessorKey: "email", header: "Email" },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <AdminTableIconActions
          onView={() => router.push(`/admin/employers/${row.original.id}`)}
          onEdit={() =>
            router.push(`/admin/employers/${row.original.id}/edit`)
          }
          onDelete={() => setStatusTarget(row.original)}
        />
      ),
    },
  ];

  const confirmStatus = async () => {
    if (!statusTarget) return;
    setStatusLoading(true);
    const next =
      statusTarget.status === "active" ? "inactive" : ("active" as const);
    const res = await patchEmployerStatus(statusTarget.id, next);
    setStatusLoading(false);
    if (!res.success) {
      handleOpenToast(res.message || API_UNAVAILABLE_MESSAGE, "error");
      return;
    }
    handleOpenToast("Employer status updated", "success");
    setStatusTarget(null);
    const listRes = await getEmployers({
      page,
      limit: PAGE_SIZE,
      search: debouncedSearch,
      status: statusFilter,
    });
    setItems(listRes.data.items);
  };

  const start = total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const end = Math.min(page * PAGE_SIZE, total);

  return (
    <div className="space-y-4">
      <TableSearchFilterHeader
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search employers..."
        filterValue={statusFilter}
        onFilterChange={setStatusFilter}
        filterOptions={DEFAULT_TABLE_STATUS_FILTER_OPTIONS}
      />
      <AdminPagedDataTableShell
        columns={columns}
        data={items}
        page={page}
        totalPages={Math.max(totalPages, 1)}
        onPageChange={setPage}
        start={start}
        end={end}
        total={total}
        paginationLabel="employers"
        loading={loading}
        emptyMessage="No employers found."
      />
      <ConfirmDialog
        open={!!statusTarget}
        onOpenChange={(open) => !open && setStatusTarget(null)}
        title="Update employer status?"
        description={
          statusTarget
            ? `Toggle status for ${statusTarget.companyName}?`
            : ""
        }
        onConfirm={confirmStatus}
        loading={statusLoading}
      />
    </div>
  );
}
