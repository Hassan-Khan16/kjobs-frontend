import { get } from "@/fetch/fetch";
import { apiEndpoint } from "@/utils/endpoint";
import type {
  AdminDashboardStats,
  DashboardRecentApplication,
  DashboardRecentJob,
} from "@/types/admin-dashboard";

const EMPTY_STATS: AdminDashboardStats = {
  totalUsers: 0,
  totalEmployers: 0,
  totalJobs: 0,
  totalApplications: 0,
};

export async function getAdminDashboardStats() {
  const res = await get<AdminDashboardStats>(apiEndpoint.adminDashboardStats);
  if (!res.success) {
    return { success: false as const, message: res.message, data: EMPTY_STATS };
  }
  return { success: true as const, message: res.message, data: res.data };
}

export async function getAdminRecentJobs() {
  const res = await get<DashboardRecentJob[]>(
    apiEndpoint.adminDashboardRecentJobs,
  );
  if (!res.success) {
    return { success: false as const, message: res.message, data: [] };
  }
  return { success: true as const, message: res.message, data: res.data };
}

export async function getAdminRecentApplications() {
  const res = await get<DashboardRecentApplication[]>(
    apiEndpoint.adminDashboardRecentApplications,
  );
  if (!res.success) {
    return { success: false as const, message: res.message, data: [] };
  }
  return { success: true as const, message: res.message, data: res.data };
}
