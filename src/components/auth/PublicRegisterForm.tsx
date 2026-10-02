"use client";

import { FormEvent, useState } from "react";
import { Check } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { AuthRoleSelector, type AccountRole } from "@/components/auth/AuthRoleSelector";
import { publicInputClass, publicLabelClass } from "@/components/public/form-field";
import { registerEmployer, registerUser } from "@/services/auth-service";
import { handleOpenToast } from "@/helper/toast";
import { appRoutes } from "@/utils/endpoint";

export function PublicRegisterForm({ initialRole = "job-seeker" }: { initialRole?: AccountRole }) {
  const router = useRouter();
  const [role, setRole] = useState<AccountRole>(initialRole);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const fullName = `${firstName} ${lastName}`.trim();

    if (role === "employer") {
      const res = await registerEmployer({
        company_name: companyName,
        email,
        contact_person_name: fullName,
        password,
        password_confirmation: password,
      });
      if (!res.success) {
        handleOpenToast(res.message || res.error, "error");
        setLoading(false);
        return;
      }
      const signInRes = await signIn("employer-credentials", { redirect: false, email, password });
      if (!signInRes?.ok) {
        handleOpenToast(signInRes?.error ?? "Account created. Please sign in.", "error");
        router.push(`${appRoutes.login}?role=employer`);
        setLoading(false);
        return;
      }
      handleOpenToast("Account created successfully!", "success");
      router.push(appRoutes.employerDashboard);
      setLoading(false);
      return;
    }

    const res = await registerUser({
      name: fullName,
      email,
      password,
      password_confirmation: password,
    });
    if (!res.success) {
      handleOpenToast(res.message || res.error, "error");
      setLoading(false);
      return;
    }
    const signInRes = await signIn("user-credentials", { redirect: false, email, password });
    if (!signInRes?.ok) {
      handleOpenToast(signInRes?.error ?? "Account created. Please sign in.", "error");
      router.push(appRoutes.login);
      setLoading(false);
      return;
    }
    handleOpenToast("Account created successfully!", "success");
    router.push(appRoutes.userDashboard);
    setLoading(false);
  };

  return (
    <section className="relative overflow-hidden bg-brand-navy pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="absolute bottom-20 -left-20 h-80 w-80 rounded-full bg-brand-indigo/15 blur-3xl" />
      <div className="absolute top-24 -right-20 h-96 w-96 rounded-full bg-brand-sky/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-start gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_560px] lg:px-8">
        <div className="hidden max-w-xl pt-12 lg:block">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-brand-sky/25 bg-brand-royal/15 px-4 py-2 font-ui text-xs font-medium text-brand-sky">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-sky" />
            Join the KJobs network
          </div>
          <h1 className="font-display text-5xl leading-tight tracking-wide text-white">
            BUILD WHAT
            <br />
            COMES <span className="text-brand-sky">NEXT.</span>
          </h1>
          <p className="mt-7 max-w-lg text-lg leading-relaxed text-white/65">
            One platform, two powerful paths. Find work that moves you forward or meet the people who will move your business forward.
          </p>
          <div className="mt-12 space-y-5">
            {[
              "Personalized matches built around your goals",
              "Direct access to verified companies and talent",
              "Simple tools that keep every next step organized",
            ].map((benefit) => (
              <div key={benefit} className="flex items-center gap-3 text-sm text-white/75">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-royal/25 text-brand-sky">
                  <Check className="h-4 w-4" />
                </span>
                {benefit}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/15 bg-white p-6 shadow-[0_28px_80px_rgba(8,14,40,0.35)] sm:p-9">
          <div className="mb-7">
            <p className="mb-2 font-ui text-xs font-semibold tracking-[0.18em] text-brand-royal uppercase">Get started</p>
            <h2 className="font-ui text-3xl font-bold tracking-tight text-brand-navy">Create your account</h2>
            <p className="mt-2 text-sm text-text-secondary">
              Tell us how you&apos;ll use KJobs so we can tailor your experience.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <AuthRoleSelector value={role} onChange={setRole} />
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className={publicLabelClass}>First name</span>
                <input
                  type="text"
                  required
                  autoComplete="given-name"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  placeholder="Alex"
                  className={publicInputClass}
                />
              </label>
              <label className="block">
                <span className={publicLabelClass}>Last name</span>
                <input
                  type="text"
                  required
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  placeholder="Morgan"
                  className={publicInputClass}
                />
              </label>
            </div>
            <label className="block">
              <span className={publicLabelClass}>Email address</span>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={role === "employer" ? "you@company.com" : "you@example.com"}
                className={publicInputClass}
              />
            </label>
            {role === "employer" ? (
              <label className="block">
                <span className={publicLabelClass}>Company name</span>
                <input
                  type="text"
                  required
                  autoComplete="organization"
                  value={companyName}
                  onChange={(event) => setCompanyName(event.target.value)}
                  placeholder="Your company"
                  className={publicInputClass}
                />
              </label>
            ) : null}
            <label className="block">
              <span className={publicLabelClass}>Create password</span>
              <input
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="At least 8 characters"
                className={publicInputClass}
              />
            </label>
            <label className="flex items-start gap-3 text-xs leading-relaxed text-text-secondary">
              <input type="checkbox" required className="mt-0.5 h-4 w-4 accent-brand-royal" />
              <span>I agree to the KJobs Terms of Service and Privacy Policy.</span>
            </label>
            <button
              type="submit"
              disabled={loading}
              className="font-ui flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-royal px-5 text-sm font-semibold text-white shadow-[0_10px_26px_rgba(47,91,222,0.28)] transition hover:bg-brand-navy-2 disabled:opacity-60"
            >
              {loading ? "Creating account…" : `Create ${role === "job-seeker" ? "job seeker" : "employer"} account`}
              {!loading ? (
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                  <path d="M5 12h14m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : null}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-text-secondary">
            Already have an account?{" "}
            <Link href={`${appRoutes.login}?role=${role}`} className="font-ui font-semibold text-brand-royal hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
