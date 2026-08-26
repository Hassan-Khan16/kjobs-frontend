import type { AdminUser } from "@/types/user";
import dayjs from "dayjs";

export type ApiUserRaw = {
  id: string | number;
  name: string;
  email: string;
  role: string;
  is_active?: boolean;
  isActive?: boolean;
  created_at?: string;
  updated_at?: string;
  createdAt?: string;
  updatedAt?: string;
};

/** Display label for API role slugs (e.g. `admin` → `Admin`). */
export function formatUserRole(role: string): string {
  const normalized = role.trim().toLowerCase();
  if (!normalized) return "—";
  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}



export function mapApiUser(raw: ApiUserRaw): AdminUser {
  return {
    id: String(raw.id),
    name: raw.name,
    email: raw.email,
    role: raw.role,
    isActive: raw.is_active ?? raw.isActive ?? true,
    createdAt: dayjs(raw.created_at ?? raw.createdAt ?? "").format("DD/MM/YYYY HH:mm:ss"),
    updatedAt: dayjs(raw.updated_at ?? raw.updatedAt ?? "").format("DD/MM/YYYY HH:mm:ss"),
  };
}
