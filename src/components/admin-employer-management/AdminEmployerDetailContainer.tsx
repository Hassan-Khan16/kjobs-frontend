import AdminPageHeader from "@/components/admin-page-header/AdminPageHeader";
import { AdminHeaderActionButton } from "@/components/admin-page-header/AdminHeaderActionButton";
import { StatusBadge } from "@/components/status-badge/StatusBadge";
import type { AdminEmployer } from "@/types/employer";

export default function AdminEmployerDetailContainer({
  employer,
}: {
  employer: AdminEmployer;
}) {
  return (
    <div>
      <AdminPageHeader
        title={employer.companyName}
        subtitle={employer.user.email}
        action={
          <AdminHeaderActionButton
            href={`/admin/employers/${employer.id}/edit`}
          >
            Edit Employer
          </AdminHeaderActionButton>
        }
      />
      <dl className="grid gap-4 max-w-2xl rounded-[10px] border border-gray-105 bg-background p-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <dt className="text-sm text-gray-500">Contact Person</dt>
            <dd className="font-medium">{employer.contactPersonName}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">Phone</dt>
            <dd className="font-medium">{employer.phone || "—"}</dd>
          </div>
          <div className="col-span-2">
            <dt className="text-sm text-gray-500">Company Description</dt>
            <dd className="font-medium">{employer.companyDescription || "—"}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">Website</dt>
            <dd className="font-medium">
              {employer.website ? (
                <a href={employer.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {employer.website}
                </a>
              ) : "—"}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">Status</dt>
            <dd className="mt-1">
              <StatusBadge status={employer.user.isActive ? "active" : "inactive"} />
            </dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">Created</dt>
            <dd className="font-medium">{employer.createdAt || "—"}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-500">Updated</dt>
            <dd className="font-medium">{employer.updatedAt || "—"}</dd>
          </div>
        </div>
      </dl>
    </div>
  );
}
