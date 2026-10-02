"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { getSession, signIn } from "next-auth/react";
import { AuthRoleSelector, type AccountRole } from "@/components/auth/AuthRoleSelector";
import {
  publicInnerInputClass,
  publicInputShellClass,
  publicLabelClass,
} from "@/components/public/form-field";
import { handleOpenToast } from "@/helper/toast";
import { normalizeRole } from "@/helper/auth";
import { userRole } from "@/enum/role";
import { appRoutes } from "@/utils/endpoint";

export function PublicLoginForm({ initialRole = "job-seeker" }: { initialRole?: AccountRole }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [role, setRole] = useState<AccountRole>(initialRole);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const providerId = role === "employer" ? "employer-credentials" : "user-credentials";
    const allowedRole = role === "employer" ? userRole.EMPLOYER : userRole.USER;
    const res = await signIn(providerId, { redirect: false, email, password });

    if (res?.ok) {
      const session = await getSession();
      if (normalizeRole(session?.user?.role) !== normalizeRole(allowedRole)) {
        handleOpenToast("This page is for a different account type.", "error");
        setLoading(false);
        return;
      }
      handleOpenToast("Logged in successfully!", "success");
      const next = searchParams.get("next");
      router.push(
        next || (role === "employer" ? appRoutes.employerDashboard : appRoutes.userDashboard),
      );
    } else {
      handleOpenToast(res?.error || "Unable to sign in.", "error");
    }
    setLoading(false);
  };

  return (
    <section className="relative min-h-[760px] overflow-hidden bg-brand-navy pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="absolute top-28 -left-24 h-72 w-72 rounded-full bg-brand-royal/20 blur-3xl" />
      <div className="absolute -right-24 bottom-16 h-80 w-80 rounded-full bg-brand-sky/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_520px] lg:px-8">
        <div className="hidden max-w-xl lg:block">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-brand-sky/25 bg-brand-royal/15 px-4 py-2 font-ui text-xs font-medium text-brand-sky">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-sky" />
            Your next move starts here
          </div>
          <h1 className="font-display text-5xl leading-tight tracking-wide text-white">
            WELCOME BACK
            <br />
            TO <span className="text-brand-sky">KJOBS.</span>
          </h1>
          <p className="mt-7 max-w-lg text-lg leading-relaxed text-white/65">
            Sign in to discover opportunities tailored to you, or continue building the team behind your company&apos;s next chapter.
          </p>
          <div className="mt-12 grid max-w-md grid-cols-3 gap-7 border-t border-white/10 pt-8">
            {[
              ["5K+", "Open roles"],
              ["2K+", "Companies"],
              ["18K+", "Connections"],
            ].map(([number, label]) => (
              <div key={label}>
                <div className="font-ui text-2xl font-bold text-white">{number}</div>
                <div className="mt-1 text-xs text-white/45">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/15 bg-white p-6 shadow-[0_28px_80px_rgba(8,14,40,0.35)] sm:p-9">
          <div className="mb-7">
            <p className="mb-2 font-ui text-xs font-semibold tracking-[0.18em] text-brand-royal uppercase">
              Account access
            </p>
            <h2 className="font-ui text-3xl font-bold tracking-tight text-brand-navy">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-text-secondary">
              Select your role and enter your details to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <AuthRoleSelector value={role} onChange={setRole} />

            <label className="block">
              <span className={publicLabelClass}>Email address</span>
              <span className={publicInputShellClass}>
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-[#64748B]" aria-hidden="true">
                  <path d="m4 7 8 6 8-6M5 19h14a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className={publicInnerInputClass}
                />
              </span>
            </label>

            <label className="block">
              <span className="mb-2 flex items-center justify-between">
                <span className="font-ui text-sm font-semibold text-[#191C33]">Password</span>
                <Link href={appRoutes.forgotPassword} className="font-ui text-xs font-semibold text-brand-royal hover:underline">
                  Forgot password?
                </Link>
              </span>
              <span className={publicInputShellClass}>
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-[#64748B]" aria-hidden="true">
                  <rect x="5" y="10" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.8" />
                </svg>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  className={publicInnerInputClass}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  className="font-ui text-xs font-semibold text-brand-royal"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="font-ui flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-royal px-5 text-sm font-semibold text-white shadow-[0_10px_26px_rgba(47,91,222,0.28)] transition hover:bg-brand-navy-2 disabled:opacity-60"
            >
              {loading ? "Signing in…" : `Sign in as ${role === "job-seeker" ? "job seeker" : "employer"}`}
              {!loading ? (
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                  <path d="M5 12h14m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : null}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-text-secondary">
            New to KJobs?{" "}
            <Link href={`${appRoutes.register}?role=${role}`} className="font-ui font-semibold text-brand-royal hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
