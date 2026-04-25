import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import LeadsPage from "@/pages/LeadsPage";
import LeadDetailPage from "@/pages/LeadDetailPage";
import PlaceholderPage from "@/pages/PlaceholderPage";
import NotFoundPage from "@/pages/NotFoundPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/leads" element={<ProtectedRoute><LeadsPage /></ProtectedRoute>} />
      <Route path="/leads/:id" element={<ProtectedRoute><LeadDetailPage /></ProtectedRoute>} />
      <Route path="/proyectos" element={<ProtectedRoute><PlaceholderPage title="Proyectos" /></ProtectedRoute>} />
      <Route path="/configuracion" element={<ProtectedRoute><PlaceholderPage title="Configuración" /></ProtectedRoute>} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
