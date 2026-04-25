# administrador_oliver_front

Panel administrativo para [Oliver Cocina por Ti](https://olivercocinaporti.vercel.app). Gestiona los leads que llegan del formulario de contacto y, en próximos sprints, el contenido del sitio público.

## Stack

- Vite + React 19 + TypeScript
- Tailwind v4 (con `@tailwindcss/vite`, sin `tailwind.config.js`)
- React Router v6
- TanStack Query v5
- Axios
- Zustand (auth state, persistido en localStorage)
- React Hook Form + Zod
- Lucide React (iconos)
- Sonner (toasts)

## Setup local

```bash
npm install
cp .env.example .env.local
# Editar VITE_API_URL si tu backend corre en otra URL
npm run dev
```

Abre http://localhost:5173. Login default (depende de cómo seedeaste el backend):

```
admin@oliver.com / cambiame123
```

## Variables de entorno

| Variable | Default | Descripción |
|---|---|---|
| `VITE_API_URL` | `http://localhost:3333` | URL base del backend AdonisJS / Express |

## Comandos

```bash
npm run dev      # arranca vite dev server
npm run build    # tsc + vite build → dist/
npm run preview  # sirve dist/ localmente
npm run lint     # eslint
```

## Estructura

```
src/
├── api/             # axios client + endpoints
├── components/
│   ├── layout/      # Sidebar, Topbar, AppLayout
│   └── ui/          # Button, Input, Select, Card, Badge, Spinner
├── pages/           # LoginPage, DashboardPage, LeadsPage, LeadDetailPage, ...
├── routes/          # AppRoutes, ProtectedRoute
├── store/           # Zustand auth store (con persist)
├── lib/             # constants, formatters, queryClient, cn helper
├── types/           # User, Lead types
└── styles/          # globals.css (Tailwind v4 import + paleta Oliver)
```

## Deploy a Vercel

1. https://vercel.com/dashboard → **Add New Project**
2. Importa este repo `administrador_oliver_front`
3. Framework: **Vite** (autodetect)
4. Build: `npm run build`, Output: `dist`
5. **Environment Variables**:
   - `VITE_API_URL` = `https://tu-backend.up.railway.app` (URL del backend en Railway)
6. **Deploy**

El archivo `vercel.json` ya configura el SPA fallback (todas las rutas a `index.html`).

## Funcionalidad MVP actual

- ✅ Login con email/password (POST `/api/auth/login`)
- ✅ Persistencia de token en localStorage
- ✅ Auto-logout en 401
- ✅ Dashboard con métricas (total, pendientes, hoy, semana)
- ✅ Listado de leads con filtros (status, search) y paginación
- ✅ Detalle de lead con edición de status y notas
- ✅ Logout con revocación de token en backend
- ✅ Páginas placeholder: Proyectos, Configuración (próximos sprints)

## Roadmap

- CRUD de Proyectos (alimenta `/proyectos` del sitio público)
- CRUD de Servicios
- CRUD de Pillars / Process steps
- Editor de Configuración del sitio (CONTACT, SOCIAL, etc.)
- Upload de imágenes
- Multi-usuario con roles
- Export CSV de leads
- Métricas y gráficos en dashboard
