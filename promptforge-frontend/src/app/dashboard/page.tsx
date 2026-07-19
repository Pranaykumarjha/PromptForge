"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-slate-100 p-8">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-4xl font-bold text-slate-900">
            Dashboard
          </h1>

          <p className="mt-2 text-slate-600">
            Welcome back, {user?.name}!
          </p>
        </div>
      </main>
    </ProtectedRoute>
  );
}