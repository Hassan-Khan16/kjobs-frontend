"use client";

import Link from "next/link";
import { Bookmark, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { replacePathParams, appRoutes } from "@/utils/endpoint";
import type { PublicJob } from "@/types/public-job";

type JobCardProps = {
  job: PublicJob;
  saved?: boolean;
  onToggleSave?: (jobId: string) => void;
  className?: string;
};

export function JobCard({ job, saved = false, onToggleSave, className }: JobCardProps) {
  const href = replacePathParams(appRoutes.jobDetails, { id: job.id });

  return (
    <article
      className={cn(
        "group rounded-2xl border border-border-default bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl",
        className,
      )}
    >
      <div className="mb-4 flex items-start justify-between">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-display text-sm text-white"
          style={{ background: `linear-gradient(135deg, ${job.color}, #191C33)` }}
        >
          {job.initials}
        </div>
        <div className="flex items-center gap-2">
          {onToggleSave ? (
            <button
              type="button"
              onClick={() => onToggleSave(job.id)}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-border-default"
              style={{
                background: saved ? "rgba(47,91,222,0.1)" : "#F8FAFC",
                color: saved ? "#2F5BDE" : "#94A3B8",
              }}
              aria-label={saved ? "Unsave job" : "Save job"}
            >
              <Bookmark className={cn("h-4 w-4", saved && "fill-current")} />
            </button>
          ) : null}
          <span className="rounded-full bg-[rgba(47,91,222,0.08)] px-2.5 py-1 font-ui text-xs font-medium text-brand-royal">
            {job.type}
          </span>
        </div>
      </div>
      <h3 className="font-ui text-base font-semibold text-brand-navy">{job.title}</h3>
      <p className="mb-4 mt-1 text-sm text-text-secondary">{job.company}</p>
      <div className="mb-5 flex flex-wrap gap-x-4 gap-y-1">
        <span className="flex items-center gap-1 text-xs text-text-secondary">
          <MapPin className="h-3 w-3" />
          {job.location}
        </span>
        <span className="text-xs font-semibold text-brand-navy">{job.salary}</span>
      </div>
      <div className="flex items-center justify-between border-t border-surface-muted pt-4">
        <span className="text-xs text-gray-103">{job.posted}</span>
        <Link
          href={href}
          className="rounded-lg bg-[rgba(47,91,222,0.08)] px-4 py-2 font-ui text-xs font-semibold text-brand-royal transition-colors hover:bg-[rgba(47,91,222,0.18)]"
        >
          View Job
        </Link>
      </div>
    </article>
  );
}
