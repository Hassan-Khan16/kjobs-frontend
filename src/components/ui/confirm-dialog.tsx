"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { VariantProps } from "class-variance-authority";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  CircleAlert,
  DeleteIcon,
  Loader2,
  RotateCcw,
  Trash2,
} from "lucide-react";
import Image from "next/image";

export interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: React.ReactNode;
  confirmLabel?: string | React.ReactNode;
  cancelLabel?: string;
  onConfirm: () => void | Promise<void>;
  variant?: NonNullable<
    VariantProps<typeof buttonVariants>["variant"] | "restore" | "nla-delete"
  >;
  loading?: boolean;
  className?: string;
}

const ConfirmDialog = ({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  variant = "default",
  loading = false,
  className,
}: ConfirmDialogProps) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const busy = loading || isSubmitting;

  const handleConfirm = React.useCallback(async () => {
    setIsSubmitting(true);
    try {
      await Promise.resolve(onConfirm());
      onOpenChange(false);
    } finally {
      setIsSubmitting(false);
    }
  }, [onConfirm, onOpenChange]);

  // comment
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "sm:max-w-[620px] rounded-[16px] border border-gray-20 p-0 shadow-lg",
          className,
        )}
        showCloseButton={true}
        closeButtonClassName="text-[#A1A1A1] z-10"
      >
        <div className="">
          <DialogHeader
            className={cn(
              "p-5 rounded-t-[16px]",
              variant === "nla-delete"
                ? "bg-white border-b border-gray-105 p-6"
                : "bg-sky-blue-20",
            )}
          >
            <div className="flex gap-2 items-center ">
              {variant === "nla-delete" ? null : variant ===
                "destructive" ? (
                <CircleAlert className="size-5 text-destructive" />
              ) : variant === "restore" ? (
                <RotateCcw className="size-5 text-brand-royal" />
              ) : (
                <Trash2 className="size-5 text-destructive" />
              )}
              <DialogTitle
                className={cn(
                  "text-left text-[20px] text-black-10 font-inter",
                  variant === "nla-delete" ? "font-semibold" : "font-[700]",
                )}
              >
                {title}
              </DialogTitle>
            </div>
          </DialogHeader>

          <DialogDescription
            className={cn(
              "p-5 pb-2 text-left text-[16px] font-[400] font-inter text-dark-gray-2",
              variant === "nla-delete" ? "p-6 pt-6 mt-0" : "mt-5 pt-1",
            )}
          >
            {description}
          </DialogDescription>
        </div>

        <DialogFooter
          className={cn(
            "flex flex-row py-5 px-4 justify-end gap-2 pt-4 sm:justify-end",
            variant === "nla-delete"
              ? "bg-white p-6"
              : "bg-gray-102 rounded-b-[20px]",
          )}
        >
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={busy}
            className={cn(
              "rounded-lg bg-background text-foreground-104 border-gray-20",
              variant === "nla-delete" &&
                "rounded-[10px] h-10 px-4 border-gray-105 text-black-10",
            )}
          >
            {cancelLabel}
          </Button>
          <Button
            type="button"
            onClick={handleConfirm}
            disabled={busy}
            className={cn(
              "rounded-lg font-inter font-[500] text-[14px] ",
              variant === "nla-delete" &&
                "rounded-[10px] h-10 px-6",
            )}
            variant={variant === "nla-delete" ? "destructive" : variant}
          >
            {busy ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                {confirmLabel}
              </>
            ) : (
              confirmLabel
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialog;
