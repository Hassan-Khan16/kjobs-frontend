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
        title={employer.company_name}
        subtitle={employer.user.email}
        action={
          <AdminHeaderActionButton
            href={`/admin/employers/${employer.id}/edit`}
          >
            Edit Employer
          </AdminHeaderActionButton>
        }
      />
      <dl className="grid max-w-3xl gap-4 rounded-lg border border-gray-200 bg-background p-4 shadow-sm sm:p-6">
        <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
          <div className="min-w-0">
            <dt className="text-sm text-gray-500">Contact Person</dt>
            <dd className="break-words font-medium">{employer.contact_person_name}</dd>
          </div>
          <div className="min-w-0">
            <dt className="text-sm text-gray-500">Phone</dt>
            <dd className="font-medium">{employer.phone || "—"}</dd>
          </div>
          <div className="min-w-0 sm:col-span-2">
            <dt className="text-sm text-gray-500">Company Description</dt>
            <dd className="whitespace-pre-wrap break-words font-medium">{employer.company_description || "—"}</dd>
          </div>
          <div className="min-w-0">
            <dt className="text-sm text-gray-500">Website</dt>
            <dd className="font-medium">
              {employer.website ? (
                <a href={employer.website} target="_blank" rel="noopener noreferrer" className="break-all text-blue-600 hover:underline">
                  {employer.website}
                </a>
              ) : "—"}
            </dd>
          </div>
          <div className="min-w-0">
            <dt className="text-sm text-gray-500">Status</dt>
            <dd className="mt-1">
              <StatusBadge status={employer.user.is_active ? "active" : "inactive"} />
            </dd>
          </div>
          <div className="min-w-0">
            <dt className="text-sm text-gray-500">Created</dt>
            <dd className="break-words font-medium">{employer.created_at || "—"}</dd>
          </div>
          <div className="min-w-0">
            <dt className="text-sm text-gray-500">Updated</dt>
            <dd className="break-words font-medium">{employer.updated_at || "—"}</dd>
          </div>
        </div>
      </dl>
    </div>
  );
}
