import Sidebar from "@/components/layout/Sidebar";
import TopNavbar from "@/components/layout/TopNavbar";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-50 dark:bg-zinc-950 transition-colors">

        <Sidebar />

        <main className="flex flex-1 flex-col overflow-hidden bg-gray-50 dark:bg-zinc-950 transition-colors">

          <TopNavbar title="Dashboard" />

          <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-zinc-950 p-8 transition-colors">
            {children}
          </div>

        </main>

      </div>
    </ProtectedRoute>
  );
}