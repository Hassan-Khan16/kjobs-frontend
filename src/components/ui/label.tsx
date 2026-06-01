"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "@/lib/utils";

interface LabelProps extends React.ComponentProps<typeof LabelPrimitive.Root> {
  variant?:
    | "default"
    | "form"
    | "formCheckbox"
    | "modalForm"
    | "activityForm"
    | "schoolForm"
    | "nlaForm"
    | "quizForm"
    | "l1"
    | "l2"
    | "l3"
    | "l4"
    | "l5"
    | "l6"
    | "l7";
  required?: boolean;
}

const REQUIRED_INDICATOR_CLASS = "text-red-500 ml-0.5";

function Label({
  className,
  variant = "default",
  required = false,
  children,
  ...props
}: LabelProps) {
  const variantStyles = {
    default: "",
    form: "text-[15px] font-inter mb-1 font-semibold text-foreground-10",
    l1: "text-[15px]  font-poppins font-light text-background",
    l2: "text-[12px] text-background sm:text-[13px] lg:text-[15px] font-poppins font-light cursor-pointer",
    l3: "font-inter font-[500] text-[14px] lg:text-[13px] text-dark-gray",
    l4: "text-[14px] lg:text-[14px]   font-[500]  font-poppins font-bold font-medium text-foreground-20",
    l5: "text-[14px]  font-inter font-[600] text-gray-60",
    l6: "font-inter font-[600] text-[14px] lg:text-[13px] text-gray-60",
    l7: "text-[13px] lg:text-[13px] font-inter mb-1 font-medium text-foreground-20",
    modalForm: "text-[15px] font-inter mb-1 font-light text-foreground-104",
    formCheckbox: "text-[13px] font-inter mb-1 font-normal text-gray-60",
    activityForm:
      "text-[15px] lg:text-[13px] font-inter mb-1 font-semibold text-foreground-10",
    schoolForm:
      "text-[12px] lg:text-[13px] font-inter mb-1 font-[500] text-foreground-20",
    nlaForm:
      "text-[15px] font-inter mb-1 font-medium text-foreground-20",
      quizForm:"font-inter font-[500] text-[12px] lg:text-[14px] text-foreground-20"
  };

  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center  text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      {children}
      {required && <span className={REQUIRED_INDICATOR_CLASS}>*</span>}
    </LabelPrimitive.Root>
  );
}

export { Label };
