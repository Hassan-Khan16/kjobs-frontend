"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { DashboardHeader } from "@/components/portal/DashboardHeader";
import { StatCard } from "@/components/portal/StatCard";
import { ApplicationStatusBadge } from "@/components/portal/ApplicationStatusBadge";
import { LoadingState } from "@/components/public/LoadingState";
import { listUserApplications } from "@/services/user-application-service";
import { getSavedJobIds } from "@/services/saved-jobs-service";
import { appRoutes, replacePathParams } from "@/utils/endpoint";
import type { UserApplication } from "@/types/public-job";

export default function UserDashboardPage() {
  const { data: session } = useSession();
  const [applications, setApplications] = useState<UserApplication[]>([]);
  const [savedCount, setSavedCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      listUserApplications(session?.user?.id),
      getSavedJobIds(session?.user?.id),
    ]).then(([apps, saved]) => {
      setApplications(apps);
      setSavedCount(saved.length);
      setLoading(false);
    });
  }, [session?.user?.id]);

  if (loading) return <LoadingState />;

  return (
    <div>
      <DashboardHeader
        title={`Welcome, ${session?.user?.name ?? "there"}`}
        description="Track applications, saved jobs, and your next move."
        action={
          <Link href={appRoutes.jobs} className="rounded-xl bg-brand-royal px-5 py-3 font-ui text-sm font-semibold text-white">
            Browse jobs
          </Link>
        }
      />
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard label="Applications" value={applications.length} />
        <StatCard label="Saved jobs" value={savedCount} />
        <StatCard label="Applied" value={applications.filter((item) => item.status === "applied").length} />
      </div>
      <div className="rounded-2xl border border-border-default bg-white p-6">
        <h2 className="mb-4 font-ui text-base font-semibold text-brand-navy">Recent applications</h2>
        {applications.length === 0 ? (
          <p className="text-sm text-text-secondary">You haven&apos;t applied to any jobs yet.</p>
        ) : (
          <div className="space-y-3">
            {applications.slice(0, 5).map((item) => (
              <Link
                key={item.id}
                href={replacePathParams(appRoutes.userApplicationDetails, { id: item.id })}
                className="flex items-center justify-between rounded-xl border border-border-default px-4 py-3"
              >
                <div>
                  <div className="font-ui text-sm font-semibold text-brand-navy">{item.jobTitle}</div>
                  <div className="text-xs text-text-secondary">{item.company}</div>
                </div>
                <ApplicationStatusBadge status={item.status} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
