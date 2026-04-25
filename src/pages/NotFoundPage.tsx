import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-4">
      <div className="text-center">
        <p className="text-7xl font-bold text-oliver-navy mb-4">404</p>
        <h1 className="text-xl font-bold text-oliver-navy mb-2">Página no encontrada</h1>
        <p className="text-zinc-500 mb-6">La ruta que buscas no existe.</p>
        <Link to="/dashboard">
          <Button>Ir al dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
