"use client";

import { signOut, useSession } from "next-auth/react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { adminLogout } from "@/services/auth-service";
import { clearTokenCache } from "@/fetch/fetch";

export function AdminNavUser() {
  const { data: session } = useSession();
  const name = session?.user?.name ?? session?.user?.email ?? "Admin";

  const handleLogout = async () => {
    try {
      await adminLogout();
    } catch {
      /* ignore */
    }
    clearTokenCache();
    await signOut({ callbackUrl: "/admin/login" });
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-dark-gray-2 hidden sm:inline">{name}</span>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={handleLogout}
        aria-label="Log out"
      >
        <LogOut className="h-4 w-4" />
      </Button>
    </div>
  );
}
