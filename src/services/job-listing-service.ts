import { get, patch, post, put } from "@/fetch/fetch";
import { apiEndpoint, replacePathParams } from "@/utils/endpoint";
import { emptyPaginated } from "@/helper/pagination";
import { API_UNAVAILABLE_MESSAGE } from "@/constants";
import type {
  AdminJobListing,
  AdminJobListingListItem,
  CreateJobListingPayload,
  JobListingListResponse,
  UpdateJobListingPayload,
} from "@/types/job-listing";

type JobListingResource = {
  id: string | number;
  employer_profile_id: string | number;
  title: string;
  description: string;
  location: string;
  job_type: string;
  status: AdminJobListing["status"];
  created_at: string;
  updated_at: string;
  employer_profile: {
    company_name: string;
    user: { name: string };
  };
};

function mapJobListing(raw: JobListingResource): AdminJobListing {
  return {
    id: String(raw.id),
    employerId: String(raw.employer_profile_id),
    title: raw.title,
    employerName: raw.employer_profile.company_name || raw.employer_profile.user.name,
    location: raw.location,
    type: raw.job_type,
    description: raw.description,
    status: raw.status,
    createdAt: raw.created_at,
    updatedAt: raw.updated_at,
  };
}

function buildQuery(params: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}): string {
  const qs = new URLSearchParams();
  qs.set("page", String(params.page ?? 1));
  qs.set("limit", String(params.limit ?? 10));
  if (params.search?.trim()) qs.set("search", params.search.trim());
  if (params.status && params.status !== "all") qs.set("status", params.status);
  return qs.toString();
}

export async function getJobListings(params: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}): Promise<JobListingListResponse> {
  const page = params.page ?? 1;
  const limit = params.limit ?? 10;
  const res = await get<{
    items: JobListingResource[];
    pagination: { page: number; per_page: number; total: number; last_page: number };
  }>(`${apiEndpoint.adminJobListings}?${buildQuery(params)}`);

  if (!res.success) {
    return {
      success: false,
      message: res.message || API_UNAVAILABLE_MESSAGE,
      data: emptyPaginated(page, limit),
    };
  }

  return {
    success: true,
    message: res.message,
    data: {
      items: res.data.items.map((raw) => {
        const job = mapJobListing(raw);
        return {
          id: job.id,
          title: job.title,
          employerName: job.employerName,
          location: job.location,
          status: job.status,
          createdAt: job.createdAt,
        };
      }),
      meta: {
        page: res.data.pagination.page,
        limit: res.data.pagination.per_page,
        total: res.data.pagination.total,
        totalPages: res.data.pagination.last_page,
      },
    },
  };
}

export async function getJobListingById(id: string) {
  const endpoint = replacePathParams(apiEndpoint.adminJobListingById, { id });
  const res = await get<JobListingResource>(endpoint);
  if (!res.success) return res;
  return { ...res, data: mapJobListing(res.data) };
}

export async function createJobListing(payload: CreateJobListingPayload) {
  return post<AdminJobListing, CreateJobListingPayload>(
    apiEndpoint.adminJobListings,
    payload,
  );
}

export async function updateJobListing(
  id: string,
  payload: UpdateJobListingPayload,
) {
  const endpoint = replacePathParams(apiEndpoint.adminJobListingById, { id });
  return put<AdminJobListing, UpdateJobListingPayload>(endpoint, payload);
}

export async function patchJobListingStatus(
  id: string,
  status: "open" | "closed",
) {
  const endpoint = replacePathParams(apiEndpoint.adminJobListingStatus, { id });
  return patch<{ status: string }, AdminJobListing>(endpoint, { status });
}
