import { cn } from "@/lib/utils";

type StatCardProps = {
  label: string;
  value: string | number;
  hint?: string;
  className?: string;
};

export function StatCard({ label, value, hint, className }: StatCardProps) {
  return (
    <article
      className={cn(
        "rounded-2xl border border-border-default bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)]",
        className,
      )}
    >
      <p className="font-ui text-xs font-semibold tracking-wide text-gray-103 uppercase">
        {label}
      </p>
      <p className="mt-3 font-display text-4xl text-brand-royal">{value}</p>
      {hint ? <p className="mt-2 text-sm text-text-secondary">{hint}</p> : null}
    </article>
  );
}
