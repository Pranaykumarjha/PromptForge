"use client";

import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import CollectionSidebar from "@/components/dashboard/CollectionSidebar";
import PromptLibrary from "@/components/dashboard/PromptLibrary";

import { assignPromptToCollection } from "@/services/promptService";
import { getDashboardSummary } from "@/services/dashboardService";

import { DashboardSummary } from "@/types/dashboard";
import Spinner from "@/components/ui/Spinner";

export default function DashboardPage() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);

  const [selectedCollectionId, setSelectedCollectionId] =
    useState<number | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const [, setDraggedPromptId] = useState<number | null>(null);
  const draggedPromptIdRef = useRef<number | null>(null);

  const handleDragStart = (promptId: number) => {
    draggedPromptIdRef.current = promptId;
    setDraggedPromptId(promptId);
  };

  const handleMovePrompt = async (
    promptId: number,
    collectionId: number
  ) => {
    try {
      await assignPromptToCollection(promptId, collectionId);

      toast.success("Prompt moved successfully.");

      setRefreshTrigger((prev) => prev + 1);
    } catch (error) {
      console.error(error);

      toast.error("Failed to move prompt.");
    }
  };

  useEffect(() => {
    const fetchDashboardSummary = async () => {
      try {
        const data = await getDashboardSummary();
        setSummary(data);
      } catch (error) {
        console.error(error);

        toast.error("Failed to load dashboard.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardSummary();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">

      {/* Sidebar */}
      <div className="lg:col-span-1">
        <CollectionSidebar
          selectedCollectionId={selectedCollectionId}
          onSelectCollection={setSelectedCollectionId}
          onDropPrompt={handleMovePrompt}
        />
      </div>

      {/* Main Content */}
      <div className="space-y-10 lg:col-span-3">

        {/* Welcome */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
            Welcome to PromptForge
          </h1>

          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Manage and organize your AI prompts efficiently.
          </p>
        </div>

        {/* Summary */}
        <section>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">

            <div className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Prompts
              </p>

              <h2 className="mt-2 text-4xl font-bold text-gray-900 dark:text-white">
                {summary?.totalPrompts}
              </h2>
            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Collections
              </p>

              <h2 className="mt-2 text-4xl font-bold text-gray-900 dark:text-white">
                {summary?.totalCollections}
              </h2>
            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Favorites
              </p>

              <h2 className="mt-2 text-4xl font-bold text-gray-900 dark:text-white">
                {summary?.favoritePrompts}
              </h2>
            </div>

          </div>
        </section>

        {/* Prompt Library */}
        <section className="space-y-6">

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Prompt Library
              </h2>

              <p className="text-gray-500 dark:text-gray-400">
                Browse all your saved prompts.
              </p>
            </div>

            <input
              type="text"
              placeholder="Search prompts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 md:w-80"
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