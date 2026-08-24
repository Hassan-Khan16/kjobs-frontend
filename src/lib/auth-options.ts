import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { apiEndpoint } from "@/utils/endpoint";
import { authorizeCredentials } from "@/lib/auth-credentials";
import { userRole } from "@/enum/role";

type AuthOptionsWithTrustHost = AuthOptions & { trustHost?: boolean };

const credentialsFields = {
  email: { label: "Email", type: "email" },
  password: { label: "Password", type: "password" },
};

export const authOptions: AuthOptionsWithTrustHost = {
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
  providers: [
    CredentialsProvider({
      id: "admin-credentials",
      name: "Admin",
      credentials: credentialsFields,
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }
        return authorizeCredentials(
          apiEndpoint.adminLogin,
          credentials.email,
          credentials.password,
          userRole.ADMIN,
        );
      },
    }),
    CredentialsProvider({
      id: "user-credentials",
      name: "User",
      credentials: credentialsFields,
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }
        return authorizeCredentials(
          apiEndpoint.userLogin,
          credentials.email,
          credentials.password,
          userRole.USER,
        );
      },
    }),
    CredentialsProvider({
      id: "employer-credentials",
      name: "Employer",
      credentials: credentialsFields,
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }
        return authorizeCredentials(
          apiEndpoint.employerLogin,
          credentials.email,
          credentials.password,
          userRole.EMPLOYER,
        );
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
