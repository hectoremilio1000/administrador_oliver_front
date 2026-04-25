import { Loader2 } from "lucide-react";

export function Spinner({ size = 20 }: { size?: number }) {
  return <Loader2 size={size} className="animate-spin text-oliver-navy" />;
}

export function PageSpinner() {
  return (
    <div className="flex items-center justify-center py-20">
      <Spinner size={32} />
    </div>
  );
}
