import { get, patch, post, put, del } from "@/fetch/fetch";
import { apiEndpoint, replacePathParams } from "@/utils/endpoint";
import { emptyPaginated, mapPagination } from "@/helper/pagination";
import type { KjobsPaginatedPayload } from "@/types/pagination";
import type {
  AdminEmployer,
  AdminEmployerListItem,
  CreateEmployerPayload,
  UpdateEmployerPayload,
  UpdateEmployerPasswordPayload,
  EmployerListResponse,
} from "@/types/employer";

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
  if (params.status && params.status !== "all") {
    qs.set("status", params.status);
  }
  return qs.toString();
}

function toListItem(employer: AdminEmployer): AdminEmployerListItem {
  return {
    id: employer.id,
    company_name: employer.company_name,
    contact_person_name: employer.contact_person_name,
    email: employer.user.email,
    phone: employer.phone,
    status: employer.user.is_active ? "active" : "inactive",
    created_at: employer.created_at,
  };
}

export async function getEmployers(params: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}): Promise<EmployerListResponse> {
  const page = params.page ?? 1;
  const limit = params.limit ?? 10;
  const res = await get<KjobsPaginatedPayload<AdminEmployer>>(
    `${apiEndpoint.adminEmployers}?${buildQuery(params)}`
  );

  if (!res.success) {
    return {
      success: false,
      message: res.message,
      data: emptyPaginated(page, limit),
    };
  }

  const items = res.data.items.map((raw) => toListItem(raw));
  return {
    success: true,
    message: res.message,
    data: {
      items,
      meta: mapPagination(res.data.pagination),
    },
  };
}

export async function getEmployer(id: string) {
  const endpoint = replacePathParams(apiEndpoint.adminEmployerById, { id });
  const res = await get<AdminEmployer>(endpoint);
  if (!res.success) return res;
  return { success: true as const, message: res.message, data: res.data };
}

export async function createEmployer(payload: CreateEmployerPayload) {
  const res = await post<AdminEmployer, CreateEmployerPayload>(apiEndpoint.adminEmployers, payload);
  if (!res.success) return res;
  return { success: true as const, message: res.message, data: res.data };
}

export async function updateEmployer(id: string, payload: UpdateEmployerPayload) {
  const endpoint = replacePathParams(apiEndpoint.adminEmployerById, { id });
  const res = await put<AdminEmployer, UpdateEmployerPayload>(endpoint, payload);
  if (!res.success) return res;
  return { success: true as const, message: res.message, data: res.data };
}

export async function updateEmployerPassword(
  id: string,
  payload: UpdateEmployerPasswordPayload,
) {
  const endpoint = replacePathParams(apiEndpoint.adminEmployerPassword, { id });
  return patch<UpdateEmployerPasswordPayload, null>(endpoint, payload);
}

export async function deleteEmployer(id: string) {
  const endpoint = replacePathParams(apiEndpoint.adminEmployerById, { id });
  return del(endpoint);
}

export async function patchEmployerStatus(id: string, isActive: boolean) {
  const endpoint = replacePathParams(apiEndpoint.adminEmployerStatus, { id });
  const res = await patch<{ is_active: boolean }, AdminEmployer>(endpoint, { is_active: isActive });
  if (!res.success) return res;
  return { success: true as const, message: res.message, data: res.data };
}
