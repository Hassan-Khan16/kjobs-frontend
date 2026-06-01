"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import type { DashboardRecentApplication } from "@/types/admin-dashboard";
import { StatusBadge } from "@/components/status-badge/StatusBadge";

const columns: ColumnDef<DashboardRecentApplication>[] = [
  { accessorKey: "applicantName", header: "Applicant" },
  { accessorKey: "jobTitle", header: "Job" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
  { accessorKey: "appliedAt", header: "Applied" },
];

export function AdminRecentApplicationsTable({
  data,
}: {
  data: DashboardRecentApplication[];
}) {
  return (
    <DataTable
      columns={columns}
      data={data}
      emptyMessage="No recent applications."
      className="border-none"
    />
  );
}
