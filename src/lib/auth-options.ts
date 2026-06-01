import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { apiEndpoint } from "@/utils/endpoint";
import type { AdminLoginApiData } from "@/types/auth";
import { mapApiUser } from "@/helper/user";
import type { KjobsApiEnvelope } from "@/helper/api-response";
import { buildApiUrl } from "@/fetch/fetch";

type AuthOptionsWithTrustHost = AuthOptions & { trustHost?: boolean };

export const authOptions: AuthOptionsWithTrustHost = {
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
  providers: [
    CredentialsProvider({
      id: "admin-credentials",
      name: "Admin",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        const res = await fetch(buildApiUrl(apiEndpoint.adminLogin), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest",
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
          cache: "no-store",
        });

        const contentType = res.headers.get("content-type") ?? "";
        if (!contentType.includes("application/json")) {
          throw new Error(
            `Expected JSON from ${buildApiUrl(apiEndpoint.adminLogin)} but got ${contentType || "unknown"} (HTTP ${res.status}). Ensure Laravel is running (php artisan serve) and the URL is correct.`,
          );
        }

        const body = (await res.json()) as KjobsApiEnvelope<AdminLoginApiData>;

        if (!res.ok || !body.status || !body.data) {
          throw new Error(
            body.message ??
              (typeof body.errors === "object"
                ? JSON.stringify(body.errors)
                : "Authentication failed"),
          );
        }

        const { user, token } = body.data;
        const mappedUser = mapApiUser(user);

        return {
          user: mappedUser,
          token: { accessToken: token },
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user?.user && user?.token?.accessToken) {
        token.user = user.user;
        token.accessToken = user.token.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.user) session.user = token.user;
      session.accessToken = token.accessToken ?? "";
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
  },
};
