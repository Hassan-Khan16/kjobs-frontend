"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import AdminPagedDataTableShell from "@/components/admin-paged-data-table-shell/AdminPagedDataTableShell";
import {
  TableSearchFilterHeader,
  DEFAULT_TABLE_STATUS_FILTER_OPTIONS,
} from "@/components/table-search-filter-header/TableSearchFilterHeader";
import ConfirmDialog from "@/components/ui/confirm-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useDebounce } from "@/hooks/use-debounce";
import { PAGE_SIZE } from "@/constants";
import { getUsers, patchUserStatus, getUser } from "@/services/user-service";
import type { AdminUserListItem, AdminUser } from "@/types/user";
import { buildUserColumns } from "./AdminUserManagementTable";
import { handleOpenToast } from "@/helper/toast";
import { API_UNAVAILABLE_MESSAGE } from "@/constants";
import { StatusBadge } from "@/components/status-badge/StatusBadge";
import { formatUserRole } from "@/helper/user";
import { AdminHeaderActionButton } from "@/components/admin-page-header/AdminHeaderActionButton";

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
  const [viewUser, setViewUser] = React.useState<AdminUser | null>(null);
  const [viewLoading, setViewLoading] = React.useState(false);

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
        onView: async (row) => {
          setViewLoading(true);
          const res = await getUser(row.id);
          setViewLoading(false);
          if (res.success) {
            setViewUser(res.data);
          } else {
            handleOpenToast(res.message || API_UNAVAILABLE_MESSAGE, "error");
          }
        },
        onEdit: (row) => router.push(`/admin/users/${row.id}/edit`),
        onToggleStatus: (row) => setStatusTarget(row),
      }),
    [router],
  );

  const confirmStatus = async () => {
    if (!statusTarget) return;
    setStatusLoading(true);
    const next = statusTarget.status === "active" ? "inactive" : ("active" as const);
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
      <Dialog open={!!viewUser} onOpenChange={(open) => !open && setViewUser(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          {viewLoading ? (
            <div className="py-8 text-center text-sm text-gray-500">Loading...</div>
          ) : viewUser ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm text-gray-500">Name</dt>
                  <dd className="font-medium">{viewUser.name}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Email</dt>
                  <dd className="font-medium">{viewUser.email}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Role</dt>
                  <dd className="font-medium">{formatUserRole(viewUser.role)}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Status</dt>
                  <dd className="mt-1">
                    <StatusBadge status={viewUser.isActive ? "active" : "inactive"} />
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Created</dt>
                  <dd className="font-medium">{viewUser.createdAt || "—"}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Updated</dt>
                  <dd className="font-medium">{viewUser.updatedAt || "—"}</dd>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <AdminHeaderActionButton href={`/admin/users/${viewUser.id}/edit`}>
                  Edit User
                </AdminHeaderActionButton>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
