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
    items: AdminJobListingListItem[];
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
      items: res.data.items,
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
  return get<AdminJobListing>(endpoint);
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
