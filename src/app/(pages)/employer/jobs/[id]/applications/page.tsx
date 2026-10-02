"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { DashboardHeader } from "@/components/portal/DashboardHeader";
import { ApplicationStatusBadge } from "@/components/portal/ApplicationStatusBadge";
import { EmptyState } from "@/components/public/EmptyState";
import { LoadingState } from "@/components/public/LoadingState";
import { listEmployerApplications } from "@/services/employer-portal-service";
import { appRoutes, replacePathParams } from "@/utils/endpoint";
import type { EmployerApplication } from "@/services/employer-portal-service";

export default function JobApplicationsPage() {
  const params = useParams<{ id: string }>();
  const { data: session } = useSession();
  const [items, setItems] = useState<EmployerApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listEmployerApplications(session?.user?.id, params.id).then((data) => {
      setItems(data);
      setLoading(false);
    });
  }, [params.id, session?.user?.id]);

  return (
    <div>
      <DashboardHeader title="Job Applications" description="Review candidates for this listing." />
      {loading ? (
        <LoadingState />
      ) : items.length === 0 ? (
        <EmptyState title="No applications yet" />
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <Link
              key={item.id}
              href={replacePathParams(appRoutes.employerApplicationDetails, { id: item.id })}
              className="flex items-center justify-between rounded-2xl border border-border-default bg-white p-5"
            >
              <div>
                <div className="font-ui text-sm font-semibold text-brand-navy">{item.applicantName}</div>
                <div className="text-xs text-text-secondary">{item.applicantEmail}</div>
              </div>
              <ApplicationStatusBadge status={item.status} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
