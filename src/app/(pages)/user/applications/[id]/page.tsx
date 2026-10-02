"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { DashboardHeader } from "@/components/portal/DashboardHeader";
import { ApplicationStatusBadge } from "@/components/portal/ApplicationStatusBadge";
import { EmptyState } from "@/components/public/EmptyState";
import { LoadingState } from "@/components/public/LoadingState";
import { getUserApplication } from "@/services/user-application-service";
import type { UserApplication } from "@/types/public-job";

export default function UserApplicationDetailsPage() {
  const params = useParams<{ id: string }>();
  const { data: session } = useSession();
  const [item, setItem] = useState<UserApplication | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserApplication(params.id, session?.user?.id).then((data) => {
      setItem(data);
      setLoading(false);
    });
  }, [params.id, session?.user?.id]);

  if (loading) return <LoadingState />;
  if (!item) return <EmptyState title="Application not found" />;

  return (
    <div className="max-w-3xl">
      <DashboardHeader title={item.jobTitle} description={item.company} />
      <div className="rounded-2xl border border-border-default bg-white p-6">
        <ApplicationStatusBadge status={item.status} />
        <p className="mt-4 text-sm text-text-secondary">Applied {new Date(item.appliedAt).toLocaleDateString()}</p>
        <p className="mt-2 text-sm text-text-support">{item.location}</p>
        {item.coverLetter ? (
          <p className="mt-6 text-sm leading-relaxed text-text-support">{item.coverLetter}</p>
        ) : null}
      </div>
    </div>
  );
}
