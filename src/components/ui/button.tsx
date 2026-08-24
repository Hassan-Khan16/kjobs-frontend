"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center  whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-dark-pink text-white ",
        outline:
          "border border-gray-118 bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",

        gradient:
          "bg-[image:var(--gradiant-orange-yellow-2)]  text-white hover:from-primary/90 hover:to-secondary/90",

        gradientCurved:
          "w-full text-background xs:h-12 lg:h-[51px] bg-[image:var(--gradiant-orange-yellow-2)] lg:bg-[image:var(--gradient-orange)] lg:rounded-[14px] rounded-[10px]   text-[15px]  lg:text-[17px] font-poppin font-[400] border-0 cursor-pointer",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        sportCard:
          "bg-background border-2 hover:bg-orange-light border-gray-20 hover:border-orange-dark",
        sportCardActive:
          "font-semibold border-2 bg-orange-light border-orange-dark text-gray-60",
        iconEdit:
          "rounded-full bg-pink-70/15 text-pink-70 hover:bg-pink-70/25 focus-visible:ring-pink-70/30",
        iconDelete:
          "rounded-full bg-orange-100/15 text-orange-100 hover:bg-orange-100/25 focus-visible:ring-orange-100/30",
        tableActioButton:
          "p-2 rounded-lg transition text-gray-500 hover:bg-gray-100 hover:text-gray-900",

        profileEdit:
          "rounded-[8px] border-[1.6px] h-[33px] lg:h-[34px] border-dark-pink px-[13px] lg:px-[10px] bg-background gap-4",
        cancelBtn:
          "rounded-[8px] border-[1.6px] h-[35px] lg:h-[35px] border-gray-107 px-[12px] sm:px-[15px] lg:px-[12px] bg-background",
        mealPlanPrimary:
          "rounded-[10px] border-0 bg-dark-pink text-white shadow-none hover:bg-dark-pink/90 focus-visible:ring-dark-pink/30",
        mealRequestPrimary:
          "w-full h-10 bg-(image:--gradient-orange-7) hover:opacity-90 disabled:opacity-50 transition-opacity rounded-[8px] text-[12px] leading-4 font-medium text-white gap-4",
        mealBtn:
          "rounded-[8px] bg-[image:var(--gradiant-orange-pink-3)] flex items-center justify-center",
        mealBtnOutline:
          " rounded-[8px] border-[0.8px] border-gray-107 bg-background flex items-center justify-center",
        restore:
          "rounded-[10px] border-0 bg-dark-pink text-white shadow-none hover:bg-dark-pink/90 focus-visible:ring-dark-pink/30",
        curriculumPortalCta:
          "w-full lg:h-11 h-10 rounded-lg border-0 bg-[image:var(--gradient-orange-gold)] text-sm font-medium leading-5 text-background shadow-none hover:opacity-95",
        uploadBtn:
          "bg-pink-80 border-[0.8px] border  rounded-[10px] border-gray-118 text-background cursor-pointer",
        quizBtn: "rounded-[10px] h-9 font-inter text-[14px] font-[500] "
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-xs": "size-7",
        "icon-lg": "size-10",
        sportCard: "w-[107px] h-[107px]",
        arrivalTimeCard: "w-[100%] h-auto",
        small:
          "text-[15px] lg:rounded-[10px] text-[12px] lg:text-[14px] h-[33px] lg:h-[45px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  loading,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(
        buttonVariants({ variant, size, className }),
        "flex items-center justify-center gap-1.5",
      )}
      disabled={props.disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" /> {children}
        </>
      ) : (
        children
      )}
      {/* {children} */}
    </Comp>
  );
}

export { Button, buttonVariants };
