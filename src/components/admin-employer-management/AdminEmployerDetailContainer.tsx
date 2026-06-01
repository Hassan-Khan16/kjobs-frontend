import Link from "next/link";
import { Button } from "@/components/ui/button";
import AdminPageHeader from "@/components/admin-page-header/AdminPageHeader";
import { StatusBadge } from "@/components/status-badge/StatusBadge";
import type { AdminEmployer } from "@/types/employer";

export default function AdminEmployerDetailContainer({
  employer,
}: {
  employer: AdminEmployer;
}) {
  return (
    <div>
      <div className="flex flex-wrap justify-between gap-4">
        <AdminPageHeader
          title={employer.companyName}
          subtitle={employer.email}
        />
        <Button asChild variant="gradientCurved">
          <Link href={`/admin/employers/${employer.id}/edit`}>Edit</Link>
        </Button>
      </div>
      <dl className="mt-6 grid gap-4 max-w-xl rounded-[10px] border border-gray-105 bg-background p-6">
        <div>
          <dt className="text-sm text-gray-116">Contact</dt>
          <dd>{employer.contactName}</dd>
        </div>
        <div>
          <dt className="text-sm text-gray-116">Phone</dt>
          <dd>{employer.phone || "—"}</dd>
        </div>
        <div>
          <dt className="text-sm text-gray-116">Status</dt>
          <dd className="mt-1">
            <StatusBadge status={employer.isActive ? "active" : "inactive"} />
          </dd>
        </div>
      </dl>
    </div>
  );
}
