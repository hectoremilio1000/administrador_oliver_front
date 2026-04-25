import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

const variantCls: Record<Variant, string> = {
  primary: "bg-oliver-navy text-white hover:bg-oliver-navy-deep border border-oliver-navy",
  secondary: "bg-white text-oliver-navy hover:bg-zinc-50 border border-oliver-navy",
  ghost: "bg-transparent text-zinc-700 hover:bg-zinc-100 border border-transparent",
  danger: "bg-red-600 text-white hover:bg-red-700 border border-red-600",
};

const sizeCls: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  children: ReactNode;
};

export function Button({ variant = "primary", size = "md", loading, className, children, disabled, ...rest }: Props) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
        variantCls[variant], sizeCls[size], className
      )}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? "…" : children}
    </button>
  );
}
