import { type InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { label, error, className, ...rest }, ref
) {
  return (
    <div className="space-y-1.5">
      {label && <label className="block text-sm font-semibold text-zinc-700">{label}</label>}
      <input
        ref={ref}
        className={cn(
          "w-full px-3 py-2 rounded border bg-white text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-oliver-navy transition-colors",
          error ? "border-red-400" : "border-zinc-300",
          className
        )}
        {...rest}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
});
