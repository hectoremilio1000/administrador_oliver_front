import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("bg-white rounded-lg border border-zinc-200 shadow-sm", className)}>
      {children}
    </div>
  );
}
