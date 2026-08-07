"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

function Switch({
  className,
  size = "default",
  bgClassName,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: "default" | "small" | "xsmall";
  bgClassName?: string;
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer inline-flex shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-brand-royal disabled:cursor-not-allowed disabled:opacity-50",
        size === "xsmall"
          ? "h-3 w-7 lg:h-3.5 lg:w-9"
          : size === "small"
            ? "h-7 w-13 lg:h-6 lg:w-11"
            : "h-7 w-14 lg:h-6 lg:w-12",
        bgClassName
          ? bgClassName
          : "bg-gray-30 data-[state=checked]:bg-[image:var(--gradiant-dark-blue-2)]",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "bg-white block rounded-full transition-transform shadow-[0px_2px_4px_-2px_#0000001A,0px_4px_6px_-1px_#0000001A]",
          size === "xsmall"
            ? "w-2 h-2 lg:w-3 lg:h-3"
            : size === "small"
              ? "w-5 h-5 lg:w-4.5 lg:h-4.5"
              : "w-5 h-5 lg:w-4.5 lg:h-4.5",
          size === "xsmall"
            ? "data-[state=checked]:translate-x-5.5 data-[state=unchecked]:translate-x-0.25 mb-[0.1px]"
            : size === "small"
              ? "data-[state=checked]:translate-x-[1.4rem] data-[state=unchecked]:translate-x-1"
              : "data-[state=checked]:translate-x-[1.625rem] data-[state=unchecked]:translate-x-1",
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
