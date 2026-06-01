"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { AdminUserListItem } from "@/types/user";
import { AdminTableIconActions } from "@/components/admin-table-icon-actions/AdminTableIconActions";
import { StatusBadge } from "@/components/status-badge/StatusBadge";

export function buildUserColumns(handlers: {
  onView: (row: AdminUserListItem) => void;
  onEdit: (row: AdminUserListItem) => void;
  onToggleStatus: (row: AdminUserListItem) => void;
}): ColumnDef<AdminUserListItem>[] {
  return [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "role", header: "Role" },
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
