import Link from "next/link";
import { AuthLayout } from "@/app/(pages)/(auth)/layout";
import { AuthHeroBackground, authHeroCardClass } from "@/components/login/Login";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { appRoutes } from "@/utils/endpoint";

const portalLinkClass =
  "flex flex-1 flex-col items-center justify-center w-full rounded-[14px] border border-[0.2px] border-background bg-white-100/80 p-5 text-center transition-opacity hover:opacity-90";

export default function HomePage() {
  return (
    <AuthLayout logoHref={appRoutes.home}>
      <AuthHeroBackground />
      <div className={authHeroCardClass}>
        <div className="mt-0 lg:mt-5">
          <Heading variant="h4">Welcome to KJobs</Heading>
          <Text variant="p5" className="mt-1">
            Job portal for candidates, employers, and administrators.
          </Text>
          <div className="mt-[26px] flex flex-col md:flex-row gap-4 w-full items-stretch">
            <Link href={appRoutes.userLogin} className={portalLinkClass}>
              <span className="block w-full text-center font-poppins text-[15px] lg:text-[17px] text-background font-medium">
                Job Seeker
              </span>
              <Text variant="p5" className="mt-1 block w-full text-center lg:text-center">
                Browse jobs and apply
              </Text>
            </Link>
            <Link href={appRoutes.employerLogin} className={portalLinkClass}>
              <span className="block w-full text-center font-poppins text-[15px] lg:text-[17px] text-background font-medium">
                Employer
              </span>
              <Text variant="p5" className="mt-1 block w-full text-center lg:text-center">
                Post jobs and hire
              </Text>
            </Link>
            <Link href={appRoutes.adminLogin} className={portalLinkClass}>
              <span className="block w-full text-center font-poppins text-[15px] lg:text-[17px] text-background font-medium">
                Admin
              </span>
              <Text variant="p5" className="mt-1 block w-full text-center lg:text-center">
                Manage the platform
              </Text>
            </Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
