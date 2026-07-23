"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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
    const [isSubmitting, setIsSubmitting] = useState(false);

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
        if (!prompt || isSubmitting) return;

        setIsSubmitting(true);

        try {
            await updatePrompt(prompt.id, {
                title,
                content,
            });

            toast.success("Prompt updated successfully.");

            setIsEditing(false);
            onUpdated();
            onClose();
        } catch (error) {
            console.error("Failed to update prompt:", error);
            toast.error("Failed to update prompt.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!prompt || isSubmitting) return;

        const confirmed = window.confirm(
            "Are you sure you want to delete this prompt?"
        );

        if (!confirmed) return;

        setIsSubmitting(true);

        try {
            await deletePrompt(prompt.id);

            toast.success("Prompt deleted successfully.");

            onUpdated();
            onClose();
        } catch (error) {
            console.error("Failed to delete prompt:", error);
            toast.error("Failed to delete prompt.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleFavorite = async () => {
        if (!prompt || isSubmitting) return;

        setIsSubmitting(true);

        try {
            await toggleFavorite(prompt.id);

            toast.success(
                prompt.favorite
                    ? "Removed from favorites."
                    : "Added to favorites."
            );

            onUpdated();
            onClose();
        } catch (error) {
            console.error("Failed to toggle favorite:", error);
            toast.error("Failed to update favorite.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!open || !prompt) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="w-full max-w-3xl rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200">

                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {isEditing ? "Edit Prompt" : "Prompt Details"}
                    </h2>

                    <button
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="text-gray-500 hover:text-black dark:hover:text-white transition-colors"
                    >
                        ✕
                    </button>
                </div>

                <div className="space-y-5">

                    <div>
                        <label className="mb-1 block text-sm font-medium dark:text-gray-200">
                            Title
                        </label>

                        <input
                            value={title}
                            disabled={!isEditing || isSubmitting}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-3 disabled:bg-gray-100 dark:disabled:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium dark:text-gray-200">
                            Prompt
                        </label>

                        <textarea
                            rows={10}
                            value={content}
                            disabled={!isEditing || isSubmitting}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-3 disabled:bg-gray-100 dark:disabled:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>

                </div>

                <div className="mt-8 flex flex-col gap-4 md:flex-row md:justify-between">

                    <div className="flex flex-wrap gap-3">

                        <button
                            onClick={handleFavorite}
                            disabled={isSubmitting}
                            className="rounded-lg bg-yellow-500 px-5 py-2 text-white hover:bg-yellow-600 transition disabled:opacity-60"
                        >
                            {prompt.favorite ? "★ Unfavorite" : "☆ Favorite"}
                        </button>

                        <button
                            onClick={handleDelete}
                            disabled={isSubmitting}
                            className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700 transition disabled:opacity-60"
                        >
                            Delete
                        </button>

                    </div>

                    <div className="flex flex-wrap gap-3">

                        {!isEditing ? (
                            <button
                                onClick={() => setIsEditing(true)}
                                disabled={isSubmitting}
                                className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 transition disabled:opacity-60"
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
                                    disabled={isSubmitting}
                                    className="rounded-lg border border-gray-300 dark:border-zinc-700 px-5 py-2 transition disabled:opacity-60"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={handleSave}
                                    disabled={isSubmitting}
                                    className="rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700 transition disabled:opacity-60"
                                >
                                    {isSubmitting ? "Saving..." : "Save Changes"}
                                </button>
                            </>
                        )}

                    </div>

                </div>
            </div>
        </div>
    );
}