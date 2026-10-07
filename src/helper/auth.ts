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
    case userRole.JOB_SEEKER:
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
      return `${appRoutes.login}?role=employer`;
    case userRole.JOB_SEEKER:
      return `${appRoutes.login}?role=job-seeker`;
    default:
      return appRoutes.home;
  }
}

export const PUBLIC_AUTH_PATHS = [
  appRoutes.adminLogin,
  appRoutes.login,
  appRoutes.register,
  appRoutes.userLogin,
  appRoutes.userRegister,
  appRoutes.employerLogin,
  appRoutes.employerRegister,
  appRoutes.forgotPassword,
  appRoutes.resetPassword,
] as const;

export function isPublicAuthPath(pathname: string): boolean {
  return PUBLIC_AUTH_PATHS.some((p) => pathname === p);
}
