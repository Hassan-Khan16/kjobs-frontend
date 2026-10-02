import { PUBLIC_JOBS } from "@/data/public-jobs";
import { delay, readStore, writeStore } from "@/helper/local-store";
import type { PublicJob } from "@/types/public-job";

const STORAGE_KEY = "kjobs.saved-jobs";

function storageKey(userId?: string) {
  return userId ? `${STORAGE_KEY}.${userId}` : STORAGE_KEY;
}

export async function getSavedJobIds(userId?: string): Promise<string[]> {
  await delay(120);
  return readStore<string[]>(storageKey(userId), []);
}

export async function toggleSavedJob(
  jobId: string,
  userId?: string,
): Promise<string[]> {
  const current = readStore<string[]>(storageKey(userId), []);
  const next = current.includes(jobId)
    ? current.filter((id) => id !== jobId)
    : [...current, jobId];
  writeStore(storageKey(userId), next);
  await delay(120);
  return next;
}

export async function getSavedJobs(userId?: string): Promise<PublicJob[]> {
  const ids = await getSavedJobIds(userId);
  return PUBLIC_JOBS.filter((job) => ids.includes(job.id));
}
