import AdminPageHeader from "@/components/admin-page-header/AdminPageHeader";
import AdminDashboardContainer from "@/components/admin-dashboard-container/AdminDashboardContainer";
import { AdminRecentJobsTable } from "@/components/admin-recent-jobs-table/AdminRecentJobsTable";
import { AdminRecentApplicationsTable } from "@/components/admin-recent-applications-table/AdminRecentApplicationsTable";
import {
  getAdminDashboardStats,
  getAdminRecentApplications,
  getAdminRecentJobs,
} from "@/services/admin-dashboard-service";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [statsRes, jobsRes, appsRes] = await Promise.all([
    getAdminDashboardStats(),
    getAdminRecentJobs(),
    getAdminRecentApplications(),
  ]);

  return (
    <div>
      <AdminPageHeader
        title="Dashboard"
        subtitle="Welcome back! Here's what's happening with KJobs today."
      />
      <AdminDashboardContainer stats={statsRes.data} />
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-[10px] border border-gray-105 bg-background p-4">
          <h2 className="font-arial text-lg text-black-10 mb-4">Recent Jobs</h2>
          <AdminRecentJobsTable data={jobsRes.data} />
        </div>
        <div className="rounded-[10px] border border-gray-105 bg-background p-4">
          <h2 className="font-arial text-lg text-black-10 mb-4">
            Recent Applications
          </h2>
          <AdminRecentApplicationsTable data={appsRes.data} />
        </div>
      </div>
    </div>
  );
}
