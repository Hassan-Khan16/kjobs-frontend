"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { DashboardHeader } from "@/components/portal/DashboardHeader";
import { handleOpenToast } from "@/helper/toast";

export default function UserProfilePage() {
  const { data: session } = useSession();
  const [name, setName] = useState(session?.user?.name ?? "");
  const [headline, setHeadline] = useState("");
  const [location, setLocation] = useState("");
  const [about, setAbout] = useState("");

  return (
    <div className="max-w-3xl">
      <DashboardHeader title="Profile" description="Keep your job seeker profile ready for applications." />
      <form
        className="space-y-4 rounded-2xl border border-border-default bg-white p-6"
        onSubmit={(event) => {
          event.preventDefault();
          handleOpenToast("Profile saved locally. API update will connect later.", "success");
        }}
      >
        <label className="block">
          <span className="mb-2 block font-ui text-sm font-semibold text-brand-navy">Full name</span>
          <input value={name} onChange={(event) => setName(event.target.value)} className="h-12 w-full rounded-xl border border-border-default bg-surface px-4 text-sm outline-none focus:border-brand-royal" />
        </label>
        <label className="block">
          <span className="mb-2 block font-ui text-sm font-semibold text-brand-navy">Headline</span>
          <input value={headline} onChange={(event) => setHeadline(event.target.value)} placeholder="Frontend developer" className="h-12 w-full rounded-xl border border-border-default bg-surface px-4 text-sm outline-none focus:border-brand-royal" />
        </label>
        <label className="block">
          <span className="mb-2 block font-ui text-sm font-semibold text-brand-navy">Location</span>
          <input value={location} onChange={(event) => setLocation(event.target.value)} className="h-12 w-full rounded-xl border border-border-default bg-surface px-4 text-sm outline-none focus:border-brand-royal" />
        </label>
        <label className="block">
          <span className="mb-2 block font-ui text-sm font-semibold text-brand-navy">About</span>
          <textarea value={about} onChange={(event) => setAbout(event.target.value)} rows={5} className="w-full rounded-xl border border-border-default bg-surface px-4 py-3 text-sm outline-none focus:border-brand-royal" />
        </label>
        <button type="submit" className="rounded-xl bg-brand-royal px-5 py-3 font-ui text-sm font-semibold text-white">
          Save profile
        </button>
      </form>
    </div>
  );
}
