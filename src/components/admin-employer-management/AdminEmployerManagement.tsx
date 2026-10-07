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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AdminTableIconActions } from "@/components/admin-table-icon-actions/AdminTableIconActions";
import { StatusBadge } from "@/components/status-badge/StatusBadge";
import { useDebounce } from "@/hooks/use-debounce";
import { PAGE_SIZE, API_UNAVAILABLE_MESSAGE } from "@/constants";
import { getEmployers, patchEmployerStatus, getEmployer, deleteEmployer } from "@/services/employer-service";
import type { AdminEmployerListItem, AdminEmployer } from "@/types/employer";
import { handleOpenToast } from "@/helper/toast";
import { AdminHeaderActionButton } from "@/components/admin-page-header/AdminHeaderActionButton";

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
  const [viewEmployer, setViewEmployer] = React.useState<AdminEmployer | null>(null);
  const [viewLoading, setViewLoading] = React.useState(false);
  const [deleteTarget, setDeleteTarget] =
    React.useState<AdminEmployerListItem | null>(null);
  const [deleteLoading, setDeleteLoading] = React.useState(false);
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
    { accessorKey: "company_name", header: "Company" },
    { accessorKey: "contact_person_name", header: "Contact Person" },
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
          status={row.original.status}
          onView={async () => {
            setViewLoading(true);
            const res = await getEmployer(row.original.id);
            setViewLoading(false);
            if (res.success) {
              setViewEmployer(res.data);
            } else {
              handleOpenToast(res.message || API_UNAVAILABLE_MESSAGE, "error");
            }
          }}
          onEdit={() =>
            router.push(`/admin/employers/${row.original.id}/edit`)
          }
          onDelete={() => setDeleteTarget(row.original)}
        />
      ),
    },
  ];

  const confirmStatus = async () => {
    if (!statusTarget) return;
    setStatusLoading(true);
    const nextIsActive = statusTarget.status === "inactive";
    const res = await patchEmployerStatus(statusTarget.id, nextIsActive);
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

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    const res = await deleteEmployer(deleteTarget.id);
    setDeleteLoading(false);
    if (!res.success) {
      handleOpenToast(res.message || API_UNAVAILABLE_MESSAGE, "error");
      return;
    }
    handleOpenToast("Employer deleted successfully", "success");
    setDeleteTarget(null);
    const listRes = await getEmployers({
      page,
      limit: PAGE_SIZE,
      search: debouncedSearch,
      status: statusFilter,
    });
    setItems(listRes.data.items);
    setTotal(listRes.data.meta.total);
    setTotalPages(listRes.data.meta.totalPages);
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
        title={
          statusTarget?.status === "active"
            ? "Deactivate employer?"
            : "Activate employer?"
        }
        description={
          statusTarget
            ? `Are you sure you want to ${statusTarget.status === "active" ? "deactivate" : "activate"} ${statusTarget.companyName}?`
            : ""
        }
        onConfirm={confirmStatus}
        loading={statusLoading}
      />
      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Delete employer?"
        description={
          deleteTarget
            ? `Are you sure you want to delete ${deleteTarget.companyName}? This action cannot be undone.`
            : ""
        }
        onConfirm={confirmDelete}
        loading={deleteLoading}
      />
      <Dialog open={!!viewEmployer} onOpenChange={(open) => !open && setViewEmployer(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Employer Details</DialogTitle>
          </DialogHeader>
          {viewLoading ? (
            <div className="py-8 text-center text-sm text-gray-500">Loading...</div>
          ) : viewEmployer ? (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm text-gray-500">Company Name</dt>
                  <dd className="font-medium">{viewEmployer.companyName}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Contact Person</dt>
                  <dd className="font-medium">{viewEmployer.contactPersonName}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Email</dt>
                  <dd className="font-medium">{viewEmployer.user.email}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Phone</dt>
                  <dd className="font-medium">{viewEmployer.phone || "—"}</dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-sm text-gray-500">Company Description</dt>
                  <dd className="font-medium">{viewEmployer.companyDescription || "—"}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Website</dt>
                  <dd className="font-medium">
                    {viewEmployer.website ? (
                      <a href={viewEmployer.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {viewEmployer.website}
                      </a>
                    ) : "—"}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Status</dt>
                  <dd className="mt-1">
                    <StatusBadge status={viewEmployer.user.isActive ? "active" : "inactive"} />
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Created</dt>
                  <dd className="font-medium">{viewEmployer.createdAt || "—"}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Updated</dt>
                  <dd className="font-medium">{viewEmployer.updatedAt || "—"}</dd>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <AdminHeaderActionButton href={`/admin/employers/${viewEmployer.id}/edit`}>
                  Edit Employer
                </AdminHeaderActionButton>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
