import Link from "next/link";
import { Button } from "@/components/ui/button";
import AdminPageHeader from "@/components/admin-page-header/AdminPageHeader";
import { StatusBadge } from "@/components/status-badge/StatusBadge";
import type { AdminJobListing } from "@/types/job-listing";

export default function AdminJobListingDetailContainer({
  job,
}: {
  job: AdminJobListing;
}) {
  return (
    <div>
      <div className="flex flex-wrap justify-between gap-4">
        <AdminPageHeader title={job.title} subtitle={job.employerName} />
        <Button asChild variant="gradientCurved">
          <Link href={`/admin/job-listings/${job.id}/edit`}>Edit</Link>
        </Button>
      </div>
      <dl className="mt-6 grid gap-4 max-w-xl rounded-[10px] border border-gray-105 bg-background p-6">
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
