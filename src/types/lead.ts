export type LeadStatus = "new" | "contacted" | "qualified" | "won" | "lost";

export type Lead = {
  id: number;
  nombre: string;
  empresa: string | null;
  email: string;
  telefono: string;
  tipo: string;
  etapa: string | null;
  mensaje: string | null;
  status: LeadStatus;
  notes: string | null;
  assigned_to: number | null;
  ip: string | null;
  user_agent: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  created_at: string;
  updated_at: string;
};

export type LeadsResponse = {
  data: Lead[];
  meta: { total: number; page: number; perPage: number; lastPage: number };
};
