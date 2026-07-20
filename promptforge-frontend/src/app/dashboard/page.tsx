"use client";
import { assignPromptToCollection } from "@/services/promptService";
import { useEffect, useRef, useState } from "react";
import CollectionSidebar from "@/components/dashboard/CollectionSidebar";
import PromptLibrary from "@/components/dashboard/PromptLibrary";
import { getDashboardSummary } from "@/services/dashboardService";
import { DashboardSummary } from "@/types/dashboard";

export default function DashboardPage() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);

  const [selectedCollectionId, setSelectedCollectionId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Drag & Drop state
  const [draggedPromptId, setDraggedPromptId] = useState<number | null>(null);
  const draggedPromptIdRef = useRef<number | null>(null);

  const handleDragStart = (promptId: number) => {
    draggedPromptIdRef.current = promptId;
    setDraggedPromptId(promptId);
  };

  const handleMovePrompt = async (promptId: number, collectionId: number) => {
    console.log("handleMovePrompt", promptId, collectionId);

    try {
      console.log("Before API call");

      await assignPromptToCollection(promptId, collectionId);

      console.log("After API call");

      setRefreshTrigger((prev) => {
        const next = prev + 1;
        console.log("refreshTrigger:", next);
        return next;
      });
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  useEffect(() => {
    const fetchDashboardSummary = async () => {
      try {
        const data = await getDashboardSummary();
        setSummary(data);
      } catch (error) {
        console.error("Failed to load dashboard summary:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardSummary();
  }, []);

  if (loading) {
    return (
      <p className="text-gray-500">
        Loading dashboard...
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

      {/* Left Sidebar */}
      <div className="lg:col-span-1">
        <CollectionSidebar
          selectedCollectionId={selectedCollectionId}
          onSelectCollection={setSelectedCollectionId}
          onDropPrompt={handleMovePrompt}
        />
      </div>

      {/* Main Dashboard */}
      <div className="lg:col-span-3 space-y-10">

        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold">
            Welcome to PromptForge
          </h1>

          <p className="mt-2 text-gray-500">
            Manage and organize your AI prompts efficiently.
          </p>
        </div>

        {/* Dashboard Summary */}
        <section>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">
                Total Prompts
              </p>

              <h2 className="mt-2 text-4xl font-bold">
                {summary?.totalPrompts}
              </h2>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">
                Collections
              </p>

              <h2 className="mt-2 text-4xl font-bold">
                {summary?.totalCollections}
              </h2>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-500">
                Favorites
              </p>

              <h2 className="mt-2 text-4xl font-bold">
                {summary?.favoritePrompts}
              </h2>
            </div>
          </div>
        </section>

        {/* Prompt Library */}
        <section className="space-y-6">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-2xl font-bold">
                Prompt Library
              </h2>

              <p className="text-gray-500">
                Browse all your saved prompts.
              </p>
            </div>

            <input
              type="text"
              placeholder="Search prompts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-80 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
            />

          </div>

          <PromptLibrary
            searchTerm={searchTerm}
            selectedCollectionId={selectedCollectionId}
            refreshTrigger={refreshTrigger}
            onDragStart={handleDragStart}
          />

        </section>
      </div>
    </div>
  );
}
