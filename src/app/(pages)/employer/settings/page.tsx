"use client";

import { FormEvent, useState } from "react";
import { useSession } from "next-auth/react";
import { DashboardHeader } from "@/components/portal/DashboardHeader";
import { handleOpenToast } from "@/helper/toast";

export default function EmployerSettingsPage() {
  const { data: session } = useSession();
  const [email] = useState(session?.user?.email ?? "");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleOpenToast("Company settings will connect when the API is implemented.", "success");
  };

  return (
    <div className="max-w-xl">
      <DashboardHeader title="Company Settings" description="Manage account access and notifications." />
      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-border-default bg-white p-6">
        <label className="block">
          <span className="mb-2 block font-ui text-sm font-semibold text-brand-navy">Account email</span>
          <input value={email} disabled className="h-12 w-full rounded-xl border border-border-default bg-surface px-4 text-sm" />
        </label>
        <label className="block">
          <span className="mb-2 block font-ui text-sm font-semibold text-brand-navy">New password</span>
          <input type="password" minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} className="h-12 w-full rounded-xl border border-border-default bg-surface px-4 text-sm outline-none focus:border-brand-royal" />
        </label>
        <button type="submit" className="rounded-xl bg-brand-royal px-5 py-3 font-ui text-sm font-semibold text-white">
          Save settings
        </button>
      </form>
    </div>
  );
}
