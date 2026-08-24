import { entityStatusConfig } from "@/config/entity-status";
import { cn } from "@/lib/utils";

export function StatusBadge({ status }: { status: string }) {
  const config = entityStatusConfig[status] ?? {
    label: status,
    bg: "bg-gray-102",
    text: "text-dark-gray",
  };
  return (
    <span
      className={cn(
        "inline-flex rounded-md px-2 py-0.5 text-xs font-medium capitalize",
        config.bg,
        config.text,
      )}
    >
      {config.label}
    </span>
  );
}
