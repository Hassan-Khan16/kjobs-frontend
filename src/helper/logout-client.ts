import { signOut } from "next-auth/react";
import { clearTokenCache } from "@/fetch/fetch";
import { authLogout, adminLogout } from "@/services/auth-service";
import { useStore } from "@/store";
import { userRole } from "@/enum/role";
import { appRoutes } from "@/utils/endpoint";
import { normalizeRole } from "@/helper/auth";

function getLogoutCallbackUrl(role: string | undefined): string {
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

export async function logoutClient(role?: string): Promise<void> {
  const normalized = normalizeRole(role);

  try {
    if (normalized === userRole.ADMIN || normalized === "admin") {
      await adminLogout();
    } else if (isAuthenticatedRole(normalized)) {
      await authLogout();
    }
  } catch {
    // Proceed with client sign-out even if API logout fails
  }

  clearTokenCache();
  useStore.getState().clearAuth();

  await signOut({
    callbackUrl: getLogoutCallbackUrl(role),
  });
}

function isAuthenticatedRole(role: string): boolean {
  return (
    role === userRole.USER ||
    role === "user" ||
    role === userRole.EMPLOYER ||
    role === "employer"
  );
}
