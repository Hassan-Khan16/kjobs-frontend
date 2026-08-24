import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface InfoNoteProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export function InfoNote({ children, title = "Note:", className }: InfoNoteProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 p-4 bg-sky-blue-20 border border-sky-blue-10 rounded-[10px]",
        className,
      )}
    >
      <Info className="size-5 text-dark-blue shrink-0" />
      <p className="text-dark-blue-5 text-[14px] leading-5">
        {title ? (
          <>
            <span className="font-bold">{title}</span> {children}
          </>
        ) : (
          children
        )}
      </p>
    </div>
  );
}
