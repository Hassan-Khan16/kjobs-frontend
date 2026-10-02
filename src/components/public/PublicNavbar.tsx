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

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);
  const baseDark = dark && !scrolled && !menuOpen;
  const solid = scrolled || menuOpen;
  const menuTextColor = dark ? "rgba(255,255,255,0.85)" : "#475569";
  const menuDivider = dark ? "rgba(255,255,255,0.1)" : "#E5E7EB";

  return (
    <nav
      className="fixed top-0 right-0 left-0 z-50 transition-all duration-300"
      style={{
        background: baseDark
          ? "transparent"
          : solid && dark
            ? "rgba(25,28,51,0.97)"
            : "rgba(255,255,255,0.97)",
        backdropFilter: solid ? "blur(16px)" : "none",
        borderBottom: solid
          ? dark
            ? "1px solid rgba(255,255,255,0.1)"
            : "1px solid #E5E7EB"
          : "none",
        boxShadow: solid ? "0 4px 24px rgba(0,0,0,0.12)" : "none",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-20">
          <BrandMark variant={dark ? "light" : "dark"} />

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
            className="relative h-10 w-10 rounded-lg md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {[-45, 0, 45].map((rotation, index) => (
              <span
                key={rotation}
                className="absolute left-1/2 block h-0.5 w-6 rounded transition-all duration-200"
                style={{
                  background: dark ? "#FFFFFF" : "#191C33",
                  top: menuOpen ? "50%" : `calc(50% + ${(index - 1) * 7}px)`,
                  transform: menuOpen
                    ? `translateX(-50%) rotate(${rotation}deg)`
                    : "translateX(-50%)",
                  opacity: menuOpen && rotation === 0 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>

        {menuOpen ? (
          <div
            className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t pt-3 pb-5 md:hidden"
            style={{ borderColor: menuDivider }}
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-ui rounded-lg px-4 py-3 text-sm font-medium"
                  style={{
                    color: isActive(link.href) ? "#2F5BDE" : menuTextColor,
                    background: isActive(link.href) ? "rgba(47,91,222,0.1)" : "transparent",
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-3 flex flex-col gap-2 border-t pt-4" style={{ borderColor: menuDivider }}>
                {isAuthenticated ? (
                  <>
                    <Link
                      href={dashboardHref}
                      className="font-ui rounded-lg border px-4 py-3 text-center text-sm font-medium"
                      style={{ color: menuTextColor, borderColor: menuDivider }}
                    >
                      Dashboard
                    </Link>
                    <button
                      type="button"
                      onClick={() => logoutClient(session?.user?.role)}
                      className="font-ui rounded-lg border px-4 py-3 text-center text-sm font-medium"
                      style={{ color: menuTextColor, borderColor: menuDivider }}
                    >
                      Log out
                    </button>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href={appRoutes.login}
                      className="font-ui rounded-lg border px-4 py-3 text-center text-sm font-medium"
                      style={{ color: menuTextColor, borderColor: menuDivider }}
                    >
                      Login
                    </Link>
                    <Link
                      href={appRoutes.register}
                      className="font-ui rounded-lg border px-4 py-3 text-center text-sm font-medium"
                      style={{ color: menuTextColor, borderColor: menuDivider }}
                    >
                      Register
                    </Link>
                  </div>
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
