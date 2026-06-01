import AdminPageHeader from "@/components/admin-page-header/AdminPageHeader";
import { AdminHeaderActionButton } from "@/components/admin-page-header/AdminHeaderActionButton";
import AdminUserManagement from "@/components/admin-user-management/AdminUserManagement";

export default function AdminUsersPage() {
  return (
    <div>
      <AdminPageHeader
        title="Users Management"
        subtitle="Manage job seekers and their accounts"
        action={
          <AdminHeaderActionButton href="/admin/users/create">
            Create User
          </AdminHeaderActionButton>
        }
      />
      <AdminUserManagement />
    </div>
  );
}
