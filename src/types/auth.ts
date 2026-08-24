export interface AdminSessionUser {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
}

export type AdminLoginApiData = {
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
