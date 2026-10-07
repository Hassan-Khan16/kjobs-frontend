import AdminPageHeader from "@/components/admin-page-header/AdminPageHeader";
import { AdminHeaderActionButton } from "@/components/admin-page-header/AdminHeaderActionButton";
import AdminUserManagement from "@/components/admin-user-management/AdminUserManagement";

export default function AdminUsersPage() {
  return (
    <div>
      <AdminPageHeader
        title="Job Seekers Management"
        subtitle="Manage job seekers and their accounts"
        action={
          <AdminHeaderActionButton href="/admin/job-seekers/create">
            Create Job Seeker
          </AdminHeaderActionButton>
        }
      />
      <AdminUserManagement />
    </div>
  );
}
