"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { EmployerCard } from "@/components/public/EmployerCard";
import { JobCard } from "@/components/public/JobCard";
import { EmptyState } from "@/components/public/EmptyState";
import { ErrorState } from "@/components/public/ErrorState";
import { LoadingState } from "@/components/public/LoadingState";
import { getPublicEmployerById } from "@/services/public-job-service";
import type { PublicEmployer, PublicJob } from "@/types/public-job";

export default function EmployerPublicPage() {
  const params = useParams<{ id: string }>();
  const [employer, setEmployer] = useState<PublicEmployer | null>(null);
  const [jobs, setJobs] = useState<PublicJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    getPublicEmployerById(params.id)
      .then((res) => {
        if (!active) return;
        if (!res.success || !res.data) {
          setError(res.message);
          return;
        }
        setEmployer(res.data);
        setJobs(res.jobs);
      })
      .catch(() => {
        if (active) setError("Unable to load this employer.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [params.id]);

  if (loading) return <LoadingState className="pt-32" />;
  if (error || !employer) return <ErrorState description={error || "Employer not found"} />;

  return (
    <div className="min-h-screen bg-surface pt-28 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-md">
          <EmployerCard employer={employer} />
        </div>
        <h1 className="mb-6 font-display text-3xl text-brand-navy">OPEN ROLES</h1>
        {jobs.length === 0 ? (
          <EmptyState title="No open roles" description="This company has no public listings right now." />
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
