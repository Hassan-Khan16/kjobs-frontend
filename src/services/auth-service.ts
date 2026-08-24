import { get, post } from "@/fetch/fetch";
import { apiEndpoint } from "@/utils/endpoint";
import { mapApiUser } from "@/helper/user";
import type {
  AuthLoginApiData,
  AuthMeApiData,
  EmployerRegisterPayload,
  SessionUser,
  UserRegisterPayload,
} from "@/types/auth";
import type { ApiUserRaw } from "@/helper/user";

export async function registerUser(payload: UserRegisterPayload) {
  return post<AuthLoginApiData, UserRegisterPayload>(
    apiEndpoint.userRegister,
    payload,
  );
}

export async function registerEmployer(payload: EmployerRegisterPayload) {
  return post<AuthLoginApiData, EmployerRegisterPayload>(
    apiEndpoint.employerRegister,
    payload,
  );
}

export async function getAuthMe() {
  const res = await get<AuthMeApiData>(apiEndpoint.authMe);
  if (!res.success) return res;
  const raw = res.data;
  const user = mapApiUser({
    id: raw.id,
    name: raw.name,
    email: raw.email,
    role: raw.role,
    is_active: raw.is_active,
  });
  return {
    success: true as const,
    message: res.message,
    data: { ...user, employerProfile: raw.employer_profile },
  };
}

export async function authLogout() {
  return post<null, Record<string, never>>(apiEndpoint.authLogout, {});
}

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

export function toSessionUser(user: SessionUser): SessionUser {
  return user;
}
