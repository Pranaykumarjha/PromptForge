"use client";

import { useEffect, useState } from "react";
import PromptCard from "@/components/prompts/PromptCard";
import PromptModal from "@/components/prompts/PromptModal";
import PromptCardSkeleton from "@/components/ui/PromptCardSkeleton";

import {
  getAllPrompts,
  searchPrompts,
} from "@/services/promptService";

import { Prompt } from "@/types/prompt";

interface PromptLibraryProps {
  searchTerm: string;
  selectedCollectionId: number | null;
  refreshTrigger: number;
  onDragStart: (promptId: number) => void;
}

export default function PromptLibrary({
  searchTerm,
  selectedCollectionId,
  refreshTrigger,
  onDragStart,
}: PromptLibraryProps) {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchPrompts = async () => {
    setLoading(true);

    try {
      const data =
        searchTerm.trim() === ""
          ? await getAllPrompts()
          : await searchPrompts(searchTerm);

      console.log("Fetched prompts:", data);
      setPrompts(data);
    } catch (error) {
      console.error("Failed to load prompts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("PromptLibrary useEffect", {
      searchTerm,
      selectedCollectionId,
      refreshTrigger,
    });

    fetchPrompts();
  }, [searchTerm, selectedCollectionId, refreshTrigger]);

  const handleOpenPrompt = (prompt: Prompt) => {
    setSelectedPrompt(prompt);
    setIsModalOpen(true);
  };

  const handleClosePrompt = () => {
    setSelectedPrompt(null);
    setIsModalOpen(false);
  };

  const filteredPrompts =
    selectedCollectionId === null
      ? prompts
      : prompts.filter(
        (prompt) => prompt.collectionId === selectedCollectionId
      );

  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <PromptCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (filteredPrompts.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-12 text-center transition-colors">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          No prompts found
        </h2>

        <p className="mt-2 text-gray-500 dark:text-gray-400">
          There are no prompts in this view.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {filteredPrompts.map((prompt) => (
          <PromptCard
            key={prompt.id}
            prompt={prompt}
            onClick={() => handleOpenPrompt(prompt)}
            onDragStart={onDragStart}
          />
        ))}
      </div>

      <PromptModal
        prompt={selectedPrompt}
        open={isModalOpen}
        onClose={handleClosePrompt}
        onUpdated={fetchPrompts}
      />
    </>
  );
}