"use client";

import { Copy, Eye, SquarePen, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type AdminTableIconActionsProps = {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onCopy?: () => void;
  status?: string;
};

const tableIconButtonClass =
  "h-8 w-8 shrink-0 text-muted-foreground hover:bg-brand-royal/10 hover:text-brand-royal";

export function AdminTableIconActions({
  onView,
  onEdit,
  onDelete,
  onCopy,
  status,
}: AdminTableIconActionsProps) {
  const showDelete = onDelete != null && status !== "inactive";

  return (
    <div className="flex items-center gap-0">
      {onView != null && (
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className={tableIconButtonClass}
          aria-label="View"
          onClick={onView}
        >
          <Eye className="h-4 w-4" />
        </Button>
      )}
      {onEdit != null && (
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className={tableIconButtonClass}
          aria-label="Edit"
          onClick={onEdit}
        >
          <SquarePen className="h-4 w-4" />
        </Button>
      )}
      {showDelete && (
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className={cn(
            tableIconButtonClass,
            "text-destructive hover:text-destructive hover:bg-destructive/10",
          )}
          aria-label="Delete"
          onClick={onDelete}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      )}
      {onCopy != null && (
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className={tableIconButtonClass}
          aria-label="Copy"
          onClick={onCopy}
        >
          <Copy className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
