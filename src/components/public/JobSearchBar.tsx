"use client";

import { MapPin, Search } from "lucide-react";
import { cn } from "@/lib/utils";

type JobSearchBarProps = {
  search: string;
  location: string;
  onSearchChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onSubmit: () => void;
  variant?: "hero" | "page";
  className?: string;
};

export function JobSearchBar({
  search,
  location,
  onSearchChange,
  onLocationChange,
  onSubmit,
  variant = "hero",
  className,
}: JobSearchBarProps) {
  const isHero = variant === "hero";

  return (
    <div
      className={cn("max-w-3xl rounded-2xl p-2", className)}
      style={{
        background: isHero ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.20)",
        backdropFilter: "blur(16px)",
        boxShadow: isHero ? "0 20px 50px rgba(0,0,0,0.3)" : undefined,
      }}
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
        className="flex flex-col gap-2 sm:flex-row"
      >
        <label className="flex flex-1 items-center gap-3 rounded-xl px-4 py-3" style={{ background: "rgba(255,255,255,0.08)" }}>
          <Search className="h-[18px] w-[18px] text-white/50" />
          <input
            type="text"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search jobs, skills, or keywords"
            className="flex-1 bg-transparent font-ui text-sm text-white outline-none placeholder:text-white/45"
          />
        </label>
        <label className="flex items-center gap-3 rounded-xl px-4 py-3" style={{ background: "rgba(255,255,255,0.08)" }}>
          <MapPin className="h-[18px] w-[18px] text-white/50" />
          <input
            type="text"
            value={location}
            onChange={(event) => onLocationChange(event.target.value)}
            placeholder="Location"
            className="w-36 bg-transparent font-ui text-sm text-white outline-none placeholder:text-white/45"
          />
        </label>
        <button
          type="submit"
          className="rounded-xl bg-[linear-gradient(135deg,#2F5BDE,#243B6B)] px-6 py-3 font-ui text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Search Jobs
        </button>
      </form>
    </div>
  );
}
