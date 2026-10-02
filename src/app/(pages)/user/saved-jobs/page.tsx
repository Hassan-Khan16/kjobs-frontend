"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { DashboardHeader } from "@/components/portal/DashboardHeader";
import { JobCard } from "@/components/public/JobCard";
import { EmptyState } from "@/components/public/EmptyState";
import { LoadingState } from "@/components/public/LoadingState";
import { getSavedJobs, toggleSavedJob } from "@/services/saved-jobs-service";
import type { PublicJob } from "@/types/public-job";

export default function SavedJobsPage() {
  const { data: session } = useSession();
  const [jobs, setJobs] = useState<PublicJob[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    getSavedJobs(session?.user?.id).then((data) => {
      setJobs(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    load();
  }, [session?.user?.id]);

  return (
    <div>
      <DashboardHeader title="Saved Jobs" description="Roles you've bookmarked for later." />
      {loading ? (
        <LoadingState cards={3} />
      ) : jobs.length === 0 ? (
        <EmptyState title="No saved jobs" description="Save a listing from the jobs page to see it here." />
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              saved
              onToggleSave={async (id) => {
                await toggleSavedJob(id, session?.user?.id);
                load();
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
