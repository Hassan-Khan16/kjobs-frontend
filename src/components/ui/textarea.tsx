import * as React from "react";

import { cn } from "@/lib/utils";

interface TextareaProps extends React.ComponentProps<"textarea"> {
  error?: boolean;
  errorMessage?: string;
}

function Textarea({
  className,
  error = false,
  errorMessage,
  ...props
}: TextareaProps) {
  return (
    <div>
      <textarea
        data-slot="textarea"
        {...props}
        className={cn(
          "border-input placeholder:text-muted-foreground aria-invalid:border-destructive focus-visible:ring-0 focus-visible:ring-offset-0 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none  disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          error && "border-red-500 focus-visible:border-red-500",
          className,
        )}
      />
      {error && errorMessage && (
        <p className="mt-1 text-[11px] text-red-500">{errorMessage}</p>
      )}
    </div>
  );
}

export { Textarea };
