
"use client";

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  errorMessage?: string;
  variant?: "default" | "outline" | "filled" | "whitebg";
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, error, errorMessage, variant,...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const variantStyles = {
      whitebg:
      "lg:rounded-[16px] rounded-[14px] text-[14px] text-gray-10 border-[0.8px] bg-white-blur border-border-gray lg:py-[23px] py-[22px] px-[12px] font-poppins font-[400] w-full",
      
    }
    return (
      <div className="w-full">
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            className={cn(
              "placeholder:text-[13px] ",
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-gray-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-red-500 focus-visible:ring-red-500",
              variant && variantStyles[variant as keyof typeof variantStyles],
              className
            )}
            ref={ref}
            {...props}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute cursor-pointer right-5 top-1/2 -translate-y-1/2 text-dark-gray-4 hover:text-dark-gray-4 transition-colors"
            tabIndex={-1}
          >
            {showPassword ? (
              <Eye className="h-4 w-4 md:h-4 md:w-4 text-dark-gray-4" />
            ) : (
              <EyeOff className="h-4 w-4 md:h-4 md:w-4 text-dark-gray-4" />
            )}
          </button>
        </div>
        {errorMessage && (
          <p className="text-sm text-red-500 mt-1">{errorMessage}</p>
        )}
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
