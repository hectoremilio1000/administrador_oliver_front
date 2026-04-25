import { Construction } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/Card";

export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <AppLayout title={title}>
      <Card className="p-12 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-amber-100 text-amber-600 mb-4">
          <Construction size={26} />
        </div>
        <h2 className="text-xl font-bold text-oliver-navy mb-2">Próximamente</h2>
        <p className="text-zinc-500">Esta sección se desarrolla en próximos sprints.</p>
      </Card>
    </AppLayout>
  );
}
