"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Briefcase, MapPin, Search } from "lucide-react";
import { EmptyState } from "@/components/public/EmptyState";
import { ErrorState } from "@/components/public/ErrorState";
import { LoadingState } from "@/components/public/LoadingState";
import { SEEKER_FILTERS } from "@/data/public-seekers";
import { listPublicSeekers } from "@/services/public-seeker-service";
import type { PublicSeeker } from "@/data/public-seekers";
import { appRoutes } from "@/utils/endpoint";

export function JobSeekersPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All talent");
  const [seekers, setSeekers] = useState<PublicSeeker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    listPublicSeekers({ q: query, filter })
      .then((res) => {
        if (!active) return;
        if (!res.success) {
          setError(res.message);
          setSeekers([]);
          return;
        }
        setSeekers(res.data);
      })
      .catch(() => {
        if (active) setError("Unable to load job seekers.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [filter, query, reloadKey]);

  return (
    <div className="min-h-screen bg-surface">
      <section
        className="relative overflow-hidden pt-32 pb-16 text-center"
        style={{ background: "linear-gradient(160deg, #243B6B 0%, #191C33 100%)" }}
      >
        <div className="absolute top-8 -right-28 h-80 w-80 rounded-full bg-brand-royal/20 blur-3xl" />
        <div className="absolute bottom-0 -left-24 h-64 w-64 rounded-full bg-brand-sky/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-sky/25 bg-brand-royal/15 px-4 py-2 font-ui text-xs font-medium text-brand-sky">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-sky" aria-hidden />
            <span>Verified professionals ready for their next role</span>
          </div>
          <h1 className="font-display text-4xl tracking-wide text-white sm:text-5xl">
            FIND YOUR NEXT GREAT HIRE
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
            Discover skilled job seekers, review their expertise, and connect with the people who can make an immediate impact on your team.
          </p>
          <div className="mx-auto mt-8 flex max-w-2xl items-center gap-3 rounded-2xl border border-white/20 bg-white/10 p-2 text-left shadow-[0_18px_45px_rgba(8,14,40,0.25)] backdrop-blur-xl">
            <Search className="ml-3 h-5 w-5 text-white/50" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by role, skill, name, or location"
              className="h-12 min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/45"
            />
            <button
              type="button"
              className="hidden h-12 rounded-xl bg-brand-royal px-6 font-ui text-sm font-semibold text-white transition hover:bg-brand-indigo sm:block"
            >
              Search talent
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 font-ui text-xs font-semibold tracking-[0.16em] text-brand-royal uppercase">
              Talent directory
            </p>
            <h2 className="font-ui text-3xl font-bold text-brand-navy">Professionals ready to connect</h2>
            <p className="mt-2 text-sm text-text-secondary">
              Showing {loading ? "…" : seekers.length} verified job seekers
            </p>
          </div>
          <div className="flex max-w-full gap-2 overflow-x-auto pb-1">
            {SEEKER_FILTERS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className={`shrink-0 rounded-lg border px-4 py-2 font-ui text-xs font-semibold transition ${
                  filter === item
                    ? "border-brand-royal bg-brand-royal text-white"
                    : "border-border-default bg-white text-text-support hover:border-brand-royal/50"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <LoadingState cards={6} />
        ) : null}
        {!loading && error ? (
          <ErrorState description={error} onRetry={() => setReloadKey((key) => key + 1)} />
        ) : null}
        {!loading && !error && seekers.length === 0 ? (
          <EmptyState
            title="No job seekers found"
            description="Try a different role, skill, or location."
            icon={<Search className="h-6 w-6" />}
          />
        ) : null}
        {!loading && !error && seekers.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {seekers.map((seeker) => (
              <article
                key={seeker.id}
                className="group rounded-2xl border border-border-default bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-brand-royal/30 hover:shadow-[0_18px_45px_rgba(25,28,51,0.10)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl font-ui text-base font-bold text-white ${seeker.accent}`}>
                      {seeker.initials}
                    </div>
                    <div>
                      <h3 className="font-ui font-semibold text-brand-navy">{seeker.name}</h3>
                      <p className="mt-1 text-sm font-medium text-brand-royal">{seeker.title}</p>
                    </div>
                  </div>
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-brand-sky ring-4 ring-brand-sky/15" />
                </div>
                <p className="mt-5 text-sm leading-relaxed text-text-secondary">{seeker.summary}</p>
                <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 border-y border-border-default py-4 text-xs text-text-support">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-brand-royal" />
                    {seeker.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Briefcase className="h-4 w-4 text-brand-royal" />
                    {seeker.experience}
                  </span>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {seeker.skills.map((skill) => (
                    <span key={skill} className="rounded-full bg-surface-info px-3 py-1.5 text-xs font-medium text-brand-royal">
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex items-center justify-between gap-4">
                  <span className="text-xs font-medium text-text-secondary">{seeker.availability}</span>
                  <button
                    type="button"
                    onClick={() => router.push(`${appRoutes.login}?role=employer`)}
                    className="rounded-lg bg-[rgba(47,91,222,0.08)] px-4 py-2 font-ui text-xs font-semibold text-brand-royal transition-colors hover:bg-[rgba(47,91,222,0.18)]"
                  >
                    View profile
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : null}
      </section>
    </div>
  );
}
