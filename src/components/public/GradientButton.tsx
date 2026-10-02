import Link from "next/link";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "text-white bg-[linear-gradient(135deg,#2F5BDE,#243B6B)] shadow-[0_8px_30px_rgba(47,91,222,0.35)] hover:opacity-90",
  outline:
    "text-white border border-white/25 hover:bg-white/10",
  ghost:
    "text-brand-royal border-[1.5px] border-brand-royal hover:opacity-80",
  light:
    "bg-white text-brand-navy hover:opacity-90",
  glass:
    "text-white bg-white/15 border border-white/30 backdrop-blur-sm hover:opacity-90",
  soft:
    "bg-[rgba(47,91,222,0.08)] text-brand-royal hover:opacity-80",
};

type GradientButtonProps = {
  href?: string;
  children: React.ReactNode;
  className?: string;
  variant?: keyof typeof variants;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
};

export function GradientButton({
  href,
  children,
  className,
  variant = "primary",
  type = "button",
  onClick,
  disabled,
}: GradientButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-ui text-sm font-semibold transition-all duration-200 disabled:opacity-50",
    variants[variant],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
