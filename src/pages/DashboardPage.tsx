import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Users, TrendingUp, Calendar, Inbox } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/Badge";
import { PageSpinner } from "@/components/ui/Spinner";
import { listLeads } from "@/api/leads";
import { formatDate, isToday, isThisWeek } from "@/lib/formatters";

export default function DashboardPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["leads", { all: true }],
    queryFn: () => listLeads({ perPage: 100 }),
  });

  const leads = data?.data ?? [];
  const total = data?.meta.total ?? 0;
  const todayCount = leads.filter((l) => isToday(l.created_at)).length;
  const weekCount = leads.filter((l) => isThisWeek(l.created_at)).length;
  const newCount = leads.filter((l) => l.status === "new").length;
  const recent = leads.slice(0, 5);

  return (
    <AppLayout title="Dashboard">
      {isLoading ? (
        <PageSpinner />
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Metric Icon={Users} label="Total leads" value={total} color="bg-oliver-navy" />
            <Metric Icon={Inbox} label="Pendientes" value={newCount} color="bg-blue-600" />
            <Metric Icon={Calendar} label="Hoy" value={todayCount} color="bg-amber-500" />
            <Metric Icon={TrendingUp} label="Esta semana" value={weekCount} color="bg-green-600" />
          </div>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-oliver-navy">Últimos leads</h2>
              <Link to="/leads" className="text-sm font-semibold text-oliver-blue hover:underline">
                Ver todos →
              </Link>
            </div>
            {recent.length === 0 ? (
              <p className="text-sm text-zinc-500 py-8 text-center">Aún no hay leads</p>
            ) : (
              <div className="divide-y divide-zinc-100">
                {recent.map((l) => (
                  <Link key={l.id} to={`/leads/${l.id}`} className="flex items-center justify-between py-3 hover:bg-zinc-50 -mx-2 px-2 rounded transition-colors">
                    <div>
                      <p className="font-semibold text-zinc-900">{l.nombre}</p>
                      <p className="text-xs text-zinc-500">{l.email} · {l.tipo}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <StatusBadge status={l.status} />
                      <span className="text-xs text-zinc-400 hidden sm:inline">{formatDate(l.created_at)}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </Card>
        </>
      )}
    </AppLayout>
  );
}

function Metric({ Icon, label, value, color }: { Icon: any; label: string; value: number; color: string }) {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg ${color} text-white flex items-center justify-center`}>
          <Icon size={18} />
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-zinc-500">{label}</p>
          <p className="text-2xl font-bold text-oliver-navy">{value}</p>
        </div>
      </div>
    </Card>
  );
}
