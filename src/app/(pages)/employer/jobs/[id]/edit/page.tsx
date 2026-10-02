"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { DashboardHeader } from "@/components/portal/DashboardHeader";
import { EmployerJobForm } from "@/components/employers/EmployerJobForm";
import { EmptyState } from "@/components/public/EmptyState";
import { LoadingState } from "@/components/public/LoadingState";
import { getEmployerJob, updateEmployerJob } from "@/services/employer-portal-service";
import { handleOpenToast } from "@/helper/toast";
import { appRoutes, replacePathParams } from "@/utils/endpoint";
import type { EmployerPortalJob } from "@/types/public-job";

export default function EditJobPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
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
      <DashboardHeader title="Edit Job" description={job.title} />
      <EmployerJobForm
        initial={job}
        submitLabel="Save changes"
        onSubmit={async (payload) => {
          await updateEmployerJob(params.id, payload, session?.user?.id);
          handleOpenToast("Job updated", "success");
          router.push(replacePathParams(appRoutes.employerJobDetails, { id: params.id }));
        }}
      />
    </div>
  );
}
