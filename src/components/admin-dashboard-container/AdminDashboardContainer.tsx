"use client";

import type { AdminDashboardStats } from "@/types/admin-dashboard";
import { dashboardStatCards } from "@/data/admin-dashboard";

interface Props {
  stats: AdminDashboardStats;
}

export default function AdminDashboardContainer({ stats }: Props) {
  const values: Record<string, number> = {
    totalUsers: stats.totalUsers,
    totalEmployers: stats.totalEmployers,
    totalJobs: stats.totalJobs,
    totalApplications: stats.totalApplications,
  };

  return (
    <div className="flex flex-wrap gap-6 w-full mt-8">
      {dashboardStatCards.map((card) => (
        <div
          key={card.key}
          className="flex-1 min-w-[200px] p-[25px] bg-background border-[0.8px] border-gray-105 rounded-[11px]"
        >
          <h1 className="text-[25px] font-arial text-black-10 mt-1">
            {(values[card.key] ?? 0).toLocaleString()}
          </h1>
          <p className="text-[15px] font-arial text-gray-116">{card.text}</p>
        </div>
      ))}
    </div>
  );
}
