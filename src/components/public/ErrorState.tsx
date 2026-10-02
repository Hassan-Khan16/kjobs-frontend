import { AlertCircle } from "lucide-react";
import { GradientButton } from "@/components/public/GradientButton";

type ErrorStateProps = {
  title?: string;
  description?: string;
  onRetry?: () => void;
};

export function ErrorState({
  title = "Something went wrong",
  description = "We couldn't load this content. Please try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="py-20 text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FEE2E2] text-destructive">
        <AlertCircle className="h-6 w-6" />
      </div>
      <h3 className="font-ui text-lg font-semibold text-brand-navy">{title}</h3>
      <p className="mt-2 text-sm text-text-secondary">{description}</p>
      {onRetry ? (
        <div className="mt-6">
          <GradientButton onClick={onRetry}>Try again</GradientButton>
        </div>
      ) : null}
    </div>
  );
}
