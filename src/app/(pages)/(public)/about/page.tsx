import Link from "next/link";
import { Check } from "lucide-react";
import { GradientButton } from "@/components/public/GradientButton";
import { SectionHeading } from "@/components/public/SectionHeading";
import { appRoutes } from "@/utils/endpoint";

export default function AboutPage() {
  return (
    <div className="bg-surface">
      <section className="relative pt-32 pb-24" style={{ background: "linear-gradient(160deg, #243B6B 0%, #191C33 100%)" }}>
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-4 font-ui text-sm font-semibold text-brand-sky">ABOUT KJOBS</p>
          <h1 className="mb-5 font-display text-4xl tracking-wide text-white lg:text-5xl">BUILT FOR THE FUTURE OF WORK.</h1>
          <p className="text-lg leading-relaxed text-white/70">
            KJobs is redefining how people find jobs and how companies find talent. We believe the right opportunity changes everything — for individuals and for organizations.
          </p>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="mb-3 font-ui text-sm font-semibold text-brand-royal">WHAT IS KJOBS?</p>
            <h2 className="mb-6 font-display text-4xl leading-tight text-brand-navy lg:text-5xl">
              THE MODERN JOB MARKETPLACE.
            </h2>
            <p className="mb-5 text-base leading-relaxed text-text-support">
              KJobs is a comprehensive job marketplace that connects ambitious professionals with forward-thinking companies. From first application to final offer, we&apos;ve built every tool you need into a single, seamless platform.
            </p>
            <p className="text-base leading-relaxed text-text-support">
              Whether you&apos;re a developer looking for a remote-first role, a designer seeking a creative challenge, or an HR leader trying to scale your team — KJobs is built for you.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "10K+", label: "Job Seekers", icon: "👤", color: "#2F5BDE" },
              { value: "2K+", label: "Employers", icon: "🏢", color: "#6366F1" },
              { value: "5K+", label: "Active Jobs", icon: "💼", color: "#38BDF8" },
              { value: "98%", label: "Satisfaction", icon: "⭐", color: "#2F5BDE" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-[#E5E7EB] p-6 text-center" style={{ background: "#F8FAFC" }}>
                <div className="mb-2 text-3xl">{stat.icon}</div>
                <div className="mb-1 font-display text-3xl" style={{ color: stat.color }}>{stat.value}</div>
                <div className="font-ui text-xs text-text-secondary">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <SectionHeading
            align="center"
            eyebrow="OUR MISSION"
            title="EQUAL ACCESS TO OPPORTUNITY."
            description="We believe everyone deserves access to meaningful work, and every company deserves access to the talent that drives it forward. Our mission is to remove friction from hiring — and make the right connections happen faster."
            descriptionClassName="text-lg"
          />
          <div className="mt-8 flex justify-center gap-4">
            <div className="h-1 w-16 rounded-full bg-brand-royal" />
            <div className="h-1 w-8 rounded-full bg-brand-sky" />
            <div className="h-1 w-4 rounded-full bg-brand-indigo" />
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="rounded-2xl border border-[#E5E7EB] p-10" style={{ background: "#F8FAFC" }}>
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[rgba(47,91,222,0.1)] text-2xl">
              🔍
            </div>
            <h3 className="mb-4 font-display text-2xl text-brand-navy">FOR JOB SEEKERS</h3>
            <p className="mb-6 text-sm leading-relaxed text-text-support">
              Discover thousands of verified opportunities, build a professional profile, and apply with one click. KJobs gives you real-time application tracking and career insights to stay ahead.
            </p>
            <ul className="mb-8 flex flex-col gap-2">
              {["Curated job listings", "One-click applications", "Application tracking", "Profile builder", "Career resources"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-text-support">
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[rgba(47,91,222,0.15)]">
                    <Check className="h-2 w-2 text-brand-royal" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <GradientButton href={appRoutes.jobs}>Find a Job</GradientButton>
          </div>
          <div className="rounded-2xl bg-brand-navy p-10">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[rgba(56,189,248,0.1)] text-2xl">
              🏢
            </div>
            <h3 className="mb-4 font-display text-2xl text-white">FOR EMPLOYERS</h3>
            <p className="mb-6 text-sm leading-relaxed text-white/65">
              Post your open roles, attract qualified candidates, and manage your entire hiring pipeline from a clean, purpose-built dashboard. KJobs makes scaling your team faster and smarter.
            </p>
            <ul className="mb-8 flex flex-col gap-2">
              {["Unlimited job postings", "Candidate management", "Application pipeline", "Hiring analytics", "Company branding"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-white/70">
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[rgba(56,189,248,0.15)]">
                    <Check className="h-2 w-2 text-brand-sky" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <GradientButton href={appRoutes.contact} variant="glass">Start Hiring</GradientButton>
          </div>
        </div>
      </section>

      <section className="bg-surface py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading align="center" eyebrow="THE TEAM" title="BUILT BY PEOPLE WHO CARE." className="mb-16" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "James Keller", role: "CEO & Co-Founder", initials: "JK", color: "#2F5BDE" },
              { name: "Aisha Tanaka", role: "CTO & Co-Founder", initials: "AT", color: "#6366F1" },
              { name: "Lucas Ferreira", role: "Head of Product", initials: "LF", color: "#38BDF8" },
              { name: "Mira Okonkwo", role: "Head of Design", initials: "MO", color: "#2F5BDE" },
            ].map((member) => (
              <div key={member.name} className="rounded-2xl border border-border-default bg-white p-6 text-center">
                <div
                  className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full font-display text-xl text-white"
                  style={{ background: `linear-gradient(135deg, ${member.color}, #191C33)` }}
                >
                  {member.initials}
                </div>
                <div className="font-ui text-sm font-semibold text-brand-navy">{member.name}</div>
                <div className="font-ui text-xs text-text-secondary">{member.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24" style={{ background: "linear-gradient(135deg, #2F5BDE 0%, #191C33 60%)" }}>
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 font-display text-4xl text-white lg:text-5xl">JOIN THE KJOBS COMMUNITY.</h2>
          <p className="mb-10 text-base text-white/70">
            Whether you&apos;re searching for your next role or scaling your team, KJobs is here to help.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <GradientButton href={appRoutes.jobs} variant="glass">Find Jobs</GradientButton>
            <Link href={appRoutes.contact} className="rounded-xl bg-white px-7 py-3.5 font-ui text-sm font-semibold text-brand-navy">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
