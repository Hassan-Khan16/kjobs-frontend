import type { PaginatedResult } from "./pagination";

export type UserStatus = "active" | "inactive";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AdminUserListItem {
  id: string;
  name: string;
  email: string;
  role: string;
  status: UserStatus;
  createdAt: string;
}

export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  role: string;
}

export type UpdateUserPayload = {
  name: string;
  email: string;
  role: string;
  password?: string;
};

export type UserListResponse = {
  success: boolean;
  message: string;
  data: PaginatedResult<AdminUserListItem>;
};
