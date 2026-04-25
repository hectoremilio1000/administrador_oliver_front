import { type SelectHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

type Option = { value: string; label: string };

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  options: Option[];
};

export const Select = forwardRef<HTMLSelectElement, Props>(function Select(
  { label, error, options, className, ...rest }, ref
) {
  return (
    <div className="space-y-1.5">
      {label && <label className="block text-sm font-semibold text-zinc-700">{label}</label>}
      <select
        ref={ref}
        className={cn(
          "w-full px-3 py-2 rounded border bg-white text-zinc-900 focus:outline-none focus:border-oliver-navy transition-colors",
          error ? "border-red-400" : "border-zinc-300",
          className
        )}
        {...rest}
      >
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
});
