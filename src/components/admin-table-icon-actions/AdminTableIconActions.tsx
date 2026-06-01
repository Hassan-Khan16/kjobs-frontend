"use client";

import { Copy, Eye, SquarePen, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
export type AdminTableIconActionsProps = {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onCopy?: () => void;
  status?: string;
};

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
        <Button type="button" aria-label="View" onClick={onView}>
          <Eye className="h-4 w-4 text-foreground-20 " />
        </Button>
      )}
      <Button type="button" aria-label="Edit" onClick={onEdit}>
        <SquarePen className="h-4 w-4 text-foreground-20" />
      </Button>
      {showDelete && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-red-500 hover:bg-muted hover:text-red-600"
          aria-label="Delete"
          onClick={onDelete}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      )}
      {onCopy != null && (
        <Button type="button" aria-label="Copy" onClick={onCopy}>
          <Copy className="h-4 w-4 text-foreground-20" />
        </Button>
      )}
    </div>
  );
}
