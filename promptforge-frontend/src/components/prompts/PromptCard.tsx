"use client";

import { Prompt } from "@/types/prompt";

interface PromptCardProps {
    prompt: Prompt;
    onClick: () => void;
    onDragStart: (promptId: number) => void;
}

export default function PromptCard({
    prompt,
    onClick,
    onDragStart,
}: PromptCardProps) {
    return (
        <div
            draggable
            onDragStart={(e) => {
                e.dataTransfer.setData("text/plain", String(prompt.id));
                e.dataTransfer.effectAllowed = "move";
                onDragStart(prompt.id);
            }}
            onClick={onClick}
            className="cursor-pointer rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
        >
            <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {prompt.title}
                </h3>

                {prompt.favorite && (
                    <span className="text-xl" title="Favorite">
                        ⭐
                    </span>
                )}
            </div>

            <p className="mt-4 line-clamp-4 text-sm text-gray-600 dark:text-gray-400">
                {prompt.content}
            </p>

            <div className="mt-6 flex items-center justify-between gap-3">
                <span className="rounded-full bg-gray-100 dark:bg-zinc-800 px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-300">
                    {prompt.collectionName ?? "No Collection"}
                </span>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onClick();
                    }}
                    className="rounded-lg border border-gray-300 dark:border-zinc-700 px-4 py-2 text-sm transition-all duration-200 hover:bg-gray-100 dark:hover:bg-zinc-800 dark:text-white"
                >
                    View
                </button>
            </div>
        </div>
    );
}