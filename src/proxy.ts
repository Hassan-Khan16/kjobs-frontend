import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { userRole } from "@/enum/role";
import { appRoutes } from "@/utils/endpoint";

const AUTH_PATHS = ["/admin/login", "/forgot-password"];

function isAuthPath(pathname: string): boolean {
  return AUTH_PATHS.some((p) => pathname === p);
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAdminRoute = pathname.startsWith("/admin");
  const isAuthenticated = Boolean(token?.accessToken);
  const isAdmin =
    token?.user?.role === userRole.ADMIN ||
    (token?.user as { role?: string } | undefined)?.role === "admin";

  if (isAuthPath(pathname) && isAuthenticated && isAdmin) {
    return NextResponse.redirect(
      new URL(appRoutes.adminDashboard, request.url),
    );
  }

  if (isAdminRoute && !isAuthPath(pathname)) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL(appRoutes.adminLogin, request.url));
    }
    if (!isAdmin) {
      return NextResponse.redirect(new URL(appRoutes.adminLogin, request.url));
    }
  }

  if (pathname === "/") {
    if (isAuthenticated && isAdmin) {
      return NextResponse.redirect(
        new URL(appRoutes.adminDashboard, request.url),
      );
    }
    return NextResponse.redirect(new URL(appRoutes.adminLogin, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)"],
};
