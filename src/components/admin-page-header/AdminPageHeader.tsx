"use client";

import { cn } from "@/lib/utils";

type AdminPageHeaderProps = {
  title: string;
  subtitle: string;
  titleClassName?: string;
  action?: React.ReactNode;
};

export default function AdminPageHeader({
  title,
  subtitle,
  titleClassName,
  action,
}: AdminPageHeaderProps) {
  const heading = (
    <div>
      <h1
        className={cn(
          "font-arial font-[400] lg:text-[25px] text-[20px] text-black-10 mt-1",
          titleClassName,
        )}
      >
        {title}
      </h1>
      <p className="font-arial font-[400] lg:text-[17px] text-[15px] leading-5 text-dark-gray-2">
        {subtitle}
      </p>
    </div>
  );

  if (!action) {
    return heading;
  }

  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
      {heading}
      {action}
    </div>
  );
}
