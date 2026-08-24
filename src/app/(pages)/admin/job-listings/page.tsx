import AdminPageHeader from "@/components/admin-page-header/AdminPageHeader";
import { AdminHeaderActionButton } from "@/components/admin-page-header/AdminHeaderActionButton";
import AdminJobListingManagement from "@/components/admin-job-listing-management/AdminJobListingManagement";

export default function AdminJobListingsPage() {
  return (
    <div>
      <AdminPageHeader
        title="Job Listings"
        subtitle="Manage open and closed job postings"
        action={
          <AdminHeaderActionButton href="/admin/job-listings/create">
            Create Job
          </AdminHeaderActionButton>
        }
      />
      <AdminJobListingManagement />
    </div>
  );
}
