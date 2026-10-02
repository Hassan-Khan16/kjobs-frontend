"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { DashboardHeader } from "@/components/portal/DashboardHeader";
import { ApplicationStatusBadge } from "@/components/portal/ApplicationStatusBadge";
import { EmptyState } from "@/components/public/EmptyState";
import { LoadingState } from "@/components/public/LoadingState";
import {
  getEmployerApplication,
  updateApplicationStatus,
  type EmployerApplication,
} from "@/services/employer-portal-service";
import { handleOpenToast } from "@/helper/toast";
import type { ApplicationUiStatus } from "@/types/public-job";

const STATUSES: ApplicationUiStatus[] = ["pending", "shortlisted", "accepted", "rejected"];

export default function EmployerApplicationDetailsPage() {
  const params = useParams<{ id: string }>();
  const { data: session } = useSession();
  const [item, setItem] = useState<EmployerApplication | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEmployerApplication(params.id, session?.user?.id).then((data) => {
      setItem(data);
      setLoading(false);
    });
  }, [params.id, session?.user?.id]);

  if (loading) return <LoadingState />;
  if (!item) return <EmptyState title="Application not found" />;

  return (
    <div className="max-w-3xl">
      <DashboardHeader title={item.applicantName} description={item.jobTitle} />
      <div className="rounded-2xl border border-border-default bg-white p-6">
        <ApplicationStatusBadge status={item.status} />
        <p className="mt-4 text-sm text-text-secondary">{item.applicantEmail}</p>
        <p className="mt-1 text-sm text-text-secondary">{item.location} · {item.experience}</p>
        <p className="mt-6 text-sm leading-relaxed text-text-support">{item.summary}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {STATUSES.map((status) => (
            <button
              key={status}
              type="button"
              onClick={async () => {
                const next = await updateApplicationStatus(item.id, status, session?.user?.id);
                if (next) {
                  setItem(next);
                  handleOpenToast("Status updated", "success");
                }
              }}
              className="rounded-lg border border-border-default px-3 py-2 font-ui text-xs font-semibold capitalize text-text-support hover:border-brand-royal hover:text-brand-royal"
            >
              {status}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
