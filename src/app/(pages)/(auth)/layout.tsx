import Logo from "@/components/logo/Logo";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full items-center justify-center flex flex-col min-h-dvh px-[12px] lg:px-[35px]">
      <div className="absolute top-[14px] left-[20px] lg:top-[30px] lg:left-[35px] flex self-start z-10">
        <Link href="/admin/login">
          <Logo variant="light" className="w-[140px] lg:w-[200px] h-auto" />
        </Link>
      </div>
      {children}
    </div>
  );
}
