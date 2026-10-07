"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { AdminJobSeekerListItem } from "@/types/job-seeker";
import { AdminTableIconActions } from "@/components/admin-table-icon-actions/AdminTableIconActions";
import { StatusBadge } from "@/components/status-badge/StatusBadge";

export function buildJobSeekerColumns(handlers: {
  onView: (row: AdminJobSeekerListItem) => void;
  onEdit: (row: AdminJobSeekerListItem) => void;
  onToggleStatus: (row: AdminJobSeekerListItem) => void;
}): ColumnDef<AdminJobSeekerListItem>[] {
  return [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "headline", header: "Headline" },
    { accessorKey: "location", header: "Location" },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
    { accessorKey: "createdAt", header: "Created" },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <AdminTableIconActions
          status={row.original.status}
          onView={() => handlers.onView(row.original)}
          onEdit={() => handlers.onEdit(row.original)}
          onDelete={() => handlers.onToggleStatus(row.original)}
        />
      ),
    },
  ];
}
