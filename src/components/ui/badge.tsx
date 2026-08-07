import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        selectable:
          "px-4 py-2 text-[14px] font-poppins font-normal bg-gray-102 text-foreground-10 border-gray-20 hover:border-gray-30",
        selectableActive:
          "px-4 py-2 text-[14px] font-poppins font-normal bg-(image:--gradient-brand-horizontal) text-primary-foreground border-transparent",
        upcoming:
          "px-3 py-1 text-[12px] font-inter font-bold bg-sky-blue-40 text-dark-blue-3 border-none",
        eventType:
          "px-3 py-1 text-[12px] font-inter font-bold bg-indigo-10 text-indigo-20 border-none",
        recommended:
          "rounded-[6px] border-none bg-(image:--gradient-blue-indigo) px-2 py-0.5 font-inter text-[11px] font-medium text-primary-foreground lg:text-[10px]",
        targetAthlete:
          "justify-start rounded-[8px] border-[0.8px] border-gray-107 bg-background px-[7px] py-[2px] font-inter text-[12px] font-medium capitalize text-foreground-10 lg:text-[11px] gap-2 shadow-none [&>svg]:shrink-0 [&>svg]:text-foreground-20",
        pending:
          "text-dark-blue-5 border-sky-blue-10 bg-white rounded-[8px] px-2 py-1 h-auto",
        approved:
          "text-brand-royal border-sky-blue-40 bg-white rounded-[8px] px-2 py-1 h-auto",
        rejected:
          "text-navy-20 border-navy-10 bg-navy-10 rounded-[8px] px-2 py-1 h-auto",
        fillPublished:
          "border-transparent bg-sky-blue-20 px-2.5 py-1.5 font-inter text-[12px] font-medium leading-none text-brand-royal shadow-none",
        fillDraft:
          "border-transparent bg-gray-102 px-3 py-1 font-inter text-[12px] font-medium leading-none text-dark-gray shadow-none",
        quize:
          "rounded-[4px] px-[7px] py-[2px] border-none font-inter font-medium text-[11px] lg:text-[12px]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
