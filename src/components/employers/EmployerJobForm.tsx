"use client";

import { FormEvent, useState } from "react";
import type { EmployerJobPayload, JobType } from "@/types/public-job";

const TYPES: JobType[] = ["Full-time", "Part-time", "Contract", "Hybrid", "Remote"];

type EmployerJobFormProps = {
  initial?: EmployerJobPayload;
  submitLabel: string;
  onSubmit: (payload: EmployerJobPayload) => Promise<void>;
};

export function EmployerJobForm({ initial, submitLabel, onSubmit }: EmployerJobFormProps) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [location, setLocation] = useState(initial?.location ?? "");
  const [type, setType] = useState<JobType>(initial?.type ?? "Full-time");
  const [salary, setSalary] = useState(initial?.salary ?? "");
  const [experienceLevel, setExperienceLevel] = useState(initial?.experienceLevel ?? "Mid");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    await onSubmit({ title, location, type, salary, experienceLevel, description });
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-border-default bg-white p-6">
      <label className="block">
        <span className="mb-2 block font-ui text-sm font-semibold text-brand-navy">Job title</span>
        <input required value={title} onChange={(event) => setTitle(event.target.value)} className="h-12 w-full rounded-xl border border-border-default bg-surface px-4 text-sm outline-none focus:border-brand-royal" />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block font-ui text-sm font-semibold text-brand-navy">Location</span>
          <input required value={location} onChange={(event) => setLocation(event.target.value)} className="h-12 w-full rounded-xl border border-border-default bg-surface px-4 text-sm outline-none focus:border-brand-royal" />
        </label>
        <label className="block">
          <span className="mb-2 block font-ui text-sm font-semibold text-brand-navy">Employment type</span>
          <select value={type} onChange={(event) => setType(event.target.value as JobType)} className="h-12 w-full rounded-xl border border-border-default bg-surface px-4 text-sm outline-none focus:border-brand-royal">
            {TYPES.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block font-ui text-sm font-semibold text-brand-navy">Salary</span>
          <input required value={salary} onChange={(event) => setSalary(event.target.value)} className="h-12 w-full rounded-xl border border-border-default bg-surface px-4 text-sm outline-none focus:border-brand-royal" />
        </label>
        <label className="block">
          <span className="mb-2 block font-ui text-sm font-semibold text-brand-navy">Experience</span>
          <input required value={experienceLevel} onChange={(event) => setExperienceLevel(event.target.value)} className="h-12 w-full rounded-xl border border-border-default bg-surface px-4 text-sm outline-none focus:border-brand-royal" />
        </label>
      </div>
      <label className="block">
        <span className="mb-2 block font-ui text-sm font-semibold text-brand-navy">Description</span>
        <textarea required rows={6} value={description} onChange={(event) => setDescription(event.target.value)} className="w-full rounded-xl border border-border-default bg-surface px-4 py-3 text-sm outline-none focus:border-brand-royal" />
      </label>
      <button type="submit" disabled={loading} className="rounded-xl bg-brand-royal px-5 py-3 font-ui text-sm font-semibold text-white disabled:opacity-60">
        {loading ? "Saving…" : submitLabel}
      </button>
    </form>
  );
}
