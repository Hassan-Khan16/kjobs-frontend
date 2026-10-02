import { PUBLIC_EMPLOYERS, PUBLIC_JOBS } from "@/data/public-jobs";
import { delay } from "@/helper/local-store";
import { emptyPaginated } from "@/helper/pagination";
import type { PaginatedResult } from "@/types/pagination";
import type {
  PublicEmployer,
  PublicJob,
  PublicJobFilters,
} from "@/types/public-job";

export type PublicListResult<T> = {
  success: boolean;
  message: string;
  data: PaginatedResult<T>;
};

export async function listPublicJobs(
  filters: PublicJobFilters = {},
): Promise<PublicListResult<PublicJob>> {
  await delay();
  const page = filters.page ?? 1;
  const limit = filters.limit ?? 9;
  const q = filters.q?.trim().toLowerCase() ?? "";
  const location = filters.location?.trim().toLowerCase() ?? "";
  const category = filters.category && filters.category !== "All" ? filters.category : "";
  const type = filters.type && filters.type !== "All Types" ? filters.type : "";

  const items = PUBLIC_JOBS.filter((job) => {
    const matchesQ =
      !q ||
      job.title.toLowerCase().includes(q) ||
      job.company.toLowerCase().includes(q) ||
      job.category.toLowerCase().includes(q);
    const matchesLocation = !location || job.location.toLowerCase().includes(location);
    const matchesCategory = !category || job.category === category;
    const matchesType = !type || job.type === type;
    return matchesQ && matchesLocation && matchesCategory && matchesType;
  });

  const start = (page - 1) * limit;
  return {
    success: true,
    message: "Jobs loaded",
    data: {
      items: items.slice(start, start + limit),
      meta: {
        page,
        limit,
        total: items.length,
        totalPages: Math.max(1, Math.ceil(items.length / limit)),
      },
    },
  };
}

export async function getPublicJobById(id: string): Promise<{
  success: boolean;
  message: string;
  data: PublicJob | null;
}> {
  await delay();
  const job = PUBLIC_JOBS.find((item) => item.id === id) ?? null;
  return {
    success: Boolean(job),
    message: job ? "Job loaded" : "Job not found",
    data: job,
  };
}

export async function getRelatedJobs(jobId: string, limit = 2): Promise<PublicJob[]> {
  await delay(150);
  const current = PUBLIC_JOBS.find((item) => item.id === jobId);
  return PUBLIC_JOBS.filter(
    (item) => item.id !== jobId && (!current || item.category === current.category),
  ).slice(0, limit);
}

export async function getFeaturedJobs(limit = 6): Promise<PublicJob[]> {
  await delay(200);
  return PUBLIC_JOBS.slice(0, limit);
}

export async function getPublicEmployerById(id: string): Promise<{
  success: boolean;
  message: string;
  data: PublicEmployer | null;
  jobs: PublicJob[];
}> {
  await delay();
  const employer = PUBLIC_EMPLOYERS.find((item) => item.id === id) ?? null;
  return {
    success: Boolean(employer),
    message: employer ? "Employer loaded" : "Employer not found",
    data: employer,
    jobs: PUBLIC_JOBS.filter((job) => job.companyId === id),
  };
}

export function emptyJobList(page = 1, limit = 9): PublicListResult<PublicJob> {
  return {
    success: false,
    message: "Unable to load jobs",
    data: emptyPaginated(page, limit),
  };
}
