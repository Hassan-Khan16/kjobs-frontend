"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { DashboardHeader } from "@/components/portal/DashboardHeader";
import { ApplicationStatusBadge } from "@/components/portal/ApplicationStatusBadge";
import { EmptyState } from "@/components/public/EmptyState";
import { LoadingState } from "@/components/public/LoadingState";
import { listEmployerApplications, type EmployerApplication } from "@/services/employer-portal-service";
import { appRoutes, replacePathParams } from "@/utils/endpoint";

export default function EmployerApplicationsPage() {
  const { data: session } = useSession();
  const [items, setItems] = useState<EmployerApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listEmployerApplications(session?.user?.id).then((data) => {
      setItems(data);
      setLoading(false);
    });
  }, [session?.user?.id]);

  return (
    <div>
      <DashboardHeader title="Applications" description="All applicants across your jobs." />
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
              className="flex flex-col justify-between gap-3 rounded-2xl border border-border-default bg-white p-5 sm:flex-row sm:items-center"
            >
              <div>
                <div className="font-ui text-sm font-semibold text-brand-navy">{item.applicantName}</div>
                <div className="text-xs text-text-secondary">{item.jobTitle} · {item.location}</div>
              </div>
              <ApplicationStatusBadge status={item.status} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
