"use client";

import { AdminSidebar } from "@/components/admin-sidebar/AdminSidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";
  const isFormPage =
    pathname.endsWith("/create") || pathname.endsWith("/edit");

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "256px",
          "--header-height": "64px",
        } as React.CSSProperties
      }
    >
      <AdminSidebar variant="sidebar" />
      <SidebarInset className="overflow-hidden">
        <SiteHeader />
        <div
          className={cn(
            "min-h-0 flex-1 min-w-0 w-full overflow-x-hidden overflow-y-auto bg-secondary",
            !isFormPage && "p-4 lg:p-6",
          )}
        >
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
