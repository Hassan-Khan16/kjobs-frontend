"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Logo from "@/components/logo/Logo";
import { adminSidebarNav } from "@/data/admin-sidebar";
import { cn } from "@/lib/utils";

export function AdminSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar {...props}>
      <SidebarHeader className="border-b border-gray-20 p-4">
        <Logo variant="dark" className="h-[36px]" />
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {adminSidebarNav.map((item) => {
            const active =
              pathname === item.url || pathname.startsWith(`${item.url}/`);
            const Icon = item.icon;
            return (
              <SidebarMenuItem key={item.url}>
                <SidebarMenuButton asChild isActive={active}>
                  <Link
                    href={item.url}
                    className={cn(
                      "flex items-center gap-2",
                      active && "font-semibold",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
