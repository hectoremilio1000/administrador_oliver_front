import { api } from "./client";
import type { Lead, LeadsResponse, LeadStatus } from "@/types/lead";

export type ListLeadsParams = {
  page?: number;
  perPage?: number;
  status?: LeadStatus | "";
  q?: string;
};

export async function listLeads(params: ListLeadsParams = {}): Promise<LeadsResponse> {
  const { data } = await api.get<LeadsResponse>("/api/leads", { params });
  return data;
}

export async function getLead(id: number): Promise<{ lead: Lead }> {
  const { data } = await api.get<{ lead: Lead }>(`/api/leads/${id}`);
  return data;
}

export type UpdateLeadInput = Partial<Pick<Lead, "status" | "notes" | "assigned_to">>;

export async function updateLead(id: number, input: UpdateLeadInput): Promise<{ lead: Lead }> {
  const { data } = await api.patch<{ lead: Lead }>(`/api/leads/${id}`, input);
  return data;
}
