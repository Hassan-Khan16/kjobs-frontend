import AdminPageHeader from "@/components/admin-page-header/AdminPageHeader";
import { AdminHeaderActionButton } from "@/components/admin-page-header/AdminHeaderActionButton";
import { StatusBadge } from "@/components/status-badge/StatusBadge";
import type { AdminJobListing } from "@/types/job-listing";

export default function AdminJobListingDetailContainer({
  job,
}: {
  job: AdminJobListing;
}) {
  return (
    <div>
      <AdminPageHeader
        title={job.title}
        subtitle={job.employerName}
        action={
          <AdminHeaderActionButton href={`/admin/job-listings/${job.id}/edit`}>
            Edit Job
          </AdminHeaderActionButton>
        }
      />
      <dl className="grid gap-4 max-w-xl rounded-[10px] border border-gray-105 bg-background p-6">
        <div>
          <dt className="text-sm text-gray-116">Location</dt>
          <dd>{job.location}</dd>
        </div>
        <div>
          <dt className="text-sm text-gray-116">Type</dt>
          <dd>{job.type}</dd>
        </div>
        <div>
          <dt className="text-sm text-gray-116">Status</dt>
          <dd className="mt-1">
            <StatusBadge status={job.status} />
          </dd>
        </div>
      </dl>
    </div>
  );
}
