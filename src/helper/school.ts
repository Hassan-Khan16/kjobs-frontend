import { AdminSchoolTeacherStatus } from "@/types/admin-school-teacher";

/** API may return `inactive`, `deleted`, etc.; rows keep `inactive` for non-active. */
export function mapApiSchoolStatusToTeacherStatus(
  status: string | null | undefined,
): AdminSchoolTeacherStatus {
  const s = String(status ?? "").toLowerCase();
  if (s === "inactive" || s === "deleted") return "inactive";
  return "active";
}

/** Copy for school list badges / filters (internal value stays `inactive`). */
export function schoolListStatusLabel(
  status: AdminSchoolTeacherStatus,
): "Active" | "Deleted" {
  return status === "active" ? "Active" : "Deleted";
}