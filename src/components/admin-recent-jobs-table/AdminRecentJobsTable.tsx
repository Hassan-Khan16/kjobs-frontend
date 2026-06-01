"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import type { DashboardRecentJob } from "@/types/admin-dashboard";
import { StatusBadge } from "@/components/status-badge/StatusBadge";

const columns: ColumnDef<DashboardRecentJob>[] = [
  { accessorKey: "title", header: "Job Title" },
  { accessorKey: "employerName", header: "Employer" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
  { accessorKey: "createdAt", header: "Created" },
];

export function AdminRecentJobsTable({ data }: { data: DashboardRecentJob[] }) {
  return (
    <DataTable
      columns={columns}
      data={data}
      emptyMessage="No recent jobs."
      className="border-none"
    />
  );
}
