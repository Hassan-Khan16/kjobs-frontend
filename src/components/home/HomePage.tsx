"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, Star } from "lucide-react";
import { JobCard } from "@/components/public/JobCard";
import { JobSearchBar } from "@/components/public/JobSearchBar";
import { LoadingState } from "@/components/public/LoadingState";
import { GradientButton } from "@/components/public/GradientButton";
import { SectionHeading } from "@/components/public/SectionHeading";
import { getFeaturedJobs } from "@/services/public-job-service";
import type { PublicJob } from "@/types/public-job";
import { appRoutes } from "@/utils/endpoint";

const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "Software Engineer",
    company: "Nexora Labs",
    text: "KJobs made finding my dream role incredibly simple. Within two weeks I had multiple interviews lined up and landed a position 40% above my previous salary. The platform's matching is genuinely impressive.",
    avatar: "SC",
    type: "Job Seeker",
  },
  {
    name: "Marcus Reid",
    role: "Head of Engineering",
    company: "Quantum Systems",
    text: "We've hired 12 engineers through KJobs in the past six months. The quality of candidates is consistently high, and the workflow for managing applications saves our team hours every week.",
    avatar: "MR",
    type: "Employer",
  },
  {
    name: "Priya Nair",
    role: "Talent Acquisition Lead",
    company: "Veriflow Inc.",
    text: "KJobs is the cleanest hiring platform we've used. From posting to offer, the entire process feels modern and professional. Our time-to-hire dropped by 35% after switching.",
    avatar: "PN",
    type: "Hiring Manager",
  },
];

export function HomePage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [jobs, setJobs] = useState<PublicJob[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getFeaturedJobs()
      .then((data) => {
        if (active) setJobs(data);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="overflow-x-hidden">
      <section
        className="relative flex min-h-[100svh] flex-col justify-center pt-20"
        style={{ background: "linear-gradient(160deg, #243B6B 0%, #191C33 100%)" }}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-[700px] w-[700px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, #2F5BDE 0%, transparent 70%)" }} />
          <div className="absolute -left-40 bottom-0 h-[500px] w-[500px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, #38BDF8 0%, transparent 70%)" }} />
        </div>
        <div className="relative mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[rgba(47,91,222,0.3)] bg-[rgba(47,91,222,0.15)] px-4 py-2 font-ui text-xs font-medium text-brand-sky">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
              5,000+ Active Opportunities
            </div>
            <h1 className="mb-4 font-display text-4xl leading-tight tracking-wide text-white sm:text-5xl lg:text-6xl">
              FIND YOUR NEXT <span className="text-brand-sky">OPPORTUNITY.</span>
            </h1>
            <p className="mx-auto mb-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
              Connect with the right opportunities and the right talent. KJobs brings job seekers and employers together in one simple, powerful platform.
            </p>
            <div className="mb-8 flex flex-wrap justify-center gap-3">
              <GradientButton href={appRoutes.jobs} className="px-6 py-3 text-sm">
                Find Jobs <ArrowRight className="h-4 w-4" />
              </GradientButton>
              <GradientButton href={`${appRoutes.register}?role=employer`} variant="outline" className="px-6 py-3 text-sm">
                Post a Job
              </GradientButton>
            </div>
          </div>
          <JobSearchBar
            className="mx-auto"
            search={search}
            location={location}
            onSearchChange={setSearch}
            onLocationChange={setLocation}
            onSubmit={() => {
              const params = new URLSearchParams();
              if (search) params.set("q", search);
              if (location) params.set("location", location);
              router.push(`${appRoutes.jobs}?${params.toString()}`);
            }}
          />
          <div className="mt-3 hidden flex-wrap justify-center gap-3 sm:flex">
            {["Remote", "Full-time", "Engineering", "Design", "Marketing"].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => router.push(`${appRoutes.jobs}?q=${encodeURIComponent(tag)}`)}
                className="font-ui rounded-full border border-white/12 bg-white/8 px-3 py-1.5 text-xs text-white/60"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border-default bg-white py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            { value: "10K+", label: "Job Seekers" },
            { value: "2K+", label: "Trusted Employers" },
            { value: "5K+", label: "Active Jobs" },
            { value: "15K+", label: "Applications Sent" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="mb-2 font-display text-4xl text-brand-royal lg:text-5xl">{stat.value}</div>
              <div className="font-ui text-sm font-medium text-text-secondary">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHeading eyebrow="OPPORTUNITIES" title="FEATURED JOBS" />
            <GradientButton href={appRoutes.jobs} variant="ghost" className="py-2.5">
              View All Jobs <ArrowRight className="h-3.5 w-3.5" />
            </GradientButton>
          </div>
          {loading ? <LoadingState cards={6} /> : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <SectionHeading
              eyebrow="FOR JOB SEEKERS"
              title="YOUR NEXT OPPORTUNITY IS CLOSER THAN YOU THINK."
              description="Thousands of companies are actively looking for talent like you. Create your profile, discover opportunities that match your skills, and apply in seconds."
            />
            <GradientButton href={appRoutes.jobs} className="mt-10">
              Start Your Search <ArrowRight className="h-4 w-4" />
            </GradientButton>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { icon: "🔍", title: "Discover Opportunities", desc: "Browse thousands of curated jobs across industries, locations, and salary ranges.", bg: "rgba(47,91,222,0.08)" },
              { icon: "⚡", title: "Apply Easily", desc: "One-click applications with your saved profile. No more repeating yourself.", bg: "rgba(99,102,241,0.08)" },
              { icon: "📊", title: "Track Applications", desc: "Keep tabs on every application — status updates in real time.", bg: "rgba(56,189,248,0.08)" },
              { icon: "👤", title: "Build Your Profile", desc: "Showcase your skills, experience, and projects to stand out to recruiters.", bg: "rgba(47,91,222,0.08)" },
            ].map((card) => (
              <div key={card.title} className="rounded-2xl border border-[#E5E7EB] p-6" style={{ background: "#F8FAFC" }}>
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl text-xl" style={{ background: card.bg }}>
                  {card.icon}
                </div>
                <h3 className="mb-2 font-ui text-base font-semibold text-brand-navy">{card.title}</h3>
                <p className="text-sm leading-relaxed text-text-secondary">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-brand-navy py-24">
        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <SectionHeading
              light
              eyebrow="FOR EMPLOYERS"
              title="FIND THE PEOPLE WHO MOVE YOUR BUSINESS FORWARD."
              description="Post jobs, discover qualified candidates, manage your hiring pipeline, and build the team that takes your company to the next level — all in one place."
            />
            <div className="mt-8 mb-10 flex flex-col gap-3">
              {[
                "Post unlimited job listings",
                "AI-powered candidate matching",
                "Integrated application management",
                "Real-time hiring analytics",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[rgba(47,91,222,0.3)]">
                    <Check className="h-2.5 w-2.5 text-brand-royal" />
                  </div>
                  <span className="font-ui text-sm text-white/75">{item}</span>
                </div>
              ))}
            </div>
            <GradientButton href={`${appRoutes.register}?role=employer`}>
              Start Hiring <ArrowRight className="h-4 w-4" />
            </GradientButton>
          </div>
          <div className="rounded-2xl border border-white/12 bg-white/4 p-6 backdrop-blur-xl">
            <div className="mb-6 flex items-center justify-between">
              <span className="font-ui text-sm font-semibold text-white">Active Job Listings</span>
              <span className="rounded-full bg-[rgba(47,91,222,0.2)] px-2.5 py-1 font-ui text-xs text-brand-sky">Live</span>
            </div>
            {[
              { title: "Senior Frontend Developer", apps: 24, days: 3 },
              { title: "Product Manager", apps: 38, days: 7 },
              { title: "UX Designer", apps: 15, days: 1 },
            ].map((job) => (
              <div key={job.title} className="mb-3 flex items-center justify-between rounded-xl border border-white/8 bg-white/5 p-4">
                <div>
                  <div className="mb-1 font-ui text-sm font-medium text-white">{job.title}</div>
                  <div className="font-ui text-xs text-white/45">{job.apps} applicants · Posted {job.days}d ago</div>
                </div>
                <span className="rounded-lg bg-[rgba(47,91,222,0.25)] px-3 py-1.5 font-ui text-xs font-medium text-brand-sky">Review</span>
              </div>
            ))}
            <div className="mt-4 flex items-center justify-between border-t border-white/8 pt-4">
              {[
                { value: "77", label: "Total Applicants", color: "#FFFFFF" },
                { value: "12", label: "Shortlisted", color: "#38BDF8" },
                { value: "4", label: "Interviews", color: "#6366F1" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-display text-2xl" style={{ color: stat.color }}>{stat.value}</div>
                  <div className="mt-1 font-ui text-xs text-white/45">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading align="center" eyebrow="PROCESS" title="HOW IT WORKS" className="mb-16" />
          <div className="grid gap-16 lg:grid-cols-2">
            {[
              {
                badge: "JS",
                badgeColor: "#2F5BDE",
                title: "For Job Seekers",
                steps: [
                  { num: "01", title: "Create Your Profile", desc: "Set up your profile with your skills, experience, and what you're looking for." },
                  { num: "02", title: "Find the Right Job", desc: "Search and filter thousands of verified listings across every industry." },
                  { num: "03", title: "Apply & Get Hired", desc: "Apply instantly, track your status, and land the opportunity you deserve." },
                ],
              },
              {
                badge: "ER",
                badgeColor: "#6366F1",
                title: "For Employers",
                steps: [
                  { num: "01", title: "Create Your Company Profile", desc: "Build a compelling company page that attracts top candidates." },
                  { num: "02", title: "Post a Job", desc: "List your open roles with full detail — skills, salary, benefits, and culture." },
                  { num: "03", title: "Find Great Talent", desc: "Review applicants, shortlist candidates, and make your next great hire." },
                ],
              },
            ].map((column) => (
              <div key={column.title}>
                <h3 className="mb-8 flex items-center gap-3 font-ui text-lg font-bold text-brand-navy">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white" style={{ background: column.badgeColor }}>
                    {column.badge}
                  </span>
                  {column.title}
                </h3>
                <div className="flex flex-col gap-6">
                  {column.steps.map((step) => (
                    <div key={step.num} className="flex gap-5">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-display text-lg" style={{ background: `${column.badgeColor}1A`, color: column.badgeColor }}>
                        {step.num}
                      </div>
                      <div>
                        <h4 className="mb-1 font-ui text-base font-semibold text-brand-navy">{step.title}</h4>
                        <p className="text-sm leading-relaxed text-text-secondary">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="center"
            eyebrow="PLATFORM"
            title="EVERYTHING YOU NEED TO MOVE FORWARD."
            description="Built for both sides of the hiring equation. KJobs simplifies every step."
            className="mb-16"
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: "💼", title: "Thousands of Opportunities", desc: "Browse 5,000+ active listings across industries, experience levels, and work arrangements.", color: "#2F5BDE" },
              { icon: "🛡️", title: "Trusted Employers", desc: "Every company is verified. You're applying to real, quality opportunities from legitimate employers.", color: "#6366F1" },
              { icon: "⚡", title: "Simple Applications", desc: "Apply to any job in under 60 seconds using your saved profile. Zero friction.", color: "#38BDF8" },
              { icon: "📊", title: "Application Tracking", desc: "See where you stand at every stage. No more wondering if your application was received.", color: "#2F5BDE" },
              { icon: "🗂️", title: "Easy Job Management", desc: "Employers get a clean dashboard to post, review, and manage jobs in one streamlined view.", color: "#6366F1" },
              { icon: "✨", title: "Professional Profiles", desc: "Stand out with a rich profile that goes beyond a resume — skills, portfolio, and achievements.", color: "#38BDF8" },
            ].map((card) => (
              <div key={card.title} className="rounded-2xl border border-[#E5E7EB] p-7 transition-all duration-300 hover:shadow-lg" style={{ background: "#F8FAFC" }}>
                <div
                  className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl text-2xl"
                  style={{ background: `${card.color}1A` }}
                >
                  {card.icon}
                </div>
                <h3 className="mb-2 font-ui text-base font-semibold text-brand-navy">{card.title}</h3>
                <p className="text-sm leading-relaxed text-text-secondary">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading align="center" eyebrow="SOCIAL PROOF" title="REAL PEOPLE, REAL RESULTS." className="mb-16" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((item) => (
              <div key={item.name} className="flex flex-col rounded-2xl border border-border-default bg-white p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                <div className="mb-5 flex gap-1">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star key={index} className="h-4 w-4 fill-brand-royal text-brand-royal" />
                  ))}
                </div>
                <p className="mb-6 flex-1 text-sm leading-relaxed text-text-support">“{item.text}”</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#2F5BDE,#6366F1)] font-ui text-sm font-bold text-white">
                    {item.avatar}
                  </div>
                  <div>
                    <div className="font-ui text-sm font-semibold text-brand-navy">{item.name}</div>
                    <div className="font-ui text-xs text-text-secondary">{item.role} · {item.company}</div>
                  </div>
                  <span className="ml-auto shrink-0 rounded-full bg-[rgba(47,91,222,0.08)] px-2.5 py-1 font-ui text-xs text-brand-royal">
                    {item.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24" style={{ background: "linear-gradient(135deg, #2F5BDE 0%, #191C33 60%)" }}>
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 font-display text-4xl text-white lg:text-6xl">READY FOR YOUR NEXT OPPORTUNITY?</h2>
          <p className="mb-10 text-lg text-white/75">
            Whether you&apos;re looking for your next career move or your next great hire, KJobs is here to help.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <GradientButton href={appRoutes.jobs} variant="glass">Find a Job</GradientButton>
            <GradientButton href={`${appRoutes.register}?role=employer`} variant="light">Post a Job</GradientButton>
          </div>
        </div>
      </section>
    </div>
  );
}
