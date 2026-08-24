"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { LogOut } from "lucide-react";
import Logo from "@/components/logo/Logo";
import { Button } from "@/components/ui/button";
import { logoutClient } from "@/helper/logout-client";
import { appRoutes } from "@/utils/endpoint";

type PortalHeaderProps = {
  homeHref?: string;
};

export function PortalHeader({ homeHref = appRoutes.home }: PortalHeaderProps) {
  const { data: session } = useSession();
  const name = session?.user?.name ?? session?.user?.email ?? "Account";

  return (
    <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center justify-between gap-4 border-b border-gray-105 bg-background px-4 lg:px-6">
      <Link href={homeHref}>
        <Logo variant="dark" className="h-8 w-auto" />
      </Link>
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground hidden sm:inline">
          {name}
        </span>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => logoutClient(session?.user?.role)}
          aria-label="Log out"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
