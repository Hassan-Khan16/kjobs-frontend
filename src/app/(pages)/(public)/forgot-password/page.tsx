"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { handleOpenToast } from "@/helper/toast";
import { appRoutes } from "@/utils/endpoint";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    handleOpenToast("If an account exists, a reset link will be sent when the API is ready.", "success");
  };

  return (
    <section className="bg-brand-navy pt-32 pb-24">
      <div className="mx-auto max-w-lg px-4">
        <div className="rounded-3xl border border-white/15 bg-white p-8 shadow-[0_28px_80px_rgba(8,14,40,0.35)]">
          <p className="mb-2 font-ui text-xs font-semibold tracking-[0.18em] text-brand-royal uppercase">Account</p>
          <h1 className="font-ui text-3xl font-bold text-brand-navy">Forgot password</h1>
          <p className="mt-2 text-sm text-text-secondary">
            Enter your email and we&apos;ll send reset instructions when password reset is available.
          </p>
          {submitted ? (
            <p className="mt-6 text-sm text-brand-royal">Check your inbox for the next step.</p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="h-12 w-full rounded-xl border border-border-default bg-surface px-4 text-sm outline-none focus:border-brand-royal"
              />
              <button type="submit" className="w-full rounded-xl bg-brand-royal py-3 font-ui text-sm font-semibold text-white">
                Send reset link
              </button>
            </form>
          )}
          <Link href={appRoutes.login} className="mt-6 inline-block font-ui text-sm font-semibold text-brand-royal">
            Back to login
          </Link>
        </div>
      </div>
    </section>
  );
}
