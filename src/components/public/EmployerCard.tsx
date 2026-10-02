import Link from "next/link";
import { MapPin } from "lucide-react";
import { appRoutes, replacePathParams } from "@/utils/endpoint";
import type { PublicEmployer } from "@/types/public-job";

type EmployerCardProps = {
  employer: PublicEmployer;
};

export function EmployerCard({ employer }: EmployerCardProps) {
  return (
    <article className="rounded-2xl border border-border-default bg-white p-6">
      <div
        className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl font-display text-sm text-white"
        style={{ background: `linear-gradient(135deg, ${employer.color}, #191C33)` }}
      >
        {employer.initials}
      </div>
      <h3 className="font-ui text-base font-semibold text-brand-navy">{employer.name}</h3>
      <p className="mt-1 text-sm text-text-secondary">{employer.industry}</p>
      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-text-secondary">
        <span className="inline-flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          {employer.location}
        </span>
        <span className="font-semibold text-brand-navy">{employer.openJobs} open jobs</span>
      </div>
      <Link
        href={replacePathParams(appRoutes.employers, { id: employer.id })}
        className="mt-5 inline-flex rounded-lg bg-[rgba(47,91,222,0.08)] px-4 py-2 font-ui text-xs font-semibold text-brand-royal"
      >
        View Jobs
      </Link>
    </article>
  );
}
