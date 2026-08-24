import { userRole } from "@/enum/role";
import { appRoutes } from "@/utils/endpoint";

export type SessionRole = (typeof userRole)[keyof typeof userRole] | string;

export function normalizeRole(role: string | undefined): string {
  return (role ?? "").toLowerCase();
}

export function getRedirectUrlForRole(role: string | undefined): string {
  switch (normalizeRole(role)) {
    case userRole.ADMIN:
    case "admin":
      return appRoutes.adminDashboard;
    case userRole.EMPLOYER:
    case "employer":
      return appRoutes.employerDashboard;
    case userRole.USER:
    case "user":
      return appRoutes.userDashboard;
    default:
      return appRoutes.home;
  }
}

export function getLoginUrlForRole(role: string | undefined): string {
  switch (normalizeRole(role)) {
    case userRole.ADMIN:
    case "admin":
      return appRoutes.adminLogin;
    case userRole.EMPLOYER:
    case "employer":
      return appRoutes.employerLogin;
    case userRole.USER:
    case "user":
      return appRoutes.userLogin;
    default:
      return appRoutes.home;
  }
}

export const PUBLIC_AUTH_PATHS = [
  appRoutes.adminLogin,
  appRoutes.userLogin,
  appRoutes.userRegister,
  appRoutes.employerLogin,
  appRoutes.employerRegister,
  "/forgot-password",
] as const;

export function isPublicAuthPath(pathname: string): boolean {
  return PUBLIC_AUTH_PATHS.some((p) => pathname === p);
}
