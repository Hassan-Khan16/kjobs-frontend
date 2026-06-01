import { signOut } from "next-auth/react";
import { post } from "@/fetch/fetch";
import { apiEndpoint } from "@/utils/endpoint";
import { handleOpenToast } from "@/helper/toast";
import { ApiResponse } from "@/types/auth";

export type LogoutClientParams = {
  refreshToken: string;
  unsubscribePush: () => Promise<void>;
  clearAllState: () => void;
  router: { push: (href: string) => void };
};

export async function logoutClient(
  params: LogoutClientParams,
  options?: { showSuccessToast?: boolean },
): Promise<void> {
  const { refreshToken, unsubscribePush, clearAllState, router } = params;
  const response = await post<ApiResponse, { refreshToken: string }>(
    apiEndpoint.logout,
    { refreshToken: refreshToken || "" },
  );
  if (response.success && options?.showSuccessToast) {
    handleOpenToast("logout successful", "success");
  }
  await unsubscribePush();
  clearAllState();
  router.push("/login");
  await signOut({
    redirect: true,
    callbackUrl: "/login",
  });
}
