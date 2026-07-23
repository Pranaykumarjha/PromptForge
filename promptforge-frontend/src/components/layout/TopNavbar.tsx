"use client";

import { useAuth } from "@/context/AuthContext";
import ThemeToggle from "@/components/common/ThemeToggle";

interface TopNavbarProps {
  title: string;
}

export default function TopNavbar({ title }: TopNavbarProps) {
  const { user, logout } = useAuth();

  return (
    <header className="flex flex-col gap-4 border-b border-gray-200 bg-white px-4 py-4 dark:border-zinc-800 dark:bg-zinc-900 md:h-16 md:flex-row md:items-center md:justify-between md:px-8">

      <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h2>

      <div className="flex items-center justify-between gap-4 md:justify-end">

        <div className="text-right">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {user?.name}
          </p>

          <p className="text-xs text-gray-500 dark:text-gray-400">
            {user?.email}
          </p>
        </div>

        <ThemeToggle />

        <button
          onClick={logout}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium transition-all hover:bg-gray-100 hover:shadow-sm dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
        >
          Logout
        </button>

      </div>
    </header>
  );
}