/** KJobs Laravel API envelope */
export type KjobsApiEnvelope<T> = {
  status: boolean;
  message: string;
  data: T | null;
  errors?: unknown;
};

export type ApiResponse<T> =
  | { success: true; message: string; data: T }
  | { success: false; statusCode: number; message: string; error: string };

export function mapKjobsResponse<T>(
  body: KjobsApiEnvelope<T>,
  statusCode: number,
): ApiResponse<T> {
  if (body.status && body.data !== null && body.data !== undefined) {
    return { success: true, message: body.message, data: body.data };
  }
  const errorMsg =
    typeof body.errors === "string"
      ? body.errors
      : body.message || "Request failed";
  return {
    success: false,
    statusCode,
    message: body.message || "Request failed",
    error: errorMsg,
  };
}
