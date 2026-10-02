"use client";

import {
  BriefcaseBusiness,
  Building2,
  FileText,
  LayoutDashboard,
  Settings,
} from "lucide-react";
import { PortalMobileNav, PortalSidebar } from "@/components/portal/PortalSidebar";
import { PortalTopbar } from "@/components/portal/PortalTopbar";
import { appRoutes } from "@/utils/endpoint";

const items = [
  { href: appRoutes.employerDashboard, label: "Dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
  { href: appRoutes.employerProfile, label: "Company Profile", icon: <Building2 className="h-4 w-4" /> },
  { href: appRoutes.employerJobs, label: "My Jobs", icon: <BriefcaseBusiness className="h-4 w-4" /> },
  { href: appRoutes.employerApplications, label: "Applications", icon: <FileText className="h-4 w-4" /> },
  { href: appRoutes.employerSettings, label: "Settings", icon: <Settings className="h-4 w-4" /> },
];

export default function EmployerPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col bg-surface">
      <PortalTopbar homeHref={appRoutes.employerDashboard} />
      <PortalMobileNav items={items} />
      <div className="flex flex-1">
        <PortalSidebar items={items} />
        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
