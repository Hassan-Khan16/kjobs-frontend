import AdminPageHeader from "@/components/admin-page-header/AdminPageHeader";
import { AdminHeaderActionButton } from "@/components/admin-page-header/AdminHeaderActionButton";
import AdminJobSeekerManagement from "@/components/admin-job-seeker-management/AdminJobSeekerManagement";

export default function AdminJobSeekersPage() {
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
      <AdminJobSeekerManagement />
    </div>
  );
}
