import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, FolderKanban, Settings, X } from "lucide-react";
import { cn } from "@/lib/cn";

const NAV = [
  { to: "/dashboard", label: "Dashboard", Icon: LayoutDashboard },
  { to: "/leads", label: "Leads", Icon: Users },
  { to: "/proyectos", label: "Proyectos", Icon: FolderKanban },
  { to: "/configuracion", label: "Configuración", Icon: Settings },
];

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      {/* Overlay mobile */}
      {open && (
        <button
          onClick={onClose}
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          aria-label="Cerrar menú"
        />
      )}

      <aside
        className={cn(
          "fixed md:sticky top-0 left-0 z-40 h-screen w-64 bg-oliver-navy-deep text-white flex flex-col transition-transform",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="px-6 py-5 flex items-center justify-between border-b border-white/10">
          <div>
            <p className="font-bold text-lg leading-tight">Oliver</p>
            <p className="text-xs uppercase tracking-widest text-white/60">admin panel</p>
          </div>
          <button onClick={onClose} className="md:hidden text-white p-1" aria-label="Cerrar">
            <X size={20} />
          </button>
        </div>
        <nav className="flex-1 py-4">
          {NAV.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-6 py-2.5 text-sm transition-colors",
                  isActive
                    ? "bg-white/10 text-white border-l-2 border-oliver-blue-light"
                    : "text-white/70 hover:bg-white/5 hover:text-white border-l-2 border-transparent"
                )
              }
            >
              <Icon size={18} /> {label}
            </NavLink>
          ))}
        </nav>
        <div className="px-6 py-4 text-xs text-white/40 border-t border-white/10">
          v0.1.0 · MVP
        </div>
      </aside>
    </>
  );
}
