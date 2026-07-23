"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-gray-200 bg-white transition-colors dark:border-zinc-800 dark:bg-zinc-900">

      <div className="border-b border-gray-200 px-6 py-5 dark:border-zinc-800">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          PromptForge
        </h1>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          AI Prompt Workspace
        </p>
      </div>

      <nav className="flex-1 p-4">
        {navigation.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`mb-2 block rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                active
                  ? "bg-black text-white dark:bg-blue-600"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-zinc-800"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}