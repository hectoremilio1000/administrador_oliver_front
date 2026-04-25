import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { useAuth } from "@/store/auth";
import { login } from "@/api/auth";

const schema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(4, "Mínimo 4 caracteres"),
});
type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const { token, setAuth } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  if (token) return <Navigate to="/dashboard" replace />;

  const onSubmit = async (values: FormData) => {
    setSubmitting(true);
    try {
      const { token, user } = await login(values.email, values.password);
      setAuth(token, user);
      toast.success(`Bienvenido, ${user.full_name}`);
      navigate("/dashboard");
    } catch (e: any) {
      const msg = e?.response?.data?.error || "Credenciales inválidas";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100 px-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-oliver-navy text-white mb-4">
            <LogIn size={24} />
          </div>
          <h1 className="text-2xl font-bold text-oliver-navy">Oliver Admin</h1>
          <p className="text-sm text-zinc-500 mt-1">Inicia sesión para administrar</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Email" type="email" placeholder="admin@oliver.com" {...register("email")} error={errors.email?.message} />
          <Input label="Contraseña" type="password" placeholder="••••••••" {...register("password")} error={errors.password?.message} />
          <Button type="submit" className="w-full" loading={submitting} size="lg">
            {submitting ? "Entrando…" : "Iniciar sesión"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
