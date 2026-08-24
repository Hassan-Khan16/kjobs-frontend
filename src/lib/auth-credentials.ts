import { buildApiUrl } from "@/fetch/fetch";
import { mapApiUser } from "@/helper/user";
import type { KjobsApiEnvelope } from "@/helper/api-response";
import type { AuthLoginApiData } from "@/types/auth";
import { normalizeRole } from "@/helper/auth";

export async function authorizeCredentials(
  loginPath: string,
  email: string,
  password: string,
  expectedRole?: string,
) {
  const res = await fetch(buildApiUrl(loginPath), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
    body: JSON.stringify({ email, password }),
    cache: "no-store",
  });

  const contentType = res.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    throw new Error(
      `Expected JSON from ${buildApiUrl(loginPath)} but got ${contentType || "unknown"} (HTTP ${res.status}).`,
    );
  }

  const body = (await res.json()) as KjobsApiEnvelope<AuthLoginApiData>;

  if (!res.ok || !body.status || !body.data) {
    throw new Error(
      body.message ??
        (typeof body.errors === "string"
          ? body.errors
          : "Authentication failed"),
    );
  }

  const { user, token } = body.data;

  if (expectedRole && normalizeRole(user.role) !== normalizeRole(expectedRole)) {
    throw new Error("These credentials do not match this login page.");
  }

  return {
    user: mapApiUser(user),
    token: { accessToken: token },
  };
}
