import { cn } from "@/lib/utils";
import type { ApplicationUiStatus } from "@/types/public-job";

const styles: Record<ApplicationUiStatus, string> = {
  applied: "bg-surface-info text-brand-royal",
  reviewing: "bg-[rgba(47,91,222,0.12)] text-brand-navy-secondary",
  shortlisted: "bg-[rgba(99,102,241,0.12)] text-brand-indigo",
  rejected: "bg-[#FEE2E2] text-destructive",
  hired: "bg-[rgba(34,197,94,0.12)] text-green-600",
};

const labels: Record<ApplicationUiStatus, string> = {
  applied: "Applied",
  reviewing: "Reviewing",
  shortlisted: "Shortlisted",
  rejected: "Rejected",
  hired: "Hired",
};

type ApplicationStatusBadgeProps = {
  status: ApplicationUiStatus;
  className?: string;
};

export function ApplicationStatusBadge({
  status,
  className,
}: ApplicationStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-1 font-ui text-xs font-semibold",
        styles[status],
        className,
      )}
    >
      {labels[status]}
    </span>
  );
}
