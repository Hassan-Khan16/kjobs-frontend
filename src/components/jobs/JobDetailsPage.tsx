"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ArrowLeft, Bookmark, Check, MapPin, Users } from "lucide-react";
import { EmptyState } from "@/components/public/EmptyState";
import { ErrorState } from "@/components/public/ErrorState";
import { LoadingState } from "@/components/public/LoadingState";
import { GradientButton } from "@/components/public/GradientButton";
import { getPublicJobById, getRelatedJobs } from "@/services/public-job-service";
import { getSavedJobIds, toggleSavedJob } from "@/services/saved-jobs-service";
import { applyToJob, hasAppliedToJob } from "@/services/user-application-service";
import { handleOpenToast } from "@/helper/toast";
import { userRole } from "@/enum/role";
import { normalizeRole } from "@/helper/auth";
import { appRoutes, replacePathParams } from "@/utils/endpoint";
import type { PublicJob } from "@/types/public-job";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border-default bg-white p-7">
      <h2 className="mb-5 font-ui text-base font-bold text-brand-navy">{title}</h2>
      {children}
    </section>
  );
}

export function JobDetailsPage({ jobId }: { jobId: string }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [job, setJob] = useState<PublicJob | null>(null);
  const [related, setRelated] = useState<PublicJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [applied, setApplied] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showApply, setShowApply] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    Promise.all([
      getPublicJobById(jobId),
      getRelatedJobs(jobId),
      getSavedJobIds(session?.user?.id),
      hasAppliedToJob(jobId, session?.user?.id),
    ])
      .then(([jobRes, relatedJobs, savedIds, alreadyApplied]) => {
        if (!active) return;
        if (!jobRes.success || !jobRes.data) {
          setError(jobRes.message);
          setJob(null);
          return;
        }
        setJob(jobRes.data);
        setRelated(relatedJobs);
        setSaved(savedIds.includes(jobId));
        setApplied(alreadyApplied);
      })
      .catch(() => {
        if (active) setError("Unable to load this job.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [jobId, session?.user?.id]);

  const handleApply = async () => {
    if (!session?.user) {
      router.push(`${appRoutes.login}?next=${encodeURIComponent(`/jobs/${jobId}`)}`);
      return;
    }
    if (normalizeRole(session.user.role) !== userRole.USER) {
      handleOpenToast("Only job seekers can apply to jobs.", "error");
      return;
    }
    setSubmitting(true);
    const res = await applyToJob(
      { jobId, coverLetter, resumeName: "resume.pdf" },
      session.user.id,
    );
    setSubmitting(false);
    if (!res.success) {
      handleOpenToast(res.message, "error");
      return;
    }
    setApplied(true);
    setShowApply(false);
    handleOpenToast("Application submitted", "success");
  };

  if (loading) return <LoadingState className="pt-32" />;
  if (error) return <ErrorState description={error} />;
  if (!job) return <EmptyState title="Job not found" description="This listing may have been removed." />;

  return (
    <div className="min-h-screen bg-surface">
      <div className="bg-[linear-gradient(160deg,#243B6B_0%,#191C33_100%)] pt-24 pb-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href={appRoutes.jobs} className="mb-6 inline-flex items-center gap-2 font-ui text-sm text-white/60">
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Jobs
          </Link>
          <div className="flex flex-col items-start gap-5 sm:flex-row">
            <div
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl font-display text-xl text-white"
              style={{ background: `linear-gradient(135deg, ${job.color}, #191C33)` }}
            >
              {job.initials}
            </div>
            <div>
              <h1 className="mb-2 font-display text-3xl tracking-wide text-white lg:text-4xl">{job.title.toUpperCase()}</h1>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href={replacePathParams(appRoutes.employers, { id: job.companyId })}
                  className="font-ui text-base font-semibold text-brand-sky"
                >
                  {job.company}
                </Link>
                <span className="flex items-center gap-1 text-sm text-white/60">
                  <MapPin className="h-3.5 w-3.5" />
                  {job.location}
                </span>
                <span className="rounded-full bg-[rgba(47,91,222,0.2)] px-2.5 py-1 font-ui text-xs text-brand-sky">
                  {job.type}
                </span>
                <span className="font-ui text-sm font-semibold text-white/85">{job.salary}</span>
                <span className="text-xs text-white/45">Posted {job.posted}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="flex flex-col gap-6 lg:col-span-2">
            <Section title="About the Role">
              <p className="text-sm leading-relaxed text-text-support">{job.description}</p>
            </Section>
            <Section title="Responsibilities">
              <ul className="flex flex-col gap-3">
                {job.responsibilities.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-text-support">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[rgba(47,91,222,0.1)]">
                      <Check className="h-2.5 w-2.5 text-brand-royal" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Section>
            <Section title="Requirements">
              <ul className="flex flex-col gap-3">
                {job.requirements.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-text-support">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[rgba(99,102,241,0.1)]">
                      <Check className="h-2.5 w-2.5 text-brand-indigo" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Section>
            <Section title="Benefits & Perks">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {job.benefits.map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-xl border border-[rgba(47,91,222,0.1)] bg-[rgba(47,91,222,0.04)] p-3 text-sm text-brand-navy">
                    <span className="text-brand-royal">✦</span>
                    {item}
                  </div>
                ))}
              </div>
            </Section>
            {showApply ? (
              <Section title="Apply for this role">
                <label className="mb-2 block font-ui text-sm font-semibold text-brand-navy">
                  Cover letter
                </label>
                <textarea
                  value={coverLetter}
                  onChange={(event) => setCoverLetter(event.target.value)}
                  rows={5}
                  className="mb-4 w-full rounded-xl border border-border-default bg-surface px-4 py-3 font-ui text-sm outline-none focus:border-brand-royal"
                  placeholder="Tell the employer why you're a fit"
                />
                <GradientButton onClick={handleApply} disabled={submitting} className="w-full">
                  {submitting ? "Submitting…" : "Submit application"}
                </GradientButton>
              </Section>
            ) : null}
          </div>

          <div className="flex flex-col gap-5">
            <div className="sticky top-24 rounded-2xl border border-border-default bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <div className="mb-5">
                <div className="mb-1 font-display text-2xl text-brand-navy">{job.salary}</div>
                <div className="font-ui text-xs text-text-secondary">{job.type} · {job.location}</div>
              </div>
              {applied ? (
                <div className="mb-3 rounded-xl bg-[rgba(47,91,222,0.08)] py-3.5 text-center font-ui text-sm font-semibold text-brand-royal">
                  Application Submitted
                </div>
              ) : (
                <GradientButton
                  className="mb-3 w-full"
                  onClick={() => {
                    if (!session?.user) {
                      router.push(`${appRoutes.login}?next=${encodeURIComponent(`/jobs/${jobId}`)}`);
                      return;
                    }
                    setShowApply(true);
                  }}
                >
                  Apply Now
                </GradientButton>
              )}
              <button
                type="button"
                onClick={async () => {
                  const next = await toggleSavedJob(job.id, session?.user?.id);
                  setSaved(next.includes(job.id));
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl border py-3 font-ui text-sm font-medium"
                style={{
                  borderColor: saved ? "#2F5BDE" : "#E5E7EB",
                  color: saved ? "#2F5BDE" : "#475569",
                  background: saved ? "rgba(47,91,222,0.05)" : "#FFFFFF",
                }}
              >
                <Bookmark className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
                {saved ? "Saved" : "Save Job"}
              </button>
              <div className="mt-5 border-t border-surface-muted pt-5">
                <div className="mb-3 font-ui text-xs font-semibold text-gray-103">ABOUT THE COMPANY</div>
                <div className="mb-3 flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-display text-sm text-white"
                    style={{ background: `linear-gradient(135deg, ${job.color}, #191C33)` }}
                  >
                    {job.initials}
                  </div>
                  <div>
                    <div className="font-ui text-sm font-semibold text-brand-navy">{job.company}</div>
                    <div className="font-ui text-xs text-text-secondary">{job.companyIndustry}</div>
                  </div>
                </div>
                <p className="mb-3 text-xs leading-relaxed text-text-secondary">{job.companyDesc}</p>
                <div className="flex items-center gap-2 text-xs text-gray-103">
                  <Users className="h-3 w-3" />
                  {job.companySize}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border-default bg-white p-6">
              <div className="mb-4 font-ui text-xs font-semibold text-gray-103">SIMILAR ROLES</div>
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={replacePathParams(appRoutes.jobDetails, { id: item.id })}
                  className="flex items-center justify-between border-b border-surface-muted py-3 text-sm text-brand-navy last:border-0 hover:opacity-70"
                >
                  <div>
                    <div className="font-ui text-sm font-medium">{item.title}</div>
                    <div className="text-xs text-text-secondary">{item.company}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
