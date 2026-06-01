import { get, patch, post, put } from "@/fetch/fetch";
import { apiEndpoint, replacePathParams } from "@/utils/endpoint";
import { emptyPaginated } from "@/helper/pagination";
import { API_UNAVAILABLE_MESSAGE } from "@/constants";
import type {
  AdminEmployer,
  AdminEmployerListItem,
  CreateEmployerPayload,
  EmployerListResponse,
  UpdateEmployerPayload,
} from "@/types/employer";

const STUB_MESSAGE = API_UNAVAILABLE_MESSAGE;

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

export async function getEmployers(params: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}): Promise<EmployerListResponse> {
  const page = params.page ?? 1;
  const limit = params.limit ?? 10;
  const res = await get<{
    items: AdminEmployerListItem[];
    pagination: { page: number; per_page: number; total: number; last_page: number };
  }>(`${apiEndpoint.adminEmployers}?${buildQuery(params)}`);

  if (!res.success) {
    return {
      success: false,
      message: res.message || STUB_MESSAGE,
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

export async function getEmployerById(id: string) {
  const endpoint = replacePathParams(apiEndpoint.adminEmployerById, { id });
  return get<AdminEmployer>(endpoint);
}

export async function createEmployer(payload: CreateEmployerPayload) {
  return post<AdminEmployer, CreateEmployerPayload>(
    apiEndpoint.adminEmployers,
    payload,
  );
}

export async function updateEmployer(id: string, payload: UpdateEmployerPayload) {
  const endpoint = replacePathParams(apiEndpoint.adminEmployerById, { id });
  return put<AdminEmployer, UpdateEmployerPayload>(endpoint, payload);
}

export async function patchEmployerStatus(
  id: string,
  status: "active" | "inactive",
) {
  const endpoint = replacePathParams(apiEndpoint.adminEmployerStatus, { id });
  return patch<{ status: string }, AdminEmployer>(endpoint, { status });
}
