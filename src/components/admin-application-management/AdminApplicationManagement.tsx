"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import AdminPagedDataTableShell from "@/components/admin-paged-data-table-shell/AdminPagedDataTableShell";
import {
  TableSearchFilterHeader,
} from "@/components/table-search-filter-header/TableSearchFilterHeader";
import { StatusBadge } from "@/components/status-badge/StatusBadge";
import { AdminTableIconActions } from "@/components/admin-table-icon-actions/AdminTableIconActions";
import { useDebounce } from "@/hooks/use-debounce";
import { PAGE_SIZE } from "@/constants";
import { getApplications } from "@/services/application-service";
import type { AdminApplicationListItem } from "@/types/application";

const applicationStatusOptions = [
  { value: "all", label: "All Status" },
  { value: "pending", label: "Pending" },
  { value: "reviewed", label: "Reviewed" },
  { value: "shortlisted", label: "Shortlisted" },
  { value: "rejected", label: "Rejected" },
  { value: "hired", label: "Hired" },
];

export default function AdminApplicationManagement() {
  const router = useRouter();
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [page, setPage] = React.useState(1);
  const [items, setItems] = React.useState<AdminApplicationListItem[]>([]);
  const [total, setTotal] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const debouncedSearch = useDebounce(search, 500);

  React.useEffect(() => setPage(1), [debouncedSearch, statusFilter]);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      const res = await getApplications({
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

  const columns: ColumnDef<AdminApplicationListItem>[] = [
    { accessorKey: "applicantName", header: "Applicant" },
    { accessorKey: "jobTitle", header: "Job" },
    { accessorKey: "employerName", header: "Employer" },
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
          onView={() =>
            router.push(`/admin/applications/${row.original.id}`)
          }
        />
      ),
    },
  ];

  const start = total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const end = Math.min(page * PAGE_SIZE, total);

  return (
    <div className="space-y-4">
      <TableSearchFilterHeader
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search applications..."
        filterValue={statusFilter}
        onFilterChange={setStatusFilter}
        filterOptions={applicationStatusOptions}
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
        paginationLabel="applications"
        loading={loading}
        emptyMessage="No applications found."
      />
    </div>
  );
}
