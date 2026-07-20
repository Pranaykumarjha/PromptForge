"use client";

import { useEffect, useState } from "react";
import PromptCard from "@/components/prompts/PromptCard";
import PromptModal from "@/components/prompts/PromptModal";
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
      <p className="text-gray-500">
        Loading prompts...
      </p>
    );
  }

  if (filteredPrompts.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
        <h2 className="text-xl font-semibold">
          No prompts found
        </h2>

        <p className="mt-2 text-gray-500">
          There are no prompts in this view.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
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