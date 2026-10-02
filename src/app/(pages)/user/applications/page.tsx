"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { DashboardHeader } from "@/components/portal/DashboardHeader";
import { ApplicationStatusBadge } from "@/components/portal/ApplicationStatusBadge";
import { EmptyState } from "@/components/public/EmptyState";
import { LoadingState } from "@/components/public/LoadingState";
import { listUserApplications } from "@/services/user-application-service";
import { appRoutes, replacePathParams } from "@/utils/endpoint";
import type { UserApplication } from "@/types/public-job";

export default function UserApplicationsPage() {
  const { data: session } = useSession();
  const [items, setItems] = useState<UserApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listUserApplications(session?.user?.id).then((data) => {
      setItems(data);
      setLoading(false);
    });
  }, [session?.user?.id]);

  return (
    <div>
      <DashboardHeader title="My Applications" description="Track every role you've applied to." />
      {loading ? (
        <LoadingState />
      ) : items.length === 0 ? (
        <EmptyState title="No applications yet" description="Apply to a job to see it here." />
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <Link
              key={item.id}
              href={replacePathParams(appRoutes.userApplicationDetails, { id: item.id })}
              className="flex flex-col justify-between gap-3 rounded-2xl border border-border-default bg-white p-5 sm:flex-row sm:items-center"
            >
              <div>
                <div className="font-ui text-base font-semibold text-brand-navy">{item.jobTitle}</div>
                <div className="text-sm text-text-secondary">{item.company} · {item.location}</div>
              </div>
              <ApplicationStatusBadge status={item.status} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
