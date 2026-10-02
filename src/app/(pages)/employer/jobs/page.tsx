"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { DashboardHeader } from "@/components/portal/DashboardHeader";
import { EmptyState } from "@/components/public/EmptyState";
import { LoadingState } from "@/components/public/LoadingState";
import { listEmployerJobs } from "@/services/employer-portal-service";
import { appRoutes, replacePathParams } from "@/utils/endpoint";
import type { EmployerPortalJob } from "@/types/public-job";

export default function EmployerJobsPage() {
  const { data: session } = useSession();
  const [jobs, setJobs] = useState<EmployerPortalJob[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listEmployerJobs(session?.user?.id).then((data) => {
      setJobs(data);
      setLoading(false);
    });
  }, [session?.user?.id]);

  return (
    <div>
      <DashboardHeader
        title="My Jobs"
        description="Create and manage your listings."
        action={
          <Link href={appRoutes.employerJobCreate} className="rounded-xl bg-brand-royal px-5 py-3 font-ui text-sm font-semibold text-white">
            Create job
          </Link>
        }
      />
      {loading ? (
        <LoadingState />
      ) : jobs.length === 0 ? (
        <EmptyState title="No jobs yet" description="Post your first role to start receiving applications." />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-border-default bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-border-default bg-surface font-ui text-xs text-text-secondary">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Applicants</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id} className="border-b border-surface-muted last:border-0">
                  <td className="px-4 py-3 font-medium text-brand-navy">{job.title}</td>
                  <td className="px-4 py-3 text-text-secondary">{job.location}</td>
                  <td className="px-4 py-3 text-text-secondary">{job.type}</td>
                  <td className="px-4 py-3 text-text-secondary">{job.applicants}</td>
                  <td className="px-4 py-3 capitalize">{job.status}</td>
                  <td className="px-4 py-3">
                    <Link href={replacePathParams(appRoutes.employerJobDetails, { id: job.id })} className="font-ui text-xs font-semibold text-brand-royal">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
