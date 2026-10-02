import { cn } from "@/lib/utils";
import type { ApplicationUiStatus } from "@/types/public-job";

const styles: Record<ApplicationUiStatus, string> = {
  pending: "bg-surface-info text-brand-royal",
  shortlisted: "bg-[rgba(99,102,241,0.12)] text-brand-indigo",
  accepted: "bg-[rgba(47,91,222,0.12)] text-brand-navy-secondary",
  rejected: "bg-[#FEE2E2] text-destructive",
};

const labels: Record<ApplicationUiStatus, string> = {
  pending: "Pending",
  shortlisted: "Shortlisted",
  accepted: "Accepted",
  rejected: "Rejected",
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
