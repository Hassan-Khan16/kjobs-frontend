import Link from "next/link";
import { Button } from "@/components/ui/button";

export const adminHeaderActionButtonClassName =
  "h-10 shrink-0 rounded-md border-0 bg-[#191c33] px-3 text-sm font-medium text-white shadow-none hover:bg-[#191c33]/90";

type AdminHeaderActionButtonProps = {
  href: string;
  children: React.ReactNode;
};

export function AdminHeaderActionButton({
  href,
  children,
}: AdminHeaderActionButtonProps) {
  return (
    <Button asChild size="sm" className={adminHeaderActionButtonClassName}>
      <Link href={href}>{children}</Link>
    </Button>
  );
}
