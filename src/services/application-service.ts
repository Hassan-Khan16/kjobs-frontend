import { get, patch } from "@/fetch/fetch";
import { apiEndpoint, replacePathParams } from "@/utils/endpoint";
import { emptyPaginated } from "@/helper/pagination";
import { API_UNAVAILABLE_MESSAGE } from "@/constants";
import type {
  AdminApplication,
  AdminApplicationListItem,
  ApplicationListResponse,
  ApplicationStatus,
} from "@/types/application";

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

export async function getApplications(params: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}): Promise<ApplicationListResponse> {
  const page = params.page ?? 1;
  const limit = params.limit ?? 10;
  const res = await get<{
    items: AdminApplicationListItem[];
    pagination: { page: number; per_page: number; total: number; last_page: number };
  }>(`${apiEndpoint.adminApplications}?${buildQuery(params)}`);

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

export async function getApplicationById(id: string) {
  const endpoint = replacePathParams(apiEndpoint.adminApplicationById, { id });
  return get<AdminApplication>(endpoint);
}

export async function patchApplicationStatus(
  id: string,
  status: ApplicationStatus,
) {
  const endpoint = replacePathParams(apiEndpoint.adminApplicationStatus, { id });
  return patch<{ status: ApplicationStatus }, AdminApplication>(endpoint, {
    status,
  });
}
