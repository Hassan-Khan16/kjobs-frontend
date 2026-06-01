import {
  Briefcase,
  FileText,
  LayoutDashboard,
  Building2,
  Users,
  type LucideIcon,
} from "lucide-react";

export type AdminSidebarNavItem = {
  title: string;
  url: string;
  icon: LucideIcon;
};

export const adminSidebarNav: AdminSidebarNavItem[] = [
  { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
  { title: "Users", url: "/admin/users", icon: Users },
  { title: "Employers", url: "/admin/employers", icon: Building2 },
  { title: "Job Listings", url: "/admin/job-listings", icon: Briefcase },
  { title: "Applications", url: "/admin/applications", icon: FileText },
];
