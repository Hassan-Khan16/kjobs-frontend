import AdminPageHeader from "@/components/admin-page-header/AdminPageHeader";
import AdminJobListingManagement from "@/components/admin-job-listing-management/AdminJobListingManagement";

export default function AdminJobListingsPage() {
  return (
    <div>
      <AdminPageHeader
        title="Job Listings"
        subtitle="Manage open and closed job postings"
      />
      <AdminJobListingManagement />
    </div>
  );
}
