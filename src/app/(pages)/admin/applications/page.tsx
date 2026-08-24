import AdminPageHeader from "@/components/admin-page-header/AdminPageHeader";
import AdminApplicationManagement from "@/components/admin-application-management/AdminApplicationManagement";

export default function AdminApplicationsPage() {
  return (
    <div>
      <AdminPageHeader
        title="Applications"
        subtitle="Review and update application status"
      />
      <AdminApplicationManagement />
    </div>
  );
}
