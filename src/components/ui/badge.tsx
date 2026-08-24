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
          "px-4 py-2 text-[14px] font-poppins font-normal bg-(image:--gradient-orange) text-background border-transparent",
        upcoming:
          "px-3 py-1 text-[12px] font-inter font-bold bg-sky-blue-40 text-dark-blue-3 border-none",
        eventType:
          "px-3 py-1 text-[12px] font-inter font-bold bg-light-purple text-purple-20 border-none",
        recommended:
          "rounded-[6px] border-none bg-(image:--gradiant-orange-pink-3) px-2 py-0.5 font-inter text-[11px] font-medium text-background lg:text-[10px]",
        targetAthlete:
          "justify-start rounded-[8px] border-[0.8px] border-gray-107 bg-background px-[7px] py-[2px] font-inter text-[12px] font-medium capitalize text-foreground-10 lg:text-[11px] gap-2 shadow-none [&>svg]:shrink-0 [&>svg]:text-foreground-20",
        pending:
          "text-brown-40 border-yellow-20 bg-white rounded-[8px] px-2 py-1 h-auto",
        approved:
          "text-green-1 border-green-8 bg-white rounded-[8px] px-2 py-1 h-auto",
        rejected:
          "text-orange-100 border-orange-100 bg-orange-100/10 rounded-[8px] px-2 py-1 h-auto",
        fillPublished:
          "border-transparent bg-light-green-3 px-2,5 py-1.5 font-inter text-[12px] font-medium leading-none text-green-10 shadow-none",
        fillDraft:
          "border-transparent bg-yellow-60 px-3 py-1 font-inter text-[12px] font-medium leading-none text-brown-40 shadow-none",
          quize:"rounded-[4px] rounded-[4px] px-[7px] py-[2px] border-none font-inter font-[500] text-[11px] lg:text-[12px]"
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
