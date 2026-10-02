"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { DashboardHeader } from "@/components/portal/DashboardHeader";
import { EmployerJobForm } from "@/components/employers/EmployerJobForm";
import { createEmployerJob } from "@/services/employer-portal-service";
import { handleOpenToast } from "@/helper/toast";
import { appRoutes, replacePathParams } from "@/utils/endpoint";

export default function CreateJobPage() {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div className="max-w-3xl">
      <DashboardHeader title="Create Job" description="Publish a new listing for candidates." />
      <EmployerJobForm
        submitLabel="Publish job"
        onSubmit={async (payload) => {
          const job = await createEmployerJob(payload, session?.user?.id);
          handleOpenToast("Job created", "success");
          router.push(replacePathParams(appRoutes.employerJobDetails, { id: job.id }));
        }}
      />
    </div>
  );
}
