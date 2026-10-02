import { cn } from "@/lib/utils";

type LoadingStateProps = {
  label?: string;
  className?: string;
  cards?: number;
};

export function LoadingState({
  label = "Loading…",
  className,
  cards = 0,
}: LoadingStateProps) {
  if (cards > 0) {
    return (
      <div className={cn("grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3", className)}>
        {Array.from({ length: cards }).map((_, index) => (
          <div
            key={index}
            className="h-56 animate-pulse rounded-2xl border border-border-default bg-white"
          />
        ))}
      </div>
    );
  }

  return (
    <div className={cn("flex items-center justify-center py-20", className)}>
      <div className="flex items-center gap-3 text-sm text-text-secondary">
        <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-brand-royal" />
        {label}
      </div>
    </div>
  );
}
