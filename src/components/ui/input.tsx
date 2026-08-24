import * as React from "react";

import { cn } from "@/lib/utils";
const ICON_CONTAINER_PADDING_LEFT = "pl-10";

export type InputVariant =
  | "default"
  | "outline"
  | "outline2"
  | "filled"
  | "filled2"
  | "whitebg"
  | "outline3"
  | "outline4";
export type InputSize = "sm" | "medium" | "large";
interface InputProps extends Omit<React.ComponentProps<"input">, "size"> {
  variant?: InputVariant;
  size?: InputSize;
  error?: boolean;
  errorMessage?: string;
  leftIcon?: React.ReactNode;
}

function Input({
  className,
  type,
  variant = "default",
  size,
  error = false,
  errorMessage,
  leftIcon,
  ...props
}: InputProps) {
  const variantStyles = {
    default: "",
    outline:
      "w-full h-[40px] rounded-[14px] border border-gray-20 bg-background px-4 font-inter placeholder:text-gray-200 font-regular text-[14px]",
    outline2:
      "h-10 rounded-[10px] bg-white border border-gray-20 w-full text-[14px]! placeholder:text-[14px] font-normal placeholder:font-normal placeholder:opacity-60",
    filled:
      "rounded-[10px] w-full text-[14px] text-gray-10 border-[0.8px] bg-white-blur border-border-gray py-[24px] lg:py-[22px] px-[14px] lg:px-[13px] font-poppins font-[400] placeholder:text-[12px] sm:placeholder:text-[14px] lg:placeholder:text-[14px]",
    filled2:
      "text-sm placeholder:text-sm bg-white-blur px-3.5 py-3 md:py-2.5 text-dark-gray-7 placeholder:text-dark-gray-7 rounded-lg w-full border-0",
    whitebg:
      "lg:rounded-[16px] rounded-[14px] text-[14px] text-gray-10 border-[0.8px] bg-white-blur border-border-gray lg:py-[23px] py-[22px] px-[12px] font-poppins font-[400] w-full",
    outline3:
      "h-10 rounded-[10px] bg-white border-[0.8px] border-gray-118 text-foreground-10 placeholder:text-dark-gray-7 font-inter w-full text-[14px]! placeholder:text-[13px] font-normal placeholder:font-[400] ",
    outline4:
      "h-[29px] rounded-[4px] bg-white border-[0.8px] border-gray-118 text-foreground-20 placeholder:text-dark-gray-7 font-inter w-full text-[14px]! placeholder:text-[13px] font-normal placeholder:font-[400] ",
  };
  const inputSizeStyles = {
    sm: "h-9 min-h-9.5 rounded-[10px] px-3 lg:py-0 py-0 text-[13px] placeholder:text-[13px]",
    medium:
      "lg:py-[20px] py-[20px] lg:placeholder:text-[13px] lg:text-[13px] text-[13px]",
  };
  return (
    <div className="relative">
      {leftIcon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-200 pointer-events-none flex items-center">
          {leftIcon}
        </div>
      )}
      <input
        type={type}
        onWheel={(e) => (e.target as HTMLInputElement).blur()}
        {...props}
        data-slot="input"
        className={cn(
          "placeholder:text-[13px]    ",
          "file:text-foreground placeholder-gray-10 selection:bg-primary selection:text-primary-foreground  border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base font-poppins shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50  md:text-sm",
          "focus-visible:border-gray-20 focus-visible:ring-gray-20 focus-visible:ring-[0px] focus-visible:ring-offset-0",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          variantStyles[variant as keyof typeof variantStyles],
          size &&
            size in inputSizeStyles &&
            inputSizeStyles[size as keyof typeof inputSizeStyles],
          error &&
            "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/50",
          leftIcon && ICON_CONTAINER_PADDING_LEFT,
          className,
        )}
      />
      {error && errorMessage && (
        <p className="mt-1 text-[11px] text-red-500">{errorMessage}</p>
      )}
    </div>
  );
}

export { Input };
