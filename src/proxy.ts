import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { userRole } from "@/enum/role";
import { appRoutes } from "@/utils/endpoint";
import {
  getRedirectUrlForRole,
  getLoginUrlForRole,
  isPublicAuthPath,
  normalizeRole,
} from "@/helper/auth";

function isUserAuthPath(pathname: string): boolean {
  return (
    pathname === appRoutes.userLogin || pathname === appRoutes.userRegister
  );
}

function isEmployerAuthPath(pathname: string): boolean {
  return (
    pathname === appRoutes.employerLogin ||
    pathname === appRoutes.employerRegister
  );
}

function isAdminAuthPath(pathname: string): boolean {
  return pathname === appRoutes.adminLogin || pathname === "/forgot-password";
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAuthenticated = Boolean(token?.accessToken);
  const role = normalizeRole(
    (token?.user as { role?: string } | undefined)?.role,
  );

  if (pathname === appRoutes.home) {
    if (isAuthenticated) {
      return NextResponse.redirect(
        new URL(getRedirectUrlForRole(role), request.url),
      );
    }
    return NextResponse.next();
  }

  if (isAuthenticated && isPublicAuthPath(pathname)) {
    return NextResponse.redirect(
      new URL(getRedirectUrlForRole(role), request.url),
    );
  }

  if (pathname.startsWith("/admin")) {
    if (isAdminAuthPath(pathname)) {
      return NextResponse.next();
    }
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL(appRoutes.adminLogin, request.url));
    }
    if (role !== userRole.ADMIN && role !== "admin") {
      return NextResponse.redirect(
        new URL(getRedirectUrlForRole(role), request.url),
      );
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/user")) {
    if (isUserAuthPath(pathname)) {
      return NextResponse.next();
    }
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL(appRoutes.userLogin, request.url));
    }
    if (role !== userRole.USER && role !== "user") {
      return NextResponse.redirect(
        new URL(getLoginUrlForRole(role), request.url),
      );
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/employer")) {
    if (isEmployerAuthPath(pathname)) {
      return NextResponse.next();
    }
    if (!isAuthenticated) {
      return NextResponse.redirect(
        new URL(appRoutes.employerLogin, request.url),
      );
    }
    if (role !== userRole.EMPLOYER && role !== "employer") {
      return NextResponse.redirect(
        new URL(getLoginUrlForRole(role), request.url),
      );
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)"],
};
