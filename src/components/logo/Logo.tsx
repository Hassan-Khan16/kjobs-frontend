import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const Logo = ({
  className,
  variant = "dark",
}: {
  className?: string;
  variant?: "light" | "dark";
}) => {
  const src =
    variant === "light"
      ? "/images/kjobs-logo-light.svg"
      : "/images/kjobs-logo.svg";

  return (
    <Image
      src={src}
      alt="KJobs"
      width={200}
      height={48}
      className={cn("h-[40px] w-auto", className)}
      priority
    />
  );
};

export default Logo;
