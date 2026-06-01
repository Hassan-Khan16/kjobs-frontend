import AdminPageHeader from "@/components/admin-page-header/AdminPageHeader";
import AdminEmployerManagement from "@/components/admin-employer-management/AdminEmployerManagement";

export default function AdminEmployersPage() {
  return (
    <div>
      <AdminPageHeader
        title="Employers Management"
        subtitle="Manage employer accounts and companies"
      />
      <AdminEmployerManagement />
    </div>
  );
}
