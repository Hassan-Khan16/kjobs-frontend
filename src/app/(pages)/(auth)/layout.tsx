import Logo from "@/components/logo/Logo";
import Link from "next/link";

type AuthLayoutProps = {
  children: React.ReactNode;
  logoHref?: string;
};

export function AuthLayout({
  children,
  logoHref = "/",
}: AuthLayoutProps) {
  return (
    <div className="relative w-full items-center justify-center flex flex-col min-h-dvh px-[12px] lg:px-[35px] bg-secondary">
      <div className="absolute top-[14px] left-[20px] lg:top-[30px] lg:left-[35px] flex self-start z-10">
        <Link href={logoHref}>
          <Logo variant="dark" className="w-[140px] lg:w-[200px] h-auto" />
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center flex-1 w-full py-16">
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
