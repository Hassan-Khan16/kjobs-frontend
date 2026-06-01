import type { AdminSessionUser } from "./auth";

declare module "next-auth" {
  interface User {
    token?: { accessToken: string; refreshToken?: string };
    user?: AdminSessionUser;
  }

  interface Session {
    user: AdminSessionUser;
    accessToken: string;
    refreshToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: AdminSessionUser;
    accessToken: string;
    refreshToken?: string;
  }
}
