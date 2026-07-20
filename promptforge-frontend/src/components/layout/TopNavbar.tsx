"use client";

import { useAuth } from "@/context/AuthContext";

interface TopNavbarProps {
  title: string;
}

export default function TopNavbar({ title }: TopNavbarProps) {
  const { user, logout } = useAuth();

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          {title}
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">
            {user?.name}
          </p>

          <p className="text-xs text-gray-500">
            {user?.email}
          </p>
        </div>

        <button
          onClick={logout}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100"
        >
          Logout
        </button>
      </div>
    </header>
  );
}