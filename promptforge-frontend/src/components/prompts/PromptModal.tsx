"use client";

import { useEffect, useState } from "react";
import {
    updatePrompt,
    deletePrompt,
    toggleFavorite,
} from "@/services/promptService";
import { Prompt } from "@/types/prompt";

interface PromptModalProps {
    prompt: Prompt | null;
    open: boolean;
    onClose: () => void;
    onUpdated: () => void;
}

export default function PromptModal({
    prompt,
    open,
    onClose,
    onUpdated,
}: PromptModalProps) {
    const [isEditing, setIsEditing] = useState(false);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");


    useEffect(() => {
        if (prompt) {
            setTitle(prompt.title);
            setContent(prompt.content);

            setIsEditing(false);
        }
    }, [prompt]);
    const handleSave = async () => {
        if (!prompt) return;

        try {
            await updatePrompt(prompt.id, {
                title,
                content,
            });

            setIsEditing(false);
            onUpdated();
            onClose();
        } catch (error) {
            console.error("Failed to update prompt:", error);
            alert("Failed to update prompt.");
        }
    };
    const handleDelete = async () => {
        if (!prompt) return;

        const confirmed = window.confirm(
            "Are you sure you want to delete this prompt?"
        );

        if (!confirmed) return;

        try {
            await deletePrompt(prompt.id);

            onUpdated();
            onClose();
        } catch (error) {
            console.error("Failed to delete prompt:", error);
            alert("Failed to delete prompt.");
        }
    };
    const handleFavorite = async () => {
        if (!prompt) return;

        try {
            await toggleFavorite(prompt.id);

            onUpdated();
            onClose();
        } catch (error) {
            console.error("Failed to toggle favorite:", error);
            alert("Failed to update favorite.");
        }
    };

    if (!open || !prompt) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-3xl rounded-2xl bg-white p-6 shadow-xl">

                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold">
                        {isEditing ? "Edit Prompt" : "Prompt Details"}
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-black"
                    >
                        ✕
                    </button>
                </div>

                <div className="space-y-5">

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Title
                        </label>

                        <input
                            value={title}
                            disabled={!isEditing}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full rounded-lg border p-3 disabled:bg-gray-100"
                        />
                    </div>



                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Prompt
                        </label>

                        <textarea
                            rows={10}
                            value={content}
                            disabled={!isEditing}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full rounded-lg border p-3 disabled:bg-gray-100"
                        />
                    </div>

                </div>

                <div className="mt-8 flex justify-between">

                    <div className="flex gap-3">
                        <button
                            onClick={handleFavorite}
                            className="rounded-lg bg-yellow-500 px-5 py-2 text-white hover:bg-yellow-600"
                        >
                            {prompt.favorite ? "★ Unfavorite" : "☆ Favorite"}
                        </button>

                        <button
                            onClick={handleDelete}
                            className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700"
                        >
                            Delete
                        </button>
                    </div>

                    <div className="flex gap-3">

                        {!isEditing ? (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
                            >
                                Edit
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={() => {
                                        setIsEditing(false);
                                        setTitle(prompt.title);
                                        setContent(prompt.content);
                                    }}
                                    className="rounded-lg border px-5 py-2"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={handleSave}
                                    className="rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700"
                                >
                                    Save Changes
                                </button>
                            </>
                        )}

                    </div>

                </div>
            </div>
        </div>
    );
}