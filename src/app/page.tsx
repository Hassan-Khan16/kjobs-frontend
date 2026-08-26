import Link from "next/link";
import {
  BriefcaseBusiness,
  Building2,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

import { AuthLayout } from "@/app/(pages)/(auth)/layout";
import { authHeroCardClass } from "@/components/login/Login";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { appRoutes } from "@/utils/endpoint";

const portalCardClass =
  "group flex flex-1 flex-col items-center justify-center rounded-[14px] border border-[0.2px] border-background bg-white-100/80 p-5 text-center transition-all duration-300 hover:border-brand-royal/40 hover:bg-white/10 hover:shadow-[0px_12px_32px_rgba(0,0,0,0.18)]";

type PortalOption = {
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
  iconWrapClass: string;
};

const portals: PortalOption[] = [
  {
    href: appRoutes.userLogin,
    title: "Job Seeker",
    description: "Search opportunities, apply for jobs, and track applications.",
    icon: BriefcaseBusiness,
    iconWrapClass: "bg-brand-royal/20 text-brand-sky",
  },
  {
    href: appRoutes.employerLogin,
    title: "Employer",
    description: "Post vacancies, manage applicants, and hire top talent.",
    icon: Building2,
    iconWrapClass: "bg-brand-sky/15 text-brand-sky",
  },
  {
    href: appRoutes.adminLogin,
    title: "Administrator",
    description: "Manage users, employers, jobs, and platform settings.",
    icon: ShieldCheck,
    iconWrapClass: "bg-brand-indigo/20 text-brand-indigo",
  },
];

export default function HomePage() {
  return (
    <AuthLayout logoHref={appRoutes.home}>
      <div className={cn(authHeroCardClass, "max-w-5xl")}>
        <div className="flex flex-col items-center justify-center mt-0 lg:mt-5 gap-2">
          <Heading variant="h4">Welcome to KJobs</Heading>
          <Text variant="p5" className="mt-2">
            Choose the portal that matches your role to continue.
          </Text>

          <div className="mt-[26px] flex w-full flex-col gap-4 md:flex-row md:items-stretch">
            {portals.map(({ href, title, description, icon: Icon, iconWrapClass }) => (
              <Link key={href} href={href} className={portalCardClass}>
                <div
                  className={cn(
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
                    iconWrapClass,
                  )}
                >
                  <Icon className="h-6 w-6" aria-hidden />
                </div>
                <span className="mt-4 block w-full font-poppins text-[15px] font-medium text-background lg:text-[16px]">
                  {title}
                </span>
                <Text variant="p5" className="mt-1 block w-full text-center lg:text-center">
                  {description}
                </Text>
              </Link>
            ))}
          </div>

          <Text variant="p5" className="mt-6 opacity-80">
            Select your role to securely access your KJobs portal.
          </Text>
        </div>
      </div>
    </AuthLayout>
  );
}
