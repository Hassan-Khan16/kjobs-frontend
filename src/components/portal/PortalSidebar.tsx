"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export type PortalNavItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

type PortalSidebarProps = {
  items: PortalNavItem[];
};

export function PortalSidebar({ items }: PortalSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 border-r border-border-default bg-white lg:block">
      <nav className="sticky top-16 flex flex-col gap-1 p-4">
        {items.map((item) => {
          const active =
            item.href === pathname ||
            (item.href !== "/" && pathname.startsWith(`${item.href}/`));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 font-ui text-sm font-medium transition-colors",
                active
                  ? "bg-surface-info text-brand-royal"
                  : "text-text-support hover:bg-surface",
              )}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export function PortalMobileNav({ items }: PortalSidebarProps) {
  const pathname = usePathname();

  return (
    <div className="overflow-x-auto border-b border-border-default bg-white px-4 py-3 lg:hidden">
      <div className="flex min-w-max gap-2">
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-lg px-3 py-2 font-ui text-xs font-semibold whitespace-nowrap",
                active
                  ? "bg-brand-royal text-white"
                  : "bg-surface text-text-support",
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
