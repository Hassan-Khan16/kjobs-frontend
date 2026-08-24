import { get, patch, post, put } from "@/fetch/fetch";
import { apiEndpoint, replacePathParams } from "@/utils/endpoint";
import { emptyPaginated, mapPagination } from "@/helper/pagination";
import { mapApiUser, type ApiUserRaw } from "@/helper/user";
import type { KjobsPaginatedPayload } from "@/types/pagination";
import type {
  AdminUser,
  AdminUserListItem,
  CreateUserPayload,
  UpdateUserPayload,
  UserListResponse,
} from "@/types/user";

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

function toListItem(user: AdminUser): AdminUserListItem {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.isActive ? "active" : "inactive",
    createdAt: user.createdAt,
  };
}

export async function getUsers(params: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}): Promise<UserListResponse> {
  const page = params.page ?? 1;
  const limit = params.limit ?? 10;
  const res = await get<KjobsPaginatedPayload<ApiUserRaw>>(
    `${apiEndpoint.adminUsers}?${buildQuery(params)}`,
  );

  if (!res.success) {
    return {
      success: false,
      message: res.message,
      data: emptyPaginated(page, limit),
    };
  }

  const items = res.data.items.map((raw) => toListItem(mapApiUser(raw)));
  return {
    success: true,
    message: res.message,
    data: {
      items,
      meta: mapPagination(res.data.pagination),
    },
  };
}

export async function getUserById(id: string) {
  const endpoint = replacePathParams(apiEndpoint.adminUserById, { id });
  const res = await get<ApiUserRaw>(endpoint);
  if (!res.success) return res;
  return { success: true as const, message: res.message, data: mapApiUser(res.data) };
}

export async function createUser(payload: CreateUserPayload) {
  return post<ApiUserRaw, CreateUserPayload>(apiEndpoint.adminUsers, payload);
}

export async function updateUser(id: string, payload: UpdateUserPayload) {
  const endpoint = replacePathParams(apiEndpoint.adminUserById, { id });
  return put<ApiUserRaw, UpdateUserPayload>(endpoint, payload);
}

export async function patchUserStatus(id: string, status: "active" | "inactive") {
  const endpoint = replacePathParams(apiEndpoint.adminUserStatus, { id });
  return patch<{ status: string }, AdminUser>(endpoint, { status });
}
