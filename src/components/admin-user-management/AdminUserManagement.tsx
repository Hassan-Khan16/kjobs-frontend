"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import AdminPagedDataTableShell from "@/components/admin-paged-data-table-shell/AdminPagedDataTableShell";
import {
  TableSearchFilterHeader,
  DEFAULT_TABLE_STATUS_FILTER_OPTIONS,
} from "@/components/table-search-filter-header/TableSearchFilterHeader";
import ConfirmDialog from "@/components/ui/confirm-dialog";
import { useDebounce } from "@/hooks/use-debounce";
import { PAGE_SIZE } from "@/constants";
import { getUsers, patchUserStatus } from "@/services/user-service";
import type { AdminUserListItem } from "@/types/user";
import { buildUserColumns } from "./AdminUserManagementTable";
import { handleOpenToast } from "@/helper/toast";
import { API_UNAVAILABLE_MESSAGE } from "@/constants";

export default function AdminUserManagement() {
  const router = useRouter();
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [page, setPage] = React.useState(1);
  const [items, setItems] = React.useState<AdminUserListItem[]>([]);
  const [total, setTotal] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [statusTarget, setStatusTarget] =
    React.useState<AdminUserListItem | null>(null);
  const [statusLoading, setStatusLoading] = React.useState(false);

  const debouncedSearch = useDebounce(search, 500);

  React.useEffect(() => {
    setPage(1);
  }, [debouncedSearch, statusFilter]);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      const res = await getUsers({
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

  const start = total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const end = Math.min(page * PAGE_SIZE, total);

  const columns = React.useMemo(
    () =>
      buildUserColumns({
        onView: (row) => router.push(`/admin/users/${row.id}`),
        onEdit: (row) => router.push(`/admin/users/${row.id}/edit`),
        onToggleStatus: (row) => setStatusTarget(row),
      }),
    [router],
  );

  const confirmStatus = async () => {
    if (!statusTarget) return;
    setStatusLoading(true);
    const next =
      statusTarget.status === "active" ? "inactive" : ("active" as const);
    const res = await patchUserStatus(statusTarget.id, next);
    setStatusLoading(false);
    if (!res.success) {
      handleOpenToast(res.message || API_UNAVAILABLE_MESSAGE, "error");
      return;
    }
    handleOpenToast(
      `User ${next === "active" ? "activated" : "deactivated"} successfully`,
      "success",
    );
    setStatusTarget(null);
    setPage(1);
    const listRes = await getUsers({
      page: 1,
      limit: PAGE_SIZE,
      search: debouncedSearch,
      status: statusFilter,
    });
    setItems(listRes.data.items);
    setTotal(listRes.data.meta.total);
    setTotalPages(listRes.data.meta.totalPages);
  };

  return (
    <div className="space-y-4">
      <TableSearchFilterHeader
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search users..."
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
        paginationLabel="users"
        loading={loading}
        emptyMessage="No users found."
      />
      <ConfirmDialog
        open={!!statusTarget}
        onOpenChange={(open) => !open && setStatusTarget(null)}
        title={
          statusTarget?.status === "active"
            ? "Deactivate user?"
            : "Activate user?"
        }
        description={
          statusTarget
            ? `Are you sure you want to ${statusTarget.status === "active" ? "deactivate" : "activate"} ${statusTarget.name}?`
            : ""
        }
        onConfirm={confirmStatus}
        loading={statusLoading}
      />
    </div>
  );
}
