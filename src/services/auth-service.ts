import { get, post } from "@/fetch/fetch";
import { apiEndpoint } from "@/utils/endpoint";
import { mapApiUser } from "@/helper/user";
import type { AdminSessionUser } from "@/types/auth";
import type { ApiUserRaw } from "@/helper/user";

export async function getAdminMe() {
  const res = await get<ApiUserRaw>(apiEndpoint.adminMe);
  if (!res.success) return res;
  return {
    success: true as const,
    message: res.message,
    data: mapApiUser(res.data),
  };
}

export async function adminLogout() {
  return post<null, Record<string, never>>(apiEndpoint.adminLogout, {});
}

export function toSessionUser(user: AdminSessionUser): AdminSessionUser {
  return user;
}
