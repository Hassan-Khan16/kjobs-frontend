import { apiEndpoint } from "@/utils/endpoint";
import { getSession } from "next-auth/react";
import {
  mapKjobsResponse,
  type ApiResponse,
  type KjobsApiEnvelope,
} from "@/helper/api-response";

export type { ApiResponse };

let cachedToken: string | null = null;
let tokenPromise: Promise<string | null> | null = null;

export async function getToken(): Promise<string | null> {
  if (typeof window === "undefined") {
    const [{ getServerSession }, { authOptions }] = await Promise.all([
      import("next-auth"),
      import("@/lib/auth-options"),
    ]);
    const session = await getServerSession(authOptions);
    return session?.accessToken ?? null;
  }

  if (cachedToken) return cachedToken;
  if (tokenPromise) return tokenPromise;

  tokenPromise = getSession().then((session) => {
    cachedToken = session?.accessToken ?? null;
    tokenPromise = null;
    return cachedToken;
  });

  return tokenPromise;
}

export function clearTokenCache(): void {
  cachedToken = null;
  tokenPromise = null;
}

async function getDefaultHeaders(
  extra: Record<string, string> = {},
): Promise<Record<string, string>> {
  const token = await getToken();
  return {
    ...(token && { Authorization: `Bearer ${token}` }),
    Accept: "application/json",
    ...extra,
  };
}

/** Base API origin without trailing slash, e.g. http://127.0.0.1:8000 */
export function getBackendOrigin(): string {
  const raw = process.env.NEXT_PUBLIC_BACKEND_URL ?? "";
  return raw.replace(/\/+$/, "");
}

export function buildApiUrl(endpoint: string): string {
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return `${getBackendOrigin()}${apiEndpoint.prefix}${path}`;
}

async function parseResponse<T>(response: Response): Promise<ApiResponse<T>> {
  const statusCode = response.status;
  let body: KjobsApiEnvelope<T>;
  try {
    body = (await response.json()) as KjobsApiEnvelope<T>;
  } catch {
    return {
      success: false,
      statusCode,
      message: response.statusText || "Request failed",
      error: "Invalid JSON response",
    };
  }
  if (!response.ok && body.status !== true) {
    return mapKjobsResponse(body, statusCode);
  }
  if (!response.ok) {
    return {
      success: false,
      statusCode,
      message: body.message || response.statusText,
      error:
        typeof body.errors === "string"
          ? body.errors
          : body.message || "Request failed",
    };
  }
  return mapKjobsResponse(body, statusCode);
}

export async function get<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<ApiResponse<T>> {
  try {
    const headers = await getDefaultHeaders();
    const response = await fetch(buildApiUrl(endpoint), {
      ...options,
      method: "GET",
      headers: { ...headers, ...(options?.headers as Record<string, string>) },
      cache: options?.cache ?? "no-store",
    });
    return parseResponse<T>(response);
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message: "Internal server error",
      error: (error as Error).message,
    };
  }
}

export async function post<TResponse, TBody>(
  endpoint: string,
  body: TBody,
  options?: RequestInit,
): Promise<ApiResponse<TResponse>> {
  try {
    const headers = await getDefaultHeaders({
      "Content-Type": "application/json",
    });
    const response = await fetch(buildApiUrl(endpoint), {
      ...options,
      method: "POST",
      headers: { ...headers, ...(options?.headers as Record<string, string>) },
      body: JSON.stringify(body),
    });
    return parseResponse<TResponse>(response);
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message: "Internal server error",
      error: (error as Error).message,
    };
  }
}

export async function put<TResponse, TBody>(
  endpoint: string,
  body: TBody,
): Promise<ApiResponse<TResponse>> {
  try {
    const headers = await getDefaultHeaders({
      "Content-Type": "application/json",
    });
    const response = await fetch(buildApiUrl(endpoint), {
      method: "PUT",
      headers,
      body: JSON.stringify(body),
    });
    return parseResponse<TResponse>(response);
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message: "Internal server error",
      error: (error as Error).message,
    };
  }
}

export async function patch<TBody, TResponse>(
  endpoint: string,
  body: TBody,
): Promise<ApiResponse<TResponse>> {
  try {
    const headers = await getDefaultHeaders({
      "Content-Type": "application/json",
    });
    const response = await fetch(buildApiUrl(endpoint), {
      method: "PATCH",
      headers,
      body: JSON.stringify(body),
    });
    return parseResponse<TResponse>(response);
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message: "Internal server error",
      error: (error as Error).message,
    };
  }
}

export async function del<T>(endpoint: string): Promise<ApiResponse<T>> {
  try {
    const headers = await getDefaultHeaders();
    const response = await fetch(buildApiUrl(endpoint), {
      method: "DELETE",
      headers,
    });
    if (response.status === 204) {
      return { success: true, message: "", data: undefined as T };
    }
    return parseResponse<T>(response);
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message: "Internal server error",
      error: (error as Error).message,
    };
  }
}
