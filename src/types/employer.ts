import type { PaginatedResult } from "./pagination";

export type EmployerStatus = "active" | "inactive";

export interface AdminEmployer {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AdminEmployerListItem {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  status: EmployerStatus;
  createdAt: string;
}

export interface CreateEmployerPayload {
  companyName: string;
  contactName: string;
  email: string;
  phone?: string;
  password: string;
}

export type UpdateEmployerPayload = Omit<CreateEmployerPayload, "password"> & {
  password?: string;
};

export type EmployerListResponse = {
  success: boolean;
  message: string;
  data: PaginatedResult<AdminEmployerListItem>;
};
