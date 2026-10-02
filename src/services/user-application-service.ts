import { PUBLIC_JOBS } from "@/data/public-jobs";
import { delay, readStore, writeStore } from "@/helper/local-store";
import type { UserApplication } from "@/types/public-job";

const STORAGE_KEY = "kjobs.user-applications";

function key(userId?: string) {
  return userId ? `${STORAGE_KEY}.${userId}` : STORAGE_KEY;
}

export type ApplyJobPayload = {
  jobId: string;
  coverLetter?: string;
  resumeName?: string;
};

export async function listUserApplications(
  userId?: string,
): Promise<UserApplication[]> {
  await delay();
  return readStore<UserApplication[]>(key(userId), []);
}

export async function getUserApplication(
  id: string,
  userId?: string,
): Promise<UserApplication | null> {
  const items = await listUserApplications(userId);
  return items.find((item) => item.id === id) ?? null;
}

export async function applyToJob(
  payload: ApplyJobPayload,
  userId?: string,
): Promise<{ success: boolean; message: string; data?: UserApplication }> {
  await delay();
  const job = PUBLIC_JOBS.find((item) => item.id === payload.jobId);
  if (!job) {
    return { success: false, message: "Job not found" };
  }

  const existing = readStore<UserApplication[]>(key(userId), []);
  if (existing.some((item) => item.jobId === payload.jobId)) {
    return { success: false, message: "You have already applied to this job" };
  }

  const application: UserApplication = {
    id: `app-${Date.now()}`,
    jobId: job.id,
    jobTitle: job.title,
    company: job.company,
    location: job.location,
    status: "pending",
    appliedAt: new Date().toISOString(),
    coverLetter: payload.coverLetter,
    resumeName: payload.resumeName,
  };

  writeStore(key(userId), [application, ...existing]);
  return { success: true, message: "Application submitted", data: application };
}

export async function hasAppliedToJob(
  jobId: string,
  userId?: string,
): Promise<boolean> {
  const items = await listUserApplications(userId);
  return items.some((item) => item.jobId === jobId);
}
