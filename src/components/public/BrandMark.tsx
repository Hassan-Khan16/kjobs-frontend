import Link from "next/link";
import Logo from "@/components/logo/Logo";
import { cn } from "@/lib/utils";
import { appRoutes } from "@/utils/endpoint";

type BrandMarkProps = {
  href?: string;
  variant?: "light" | "dark";
  className?: string;
};

export function BrandMark({
  href = appRoutes.home,
  variant = "dark",
  className,
}: BrandMarkProps) {
  return (
    <Link href={href} className={cn("inline-flex items-center shrink-0", className)}>
      <Logo variant={variant} className="h-8 w-auto lg:h-10" />
    </Link>
  );
}
