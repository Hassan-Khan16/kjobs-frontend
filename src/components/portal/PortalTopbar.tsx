"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { LogOut } from "lucide-react";
import { BrandMark } from "@/components/public/BrandMark";
import { logoutClient } from "@/helper/logout-client";
import { appRoutes } from "@/utils/endpoint";

export function PortalTopbar({ homeHref }: { homeHref: string }) {
  const { data: session } = useSession();
  const name = session?.user?.name ?? session?.user?.email ?? "Account";

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border-default bg-white px-4 lg:px-6">
      <BrandMark href={homeHref} />
      <div className="flex items-center gap-3">
        <Link href={appRoutes.jobs} className="hidden font-ui text-sm font-medium text-text-support sm:inline">
          Browse jobs
        </Link>
        <span className="hidden text-sm text-text-secondary sm:inline">{name}</span>
        <button
          type="button"
          onClick={() => logoutClient(session?.user?.role)}
          className="rounded-lg p-2 text-text-secondary hover:bg-surface"
          aria-label="Log out"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
