"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import Logo from "@/components/logo/Logo";
import { AdminNavUser } from "@/components/admin-sidebar/AdminNavUser";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-(--header-height) bg-background shrink-0 items-center gap-2 border-b border-gray-20">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <div className="flex items-center md:hidden gap-4">
          <SidebarTrigger className="-ml-1" />
          <Logo className="w-[80px]" />
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <AdminNavUser />
        </div>
      </div>
    </header>
  );
}
