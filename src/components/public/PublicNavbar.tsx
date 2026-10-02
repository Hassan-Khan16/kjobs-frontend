"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { BrandMark } from "@/components/public/BrandMark";
import { logoutClient } from "@/helper/logout-client";
import { normalizeRole } from "@/helper/auth";
import { userRole } from "@/enum/role";
import { appRoutes } from "@/utils/endpoint";

const navLinks = [
  { label: "Home", href: appRoutes.home },
  { label: "Jobs", href: appRoutes.jobs },
  { label: "Job Seekers", href: appRoutes.jobSeekers },
  { label: "About", href: appRoutes.about },
  { label: "Contact", href: appRoutes.contact },
];

export function PublicNavbar({ dark = false }: { dark?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  const role = normalizeRole(session?.user?.role);
  const isAuthenticated = Boolean(session?.user);
  const dashboardHref =
    role === userRole.EMPLOYER
      ? appRoutes.employerDashboard
      : role === userRole.ADMIN
        ? appRoutes.adminDashboard
        : appRoutes.userDashboard;
  const postJobHref = isAuthenticated
    ? role === userRole.EMPLOYER
      ? appRoutes.employerJobCreate
      : appRoutes.register
    : `${appRoutes.register}?role=employer`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);
  const baseDark = dark && !scrolled;

  return (
    <nav
      className="fixed top-0 right-0 left-0 z-50 transition-all duration-300"
      style={{
        background: baseDark
          ? "transparent"
          : scrolled && dark
            ? "rgba(25,28,51,0.97)"
            : "rgba(255,255,255,0.97)",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled
          ? dark
            ? "1px solid rgba(255,255,255,0.1)"
            : "1px solid #E5E7EB"
          : "none",
        boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.12)" : "none",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-20">
          <BrandMark variant={baseDark || (scrolled && dark) ? "light" : "dark"} />

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-ui text-sm font-medium transition-colors duration-200"
                style={{
                  color: isActive(link.href)
                    ? "#2F5BDE"
                    : baseDark
                      ? "rgba(255,255,255,0.85)"
                      : "#475569",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            {isAuthenticated ? (
              <>
                <Link
                  href={dashboardHref}
                  className="font-ui px-4 py-2 text-sm font-medium"
                  style={{ color: baseDark ? "rgba(255,255,255,0.85)" : "#475569" }}
                >
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={() => logoutClient(session?.user?.role)}
                  className="font-ui px-4 py-2 text-sm font-medium"
                  style={{ color: baseDark ? "rgba(255,255,255,0.85)" : "#475569" }}
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link
                  href={appRoutes.login}
                  className="font-ui px-4 py-2 text-sm font-medium"
                  style={{ color: baseDark ? "rgba(255,255,255,0.85)" : "#475569" }}
                >
                  Login
                </Link>
                <Link
                  href={appRoutes.register}
                  className="font-ui px-4 py-2 text-sm font-medium"
                  style={{ color: baseDark ? "rgba(255,255,255,0.85)" : "#475569" }}
                >
                  Register
                </Link>
              </>
            )}
            <Link
              href={postJobHref}
              className="font-ui rounded-lg bg-[linear-gradient(135deg,#2F5BDE,#243B6B)] px-5 py-2 text-sm font-medium text-white"
            >
              Post a Job
            </Link>
          </div>

          <button
            type="button"
            className="rounded-lg p-2 md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-1.5">
              {[0, 1, 2].map((item) => (
                <span
                  key={item}
                  className="block h-0.5 w-6 rounded"
                  style={{ background: baseDark ? "#FFFFFF" : "#191C33" }}
                />
              ))}
            </div>
          </button>
        </div>

        {menuOpen ? (
          <div className="border-t border-white/10 py-4 md:hidden">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-ui rounded-lg px-4 py-3 text-sm font-medium"
                  style={{
                    color: isActive(link.href)
                      ? "#2F5BDE"
                      : baseDark
                        ? "rgba(255,255,255,0.85)"
                        : "#475569",
                    background: isActive(link.href) ? "rgba(47,91,222,0.1)" : "transparent",
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-3 flex flex-col gap-2 border-t border-white/10 pt-3">
                {isAuthenticated ? (
                  <>
                    <Link href={dashboardHref} className="font-ui px-4 py-3 text-center text-sm font-medium text-text-support">
                      Dashboard
                    </Link>
                    <button
                      type="button"
                      onClick={() => logoutClient(session?.user?.role)}
                      className="font-ui px-4 py-3 text-center text-sm font-medium text-text-support"
                    >
                      Log out
                    </button>
                  </>
                ) : (
                  <>
                    <Link href={appRoutes.login} className="font-ui px-4 py-3 text-center text-sm font-medium text-text-support">
                      Login
                    </Link>
                    <Link href={appRoutes.register} className="font-ui px-4 py-3 text-center text-sm font-medium text-text-support">
                      Register
                    </Link>
                  </>
                )}
                <Link
                  href={postJobHref}
                  className="font-ui rounded-lg bg-[linear-gradient(135deg,#2F5BDE,#243B6B)] px-4 py-3 text-center text-sm font-medium text-white"
                >
                  Post a Job
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </nav>
  );
}
