"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { DashboardHeader } from "@/components/portal/DashboardHeader";
import { StatCard } from "@/components/portal/StatCard";
import { LoadingState } from "@/components/public/LoadingState";
import { listEmployerApplications, listEmployerJobs } from "@/services/employer-portal-service";
import { appRoutes } from "@/utils/endpoint";
import type { EmployerPortalJob } from "@/types/public-job";

export default function EmployerDashboardPage() {
  const { data: session } = useSession();
  const [jobs, setJobs] = useState<EmployerPortalJob[]>([]);
  const [appCount, setAppCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      listEmployerJobs(session?.user?.id),
      listEmployerApplications(session?.user?.id),
    ]).then(([jobItems, apps]) => {
      setJobs(jobItems);
      setAppCount(apps.length);
      setLoading(false);
    });
  }, [session?.user?.id]);

  if (loading) return <LoadingState />;

  return (
    <div>
      <DashboardHeader
        title={`Welcome, ${session?.user?.name ?? "there"}`}
        description="Manage listings, applicants, and your company profile."
        action={
          <Link href={appRoutes.employerJobCreate} className="rounded-xl bg-brand-royal px-5 py-3 font-ui text-sm font-semibold text-white">
            Post a job
          </Link>
        }
      />
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard label="Active jobs" value={jobs.filter((job) => job.status === "open").length} />
        <StatCard label="Applications" value={appCount} />
        <StatCard label="Closed jobs" value={jobs.filter((job) => job.status === "closed").length} />
      </div>
      <div className="rounded-2xl border border-border-default bg-white p-6">
        <h2 className="mb-4 font-ui text-base font-semibold text-brand-navy">Recent listings</h2>
        <div className="space-y-3">
          {jobs.slice(0, 5).map((job) => (
            <div key={job.id} className="flex items-center justify-between rounded-xl border border-border-default px-4 py-3">
              <div>
                <div className="font-ui text-sm font-semibold text-brand-navy">{job.title}</div>
                <div className="text-xs text-text-secondary">{job.applicants} applicants · {job.location}</div>
              </div>
              <span className="font-ui text-xs font-semibold text-brand-royal">{job.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
