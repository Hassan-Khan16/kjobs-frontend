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
import {
  getJobSeekers,
  getJobSeeker,
  patchJobSeekerStatus,
} from "@/services/job-seeker-service";
import type {
  AdminJobSeeker,
  AdminJobSeekerListItem,
  JobSeekerStatus,
} from "@/types/job-seeker";
import { buildJobSeekerColumns } from "./AdminJobSeekerManagementTable";
import { handleOpenToast } from "@/helper/toast";
import { API_UNAVAILABLE_MESSAGE } from "@/constants";
import { StatusBadge } from "@/components/status-badge/StatusBadge";
import { AdminHeaderActionButton } from "@/components/admin-page-header/AdminHeaderActionButton";

export default function AdminJobSeekerManagement() {
  const router = useRouter();
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [page, setPage] = React.useState(1);
  const [items, setItems] = React.useState<AdminJobSeekerListItem[]>([]);
  const [total, setTotal] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [statusTarget, setStatusTarget] =
    React.useState<AdminJobSeekerListItem | null>(null);
  const [statusLoading, setStatusLoading] = React.useState(false);
  const [viewJobSeeker, setViewJobSeeker] = React.useState<AdminJobSeeker | null>(null);
  const [viewLoading, setViewLoading] = React.useState(false);

  const debouncedSearch = useDebounce(search, 500);

  React.useEffect(() => {
    setPage(1);
  }, [debouncedSearch, statusFilter]);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      const res = await getJobSeekers({
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
      buildJobSeekerColumns({
        onView: async (row) => {
          setViewLoading(true);
          const res = await getJobSeeker(row.id);
          setViewLoading(false);
          if (res.success) {
            setViewJobSeeker(res.data);
          } else {
            handleOpenToast(res.message || API_UNAVAILABLE_MESSAGE, "error");
          }
        },
        onEdit: (row) => router.push(`/admin/job-seekers/${row.id}/edit`),
        onToggleStatus: (row) => setStatusTarget(row),
      }),
    [router],
  );

  const confirmStatus = async () => {
    if (!statusTarget) return;
    setStatusLoading(true);
    const next: JobSeekerStatus = statusTarget.status === "active" ? "inactive" : "active";
    const res = await patchJobSeekerStatus(statusTarget.id, next);
    setStatusLoading(false);
    if (!res.success) {
      handleOpenToast(res.message || API_UNAVAILABLE_MESSAGE, "error");
      return;
    }
    handleOpenToast(
      `Job seeker ${next === "active" ? "activated" : "deactivated"} successfully`,
      "success",
    );
    setStatusTarget(null);
    setPage(1);
    const listRes = await getJobSeekers({
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
        searchPlaceholder="Search job seekers..."
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
        paginationLabel="job seekers"
        loading={loading}
        emptyMessage="No job seekers found."
      />
      <ConfirmDialog
        open={!!statusTarget}
        onOpenChange={(open) => !open && setStatusTarget(null)}
        title={
          statusTarget?.status === "active"
            ? "Deactivate job seeker?"
            : "Activate job seeker?"
        }
        description={
          statusTarget
            ? `Are you sure you want to ${statusTarget.status === "active" ? "deactivate" : "activate"} ${statusTarget.name}?`
            : ""
        }
        onConfirm={confirmStatus}
        loading={statusLoading}
      />
      <Dialog open={!!viewJobSeeker} onOpenChange={(open) => !open && setViewJobSeeker(null)}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Job Seeker Details</DialogTitle>
          </DialogHeader>
          {viewLoading ? (
            <div className="py-8 text-center text-sm text-gray-500">Loading...</div>
          ) : viewJobSeeker ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-sm text-gray-500">Name</dt>
                  <dd className="font-medium">{viewJobSeeker.name}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Email</dt>
                  <dd className="font-medium">{viewJobSeeker.email}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Status</dt>
                  <dd className="mt-1"><StatusBadge status={viewJobSeeker.isActive ? "active" : "inactive"} /></dd>
                </div>
                <ProfileValue label="Headline" value={viewJobSeeker.profile?.headline} />
                <ProfileValue label="Location" value={viewJobSeeker.profile?.location} />
                <ProfileValue label="Phone" value={viewJobSeeker.profile?.phone} />
                <ProfileValue label="Date of Birth" value={viewJobSeeker.profile?.dateOfBirth} />
                <ProfileValue label="Gender" value={viewJobSeeker.profile?.gender} />
                <ProfileValue label="Resume" value={viewJobSeeker.profile?.resumePath} />
                <ProfileValue label="LinkedIn" value={viewJobSeeker.profile?.linkedinUrl} />
                <ProfileValue label="GitHub" value={viewJobSeeker.profile?.githubUrl} />
                <ProfileValue label="Website / Portfolio" value={viewJobSeeker.profile?.websiteUrl} />
                <div className="sm:col-span-2">
                  <dt className="text-sm text-gray-500">Bio</dt>
                  <dd className="whitespace-pre-wrap font-medium">{viewJobSeeker.profile?.bio || "—"}</dd>
                </div>
              </div>
              <div className="flex justify-end border-t border-gray-200 pt-4">
                <AdminHeaderActionButton href={`/admin/job-seekers/${viewJobSeeker.id}/edit`}>
                  Edit Job Seeker
                </AdminHeaderActionButton>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ProfileValue({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="min-w-0">
      <dt className="text-sm text-gray-500">{label}</dt>
      <dd className="break-words font-medium">{value || "—"}</dd>
    </div>
  );
}
