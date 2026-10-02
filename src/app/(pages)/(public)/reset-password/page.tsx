"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { handleOpenToast } from "@/helper/toast";
import { appRoutes } from "@/utils/endpoint";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      handleOpenToast("Passwords do not match.", "error");
      return;
    }
    handleOpenToast("Password reset will be available when the API is implemented.", "success");
  };

  return (
    <section className="bg-brand-navy pt-32 pb-24">
      <div className="mx-auto max-w-lg px-4">
        <div className="rounded-3xl border border-white/15 bg-white p-8">
          <h1 className="font-ui text-3xl font-bold text-brand-navy">Reset password</h1>
          <p className="mt-2 text-sm text-text-secondary">Choose a new password for your KJobs account.</p>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="New password"
              className="h-12 w-full rounded-xl border border-border-default bg-surface px-4 text-sm outline-none focus:border-brand-royal"
            />
            <input
              type="password"
              required
              minLength={8}
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Confirm password"
              className="h-12 w-full rounded-xl border border-border-default bg-surface px-4 text-sm outline-none focus:border-brand-royal"
            />
            <button type="submit" className="w-full rounded-xl bg-brand-royal py-3 font-ui text-sm font-semibold text-white">
              Update password
            </button>
          </form>
          <Link href={appRoutes.login} className="mt-6 inline-block font-ui text-sm font-semibold text-brand-royal">
            Back to login
          </Link>
        </div>
      </div>
    </section>
  );
}
