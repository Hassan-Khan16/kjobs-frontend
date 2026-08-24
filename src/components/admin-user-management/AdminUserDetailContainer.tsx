"use client";

import AdminPageHeader from "@/components/admin-page-header/AdminPageHeader";
import { AdminHeaderActionButton } from "@/components/admin-page-header/AdminHeaderActionButton";
import { StatusBadge } from "@/components/status-badge/StatusBadge";
import { formatUserRole } from "@/helper/user";
import type { AdminUser } from "@/types/user";

export default function AdminUserDetailContainer({ user }: { user: AdminUser }) {
  return (
    <div>
      <AdminPageHeader
        title={user.name}
        subtitle={user.email}
        action={
          <AdminHeaderActionButton href={`/admin/users/${user.id}/edit`}>
            Edit User
          </AdminHeaderActionButton>
        }
      />
      <dl className="grid gap-4 max-w-xl rounded-[10px] border border-gray-105 bg-background p-6">
        <div>
          <dt className="text-sm text-gray-116">Role</dt>
          <dd className="font-medium">{formatUserRole(user.role)}</dd>
        </div>
        <div>
          <dt className="text-sm text-gray-116">Status</dt>
          <dd className="mt-1">
            <StatusBadge status={user.isActive ? "active" : "inactive"} />
          </dd>
        </div>
        <div>
          <dt className="text-sm text-gray-116">Created</dt>
          <dd className="font-medium">{user.createdAt || "—"}</dd>
        </div>
        <div>
          <dt className="text-sm text-gray-116">Updated</dt>
          <dd className="font-medium">{user.updatedAt || "—"}</dd>
        </div>
      </dl>
    </div>
  );
}
