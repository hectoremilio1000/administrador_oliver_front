import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { StatusBadge } from "@/components/ui/Badge";
import { PageSpinner } from "@/components/ui/Spinner";
import { listLeads } from "@/api/leads";
import { formatDate } from "@/lib/formatters";
import type { LeadStatus } from "@/types/lead";

const STATUS_OPTIONS = [
  { value: "", label: "Todos los estados" },
  { value: "new", label: "Nuevo" },
  { value: "contacted", label: "Contactado" },
  { value: "qualified", label: "Calificado" },
  { value: "won", label: "Ganado" },
  { value: "lost", label: "Perdido" },
];

export default function LeadsPage() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<LeadStatus | "">("");
  const [q, setQ] = useState("");
  const [qDebounced, setQDebounced] = useState("");

  // Debounce simple
  useDebounce(q, 300, setQDebounced);

  const { data, isLoading } = useQuery({
    queryKey: ["leads", { page, status, q: qDebounced }],
    queryFn: () => listLeads({ page, perPage: 20, status: status || undefined, q: qDebounced || undefined }),
  });

  const leads = data?.data ?? [];
  const meta = data?.meta;

  return (
    <AppLayout title="Leads">
      <Card className="p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
            <Input
              placeholder="Buscar por nombre o email…"
              value={q}
              onChange={(e) => { setQ(e.target.value); setPage(1); }}
              className="pl-9"
            />
          </div>
          <Select
            value={status}
            onChange={(e) => { setStatus(e.target.value as LeadStatus | ""); setPage(1); }}
            options={STATUS_OPTIONS}
          />
        </div>
      </Card>

      <Card className="overflow-hidden">
        {isLoading ? (
          <PageSpinner />
        ) : leads.length === 0 ? (
          <p className="text-center text-zinc-500 py-12">No hay leads que coincidan</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-zinc-50 border-b border-zinc-200">
                <tr className="text-left text-xs uppercase tracking-wider text-zinc-500">
                  <th className="px-4 py-3 font-semibold">Fecha</th>
                  <th className="px-4 py-3 font-semibold">Nombre</th>
                  <th className="px-4 py-3 font-semibold">Email</th>
                  <th className="px-4 py-3 font-semibold">Tipo</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {leads.map((l) => (
                  <tr key={l.id} className="hover:bg-zinc-50 cursor-pointer">
                    <td className="px-4 py-3 text-zinc-500 whitespace-nowrap">
                      <Link to={`/leads/${l.id}`} className="block">{formatDate(l.created_at)}</Link>
                    </td>
                    <td className="px-4 py-3 font-semibold text-oliver-navy">
                      <Link to={`/leads/${l.id}`} className="block">{l.nombre}</Link>
                    </td>
                    <td className="px-4 py-3 text-zinc-700">
                      <Link to={`/leads/${l.id}`} className="block">{l.email}</Link>
                    </td>
                    <td className="px-4 py-3 text-zinc-700">
                      <Link to={`/leads/${l.id}`} className="block">{l.tipo}</Link>
                    </td>
                    <td className="px-4 py-3">
                      <Link to={`/leads/${l.id}`}><StatusBadge status={l.status} /></Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {meta && meta.lastPage > 1 && (
          <div className="px-4 py-3 border-t border-zinc-200 flex items-center justify-between text-sm">
            <span className="text-zinc-500">Página {meta.page} de {meta.lastPage} · {meta.total} totales</span>
            <div className="flex gap-2">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={meta.page === 1}
                className="p-1.5 rounded border border-zinc-300 disabled:opacity-40 hover:bg-zinc-50" aria-label="Anterior">
                <ChevronLeft size={16} />
              </button>
              <button onClick={() => setPage((p) => Math.min(meta.lastPage, p + 1))} disabled={meta.page === meta.lastPage}
                className="p-1.5 rounded border border-zinc-300 disabled:opacity-40 hover:bg-zinc-50" aria-label="Siguiente">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </Card>
    </AppLayout>
  );
}

import { useEffect } from "react";
function useDebounce<T>(value: T, delay: number, setter: (v: T) => void) {
  useEffect(() => {
    const t = setTimeout(() => setter(value), delay);
    return () => clearTimeout(t);
  }, [value, delay, setter]);
}
