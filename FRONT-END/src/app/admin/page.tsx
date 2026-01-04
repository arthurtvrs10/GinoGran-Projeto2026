// src/app/admin/page.tsx
export default function AdminDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Painel de Administração 🛡️</h1>
      <p className="mt-4 text-gray-600">
        Se estás a ver esta página, significa que o Middleware confirmou que estás autenticado!
      </p>
    </div>
  );
}