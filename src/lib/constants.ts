export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3333";

export const STATUS_LABELS = {
  new: "Nuevo",
  contacted: "Contactado",
  qualified: "Calificado",
  won: "Ganado",
  lost: "Perdido",
} as const;

export const STATUS_COLORS = {
  new: "bg-blue-100 text-blue-800 border-blue-200",
  contacted: "bg-amber-100 text-amber-800 border-amber-200",
  qualified: "bg-purple-100 text-purple-800 border-purple-200",
  won: "bg-green-100 text-green-800 border-green-200",
  lost: "bg-zinc-100 text-zinc-700 border-zinc-200",
} as const;
