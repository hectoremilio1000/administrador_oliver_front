import { api } from "./client";
import type { AuthResponse, User } from "@/types/user";

export async function login(email: string, password: string): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>("/api/auth/login", { email, password });
  return data;
}

export async function logout(): Promise<void> {
  try { await api.post("/api/auth/logout"); } catch { /* ignore */ }
}

export async function getMe(): Promise<{ user: User }> {
  const { data } = await api.get<{ user: User }>("/api/auth/me");
  return data;
}
