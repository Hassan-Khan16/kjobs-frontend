"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { JobCard } from "@/components/public/JobCard";
import { JobSearchBar } from "@/components/public/JobSearchBar";
import { EmptyState } from "@/components/public/EmptyState";
import { ErrorState } from "@/components/public/ErrorState";
import { LoadingState } from "@/components/public/LoadingState";
import { PublicPagination } from "@/components/public/PublicPagination";
import { JOB_CATEGORIES, JOB_TYPES } from "@/data/public-jobs";
import { listPublicJobs } from "@/services/public-job-service";
import { getSavedJobIds, toggleSavedJob } from "@/services/saved-jobs-service";
import type { PublicJob } from "@/types/public-job";
import { useSession } from "next-auth/react";

export function JobsListingPage() {
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [category, setCategory] = useState("All");
  const [jobType, setJobType] = useState("All Types");
  const [page, setPage] = useState(1);
  const [jobs, setJobs] = useState<PublicJob[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState<string[]>([]);

  useEffect(() => {
    getSavedJobIds(session?.user?.id).then(setSaved);
  }, [session?.user?.id]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    listPublicJobs({ q: search, location, category, type: jobType, page, limit: 9 })
      .then((res) => {
        if (!active) return;
        if (!res.success) {
          setError(res.message);
          setJobs([]);
          return;
        }
        setJobs(res.data.items);
        setTotal(res.data.meta.total);
        setTotalPages(res.data.meta.totalPages);
      })
      .catch(() => {
        if (active) setError("Unable to load jobs.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [search, location, category, jobType, page]);

  return (
    <div className="min-h-screen bg-surface">
      <div className="bg-[linear-gradient(160deg,#243B6B_0%,#191C33_100%)] pt-28 pb-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-3 font-display text-4xl tracking-wide text-white lg:text-5xl">FIND YOUR JOB</h1>
          <p className="mb-8 text-base text-white/65">{total} opportunities available right now</p>
          <JobSearchBar
            className="mx-auto"
            search={search}
            location={location}
            onSearchChange={(value) => {
              setSearch(value);
              setPage(1);
            }}
            onLocationChange={(value) => {
              setLocation(value);
              setPage(1);
            }}
            onSubmit={() => setPage(1)}
            variant="page"
          />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap gap-3">
          <div className="flex flex-wrap gap-2">
            {JOB_CATEGORIES.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setCategory(item);
                  setPage(1);
                }}
                className="rounded-lg border px-4 py-2 font-ui text-sm font-medium"
                style={{
                  background: category === item ? "#2F5BDE" : "#FFFFFF",
                  color: category === item ? "#FFFFFF" : "#475569",
                  borderColor: category === item ? "#2F5BDE" : "#E5E7EB",
                }}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="ml-auto flex flex-wrap gap-2">
            {JOB_TYPES.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setJobType(item);
                  setPage(1);
                }}
                className="rounded-lg border px-4 py-2 font-ui text-sm font-medium"
                style={{
                  background: jobType === item ? "rgba(47,91,222,0.1)" : "#FFFFFF",
                  color: jobType === item ? "#2F5BDE" : "#475569",
                  borderColor: jobType === item ? "#2F5BDE" : "#E5E7EB",
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <LoadingState cards={6} />
        ) : error ? (
          <ErrorState description={error} onRetry={() => setPage(1)} />
        ) : jobs.length === 0 ? (
          <EmptyState title="No jobs found" description="Try adjusting your search or filters" />
        ) : (
          <>
            <div className="mb-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {jobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  saved={saved.includes(job.id)}
                  onToggleSave={async (id) => {
                    const next = await toggleSavedJob(id, session?.user?.id);
                    setSaved(next);
                  }}
                />
              ))}
            </div>
            <PublicPagination page={page} totalPages={totalPages} onPageChange={setPage} />
          </>
        )}
      </div>
    </div>
  );
}
