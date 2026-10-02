"use client";

import {
  Bell,
  Bookmark,
  FileText,
  LayoutDashboard,
  Settings,
  UserRound,
} from "lucide-react";
import { PortalMobileNav, PortalSidebar } from "@/components/portal/PortalSidebar";
import { PortalTopbar } from "@/components/portal/PortalTopbar";
import { appRoutes } from "@/utils/endpoint";

const items = [
  { href: appRoutes.userDashboard, label: "Dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
  { href: appRoutes.userProfile, label: "Profile", icon: <UserRound className="h-4 w-4" /> },
  { href: appRoutes.userApplications, label: "Applications", icon: <FileText className="h-4 w-4" /> },
  { href: appRoutes.userSavedJobs, label: "Saved Jobs", icon: <Bookmark className="h-4 w-4" /> },
  { href: appRoutes.userNotifications, label: "Notifications", icon: <Bell className="h-4 w-4" /> },
  { href: appRoutes.userSettings, label: "Settings", icon: <Settings className="h-4 w-4" /> },
];

export default function UserPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col bg-surface">
      <PortalTopbar homeHref={appRoutes.userDashboard} />
      <PortalMobileNav items={items} />
      <div className="flex flex-1">
        <PortalSidebar items={items} />
        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
