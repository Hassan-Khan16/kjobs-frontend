import Link from "next/link";
import AdminPageHeader from "@/components/admin-page-header/AdminPageHeader";
import AdminUserManagement from "@/components/admin-user-management/AdminUserManagement";
import { Button } from "@/components/ui/button";

export default function AdminUsersPage() {
  return (
    <div>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <AdminPageHeader
          title="Users Management"
          subtitle="Manage job seekers and their accounts"
        />
        <Button
          asChild
          size="sm"
          className="h-8 shrink-0 rounded-md border-0 bg-[#191c33] px-3 text-xs font-medium text-white shadow-none hover:bg-[#191c33]/90"
        >
          <Link href="/admin/users/create">Create User</Link>
        </Button>
      </div>
      <AdminUserManagement />
    </div>
  );
}
