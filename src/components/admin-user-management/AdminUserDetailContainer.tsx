"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import AdminPageHeader from "@/components/admin-page-header/AdminPageHeader";
import { StatusBadge } from "@/components/status-badge/StatusBadge";
import type { AdminUser } from "@/types/user";

export default function AdminUserDetailContainer({ user }: { user: AdminUser }) {
  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <AdminPageHeader title={user.name} subtitle={user.email} />
        <Button asChild variant="gradientCurved">
          <Link href={`/admin/users/${user.id}/edit`}>Edit User</Link>
        </Button>
      </div>
      <dl className="mt-6 grid gap-4 max-w-xl rounded-[10px] border border-gray-105 bg-background p-6">
        <div>
          <dt className="text-sm text-gray-116">Role</dt>
          <dd className="font-medium capitalize">{user.role}</dd>
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
