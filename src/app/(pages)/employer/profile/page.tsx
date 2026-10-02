"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { DashboardHeader } from "@/components/portal/DashboardHeader";
import { handleOpenToast } from "@/helper/toast";

export default function EmployerProfilePage() {
  const { data: session } = useSession();
  const [companyName, setCompanyName] = useState(session?.user?.name ?? "");
  const [industry, setIndustry] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="max-w-3xl">
      <DashboardHeader title="Company Profile" description="This is how candidates see your company." />
      <form
        className="space-y-4 rounded-2xl border border-border-default bg-white p-6"
        onSubmit={(event) => {
          event.preventDefault();
          handleOpenToast("Company profile saved locally. API update will connect later.", "success");
        }}
      >
        <label className="block">
          <span className="mb-2 block font-ui text-sm font-semibold text-brand-navy">Company name</span>
          <input value={companyName} onChange={(event) => setCompanyName(event.target.value)} className="h-12 w-full rounded-xl border border-border-default bg-surface px-4 text-sm outline-none focus:border-brand-royal" />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block font-ui text-sm font-semibold text-brand-navy">Industry</span>
            <input value={industry} onChange={(event) => setIndustry(event.target.value)} className="h-12 w-full rounded-xl border border-border-default bg-surface px-4 text-sm outline-none focus:border-brand-royal" />
          </label>
          <label className="block">
            <span className="mb-2 block font-ui text-sm font-semibold text-brand-navy">Location</span>
            <input value={location} onChange={(event) => setLocation(event.target.value)} className="h-12 w-full rounded-xl border border-border-default bg-surface px-4 text-sm outline-none focus:border-brand-royal" />
          </label>
        </div>
        <label className="block">
          <span className="mb-2 block font-ui text-sm font-semibold text-brand-navy">Website</span>
          <input value={website} onChange={(event) => setWebsite(event.target.value)} className="h-12 w-full rounded-xl border border-border-default bg-surface px-4 text-sm outline-none focus:border-brand-royal" />
        </label>
        <label className="block">
          <span className="mb-2 block font-ui text-sm font-semibold text-brand-navy">About the company</span>
          <textarea value={description} onChange={(event) => setDescription(event.target.value)} rows={5} className="w-full rounded-xl border border-border-default bg-surface px-4 py-3 text-sm outline-none focus:border-brand-royal" />
        </label>
        <button type="submit" className="rounded-xl bg-brand-royal px-5 py-3 font-ui text-sm font-semibold text-white">
          Save company
        </button>
      </form>
    </div>
  );
}
