import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Save, Mail, Phone, Building2, Tag, MapPin, Calendar } from "lucide-react";
import { toast } from "sonner";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { StatusBadge } from "@/components/ui/Badge";
import { PageSpinner } from "@/components/ui/Spinner";
import { getLead, updateLead } from "@/api/leads";
import { formatDateTime } from "@/lib/formatters";
import type { LeadStatus } from "@/types/lead";

const STATUS_OPTIONS = [
  { value: "new", label: "Nuevo" },
  { value: "contacted", label: "Contactado" },
  { value: "qualified", label: "Calificado" },
  { value: "won", label: "Ganado" },
  { value: "lost", label: "Perdido" },
];

export default function LeadDetailPage() {
  const { id } = useParams<{ id: string }>();
  const leadId = Number(id);
  const navigate = useNavigate();
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["lead", leadId],
    queryFn: () => getLead(leadId),
    enabled: !!leadId,
  });

  const lead = data?.lead;
  const [status, setStatus] = useState<LeadStatus>("new");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (lead) {
      setStatus(lead.status);
      setNotes(lead.notes ?? "");
    }
  }, [lead]);

  const mutation = useMutation({
    mutationFn: () => updateLead(leadId, { status, notes }),
    onSuccess: () => {
      toast.success("Lead actualizado");
      qc.invalidateQueries({ queryKey: ["lead", leadId] });
      qc.invalidateQueries({ queryKey: ["leads"] });
    },
    onError: (e: any) => {
      toast.error(e?.response?.data?.error || "Error al actualizar");
    },
  });

  if (isLoading) return <AppLayout title="Lead"><PageSpinner /></AppLayout>;
  if (!lead) return (
    <AppLayout title="Lead no encontrado">
      <p className="text-zinc-500">No se encontró el lead.</p>
      <Button onClick={() => navigate("/leads")} className="mt-4">Volver a leads</Button>
    </AppLayout>
  );

  return (
    <AppLayout title={`Lead #${lead.id}`}>
      <Link to="/leads" className="inline-flex items-center gap-1 text-sm text-zinc-600 hover:text-oliver-navy mb-6">
        <ArrowLeft size={16} /> Volver a leads
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-oliver-navy">{lead.nombre}</h2>
              {lead.empresa && <p className="text-zinc-500 mt-1">{lead.empresa}</p>}
            </div>
            <StatusBadge status={lead.status} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <Field Icon={Mail} label="Email" value={<a href={`mailto:${lead.email}`} className="text-oliver-blue hover:underline">{lead.email}</a>} />
            <Field Icon={Phone} label="Teléfono" value={<a href={`tel:${lead.telefono}`} className="text-oliver-blue hover:underline">{lead.telefono}</a>} />
            <Field Icon={Tag} label="Tipo" value={lead.tipo} />
            {lead.etapa && <Field Icon={Building2} label="Etapa" value={lead.etapa} />}
            <Field Icon={Calendar} label="Recibido" value={formatDateTime(lead.created_at)} />
            {lead.ip && <Field Icon={MapPin} label="IP" value={<code className="text-xs">{lead.ip}</code>} />}
          </div>

          {lead.mensaje && (
            <div className="mt-6 pt-6 border-t border-zinc-200">
              <p className="text-xs uppercase tracking-wider text-zinc-500 mb-2">Mensaje</p>
              <p className="text-zinc-700 whitespace-pre-wrap leading-relaxed">{lead.mensaje}</p>
            </div>
          )}
        </Card>

        <Card className="p-6 h-fit">
          <h3 className="text-lg font-bold text-oliver-navy mb-4">Gestión</h3>
          <div className="space-y-4">
            <Select label="Status" value={status} onChange={(e) => setStatus(e.target.value as LeadStatus)} options={STATUS_OPTIONS} />
            <div>
              <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Notas internas</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={5}
                placeholder="Notas para el equipo…"
                className="w-full px-3 py-2 rounded border border-zinc-300 bg-white text-zinc-900 focus:outline-none focus:border-oliver-navy transition-colors text-sm"
              />
            </div>
            <Button onClick={() => mutation.mutate()} loading={mutation.isPending} className="w-full">
              <Save size={16} /> Guardar cambios
            </Button>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}

function Field({ Icon, label, value }: { Icon: any; label: string; value: any }) {
  return (
    <div className="flex items-start gap-3">
      <Icon size={18} className="text-zinc-400 mt-0.5 flex-shrink-0" />
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-wider text-zinc-500">{label}</p>
        <p className="text-zinc-900 break-words">{value}</p>
      </div>
    </div>
  );
}
