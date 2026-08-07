import type { SessionUser } from "./auth";

declare module "next-auth" {
  interface User {
    token?: { accessToken: string; refreshToken?: string };
    user?: SessionUser;
  }

  interface Session {
    user: SessionUser;
    accessToken: string;
    refreshToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: SessionUser;
    accessToken: string;
    refreshToken?: string;
  }
}
