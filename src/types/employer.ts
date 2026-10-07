import type { PaginatedResult } from "./pagination";

export type EmployerStatus = "active" | "inactive";

export interface AdminEmployer {
  id: string;
  user_id: string;
  company_name: string;
  contact_person_name: string;
  phone: string | null;
  company_description: string | null;
  website: string | null;
  logo: string | null;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
  };
  created_at: string;
  updated_at: string;
}

export interface AdminEmployerListItem {
  id: string;
  company_name: string;
  contact_person_name: string;
  email: string;
  phone: string | null;
  status: EmployerStatus;
  created_at: string;
}

export interface CreateEmployerPayload {
  email: string;
  company_name: string;
  contact_person_name: string;
  phone?: string;
  company_description?: string;
  website?: string;
  logo?: string;
}

export type UpdateEmployerPayload = {
  email?: string;
  company_name?: string;
  contact_person_name?: string;
  phone?: string;
  company_description?: string;
  website?: string;
  logo?: string;
};

export type UpdateEmployerPasswordPayload = {
  password: string;
  password_confirmation: string;
};

export type EmployerListResponse = {
  success: boolean;
  message: string;
  data: PaginatedResult<AdminEmployerListItem>;
};
