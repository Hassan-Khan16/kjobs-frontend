export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
}

/** @deprecated Use SessionUser */
export type AdminSessionUser = SessionUser;

export type AuthLoginApiData = {
  user: {
    id: string | number;
    name: string;
    email: string;
    role: string;
    is_active?: boolean;
  };
  token: string;
  token_type?: string;
};

export type AdminLoginApiData = AuthLoginApiData;

export type UserRegisterPayload = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type EmployerRegisterPayload = {
  company_name: string;
  email: string;
  contact_person_name: string;
  phone?: string;
  password: string;
  password_confirmation: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type EmployerProfileApi = {
  id: number;
  company_name: string;
  contact_person_name?: string;
  phone?: string;
  company_description?: string;
  website?: string;
  logo?: string;
};

export type AuthMeApiData = {
  id: string | number;
  name: string;
  email: string;
  role: string;
  is_active?: boolean;
  employer_profile?: EmployerProfileApi;
};
