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
            className="cursor-pointer rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        >
            <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold text-gray-900">
                    {prompt.title}
                </h3>

                {prompt.favorite && (
                    <span className="text-xl">⭐</span>
                )}
            </div>

            <p className="mt-4 line-clamp-4 text-sm text-gray-600">
                {prompt.content}
            </p>

            <div className="mt-6 flex items-center justify-between">
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                    {prompt.collectionName ?? "No Collection"}
                </span>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onClick();
                    }}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm transition-colors hover:bg-gray-100"
                >
                    View
                </button>
            </div>
        </div>
    );
}