import { useNavigate } from "react-router-dom";
import { Menu, LogOut } from "lucide-react";
import { useAuth } from "@/store/auth";
import { logout } from "@/api/auth";

export function Topbar({ title, onMenu }: { title: string; onMenu: () => void }) {
  const navigate = useNavigate();
  const { user, clear } = useAuth();

  const handleLogout = async () => {
    await logout();
    clear();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-zinc-200 px-4 md:px-8 py-3.5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button onClick={onMenu} className="md:hidden p-1 text-zinc-600" aria-label="Abrir menú">
          <Menu size={22} />
        </button>
        <h1 className="text-lg font-bold text-oliver-navy">{title}</h1>
      </div>
      <div className="flex items-center gap-4">
        {user && <span className="hidden sm:block text-sm text-zinc-600">{user.email}</span>}
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-1.5 text-sm text-zinc-600 hover:text-oliver-navy"
          aria-label="Cerrar sesión"
        >
          <LogOut size={16} /> <span className="hidden sm:inline">Salir</span>
        </button>
      </div>
    </header>
  );
}
