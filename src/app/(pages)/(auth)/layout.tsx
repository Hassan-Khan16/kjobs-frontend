import Logo from "@/components/logo/Logo";
import { AuthHeroBackground } from "@/components/login/Login";
import Link from "next/link";
import { ChevronLeftIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { appRoutes } from "@/utils/endpoint";

type AuthLayoutProps = Readonly<{
  children: React.ReactNode;
  logoHref?: string;
  backHref?: string;
  backLabel?: string;
}>;

const authBackLinkClass =
  "inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-[13px] font-poppins font-medium text-white backdrop-blur-md shadow-sm transition-all hover:bg-white/15 hover:border-white/25 active:scale-[0.98]";

export function AuthLayout({
  children,
  logoHref = appRoutes.home,
  backHref,
  backLabel = "Back",
}: AuthLayoutProps) {
  return (
    <div className="relative w-full items-center justify-center flex flex-col min-h-dvh px-[12px] lg:px-[35px] bg-brand-navy overflow-hidden">
      <AuthHeroBackground />
      <header className="absolute inset-x-0 top-0 z-10 px-5 pt-5 lg:px-[35px] lg:pt-[30px]">
        <div className="flex items-center gap-6">
          {backHref && (
            <Link href={backHref} className={authBackLinkClass}>
              <ChevronLeftIcon className="h-4 w-4 shrink-0" aria-hidden />
              <span>{backLabel}</span>
            </Link>
          )}

          <Link href={logoHref}>
            <Logo
              variant="light"
              className="w-[140px] lg:w-[180px] h-auto"
            />
          </Link>
        </div>
      </header>
      <div
  className={cn(
    "relative z-[1] flex flex-1 w-full items-center justify-center py-12",
    backHref ? "pt-24 lg:pt-28" : "pt-20 lg:pt-24",
  )}
>
  {children}
</div>
    </div>
  );
}

/** Passthrough so pages opt into AuthLayout once (same as admin login). */
export default function AuthRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
