import { type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { STATUS_COLORS, STATUS_LABELS } from "@/lib/constants";
import type { LeadStatus } from "@/types/lead";

export function StatusBadge({ status }: { status: LeadStatus }) {
  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 text-xs font-semibold rounded-full border", STATUS_COLORS[status])}>
      {STATUS_LABELS[status]}
    </span>
  );
}

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 text-xs font-semibold rounded-full bg-zinc-100 text-zinc-700 border border-zinc-200", className)}>
      {children}
    </span>
  );
}
