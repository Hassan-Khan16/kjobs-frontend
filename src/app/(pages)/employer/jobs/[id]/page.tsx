"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { DashboardHeader } from "@/components/portal/DashboardHeader";
import { EmptyState } from "@/components/public/EmptyState";
import { LoadingState } from "@/components/public/LoadingState";
import { getEmployerJob } from "@/services/employer-portal-service";
import { appRoutes, replacePathParams } from "@/utils/endpoint";
import type { EmployerPortalJob } from "@/types/public-job";

export default function EmployerJobDetailsPage() {
  const params = useParams<{ id: string }>();
  const { data: session } = useSession();
  const [job, setJob] = useState<EmployerPortalJob | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEmployerJob(params.id, session?.user?.id).then((data) => {
      setJob(data);
      setLoading(false);
    });
  }, [params.id, session?.user?.id]);

  if (loading) return <LoadingState />;
  if (!job) return <EmptyState title="Job not found" />;

  return (
    <div className="max-w-3xl">
      <DashboardHeader
        title={job.title}
        description={`${job.location} · ${job.type}`}
        action={
          <div className="flex gap-2">
            <Link href={replacePathParams(appRoutes.employerJobEdit, { id: job.id })} className="rounded-xl border border-brand-royal px-4 py-2 font-ui text-sm font-semibold text-brand-royal">
              Edit
            </Link>
            <Link href={replacePathParams(appRoutes.employerJobApplications, { id: job.id })} className="rounded-xl bg-brand-royal px-4 py-2 font-ui text-sm font-semibold text-white">
              Applications
            </Link>
          </div>
        }
      />
      <div className="rounded-2xl border border-border-default bg-white p-6">
        <p className="text-sm text-text-secondary">{job.salary} · {job.experienceLevel}</p>
        <p className="mt-4 text-sm leading-relaxed text-text-support">{job.description}</p>
      </div>
    </div>
  );
}
