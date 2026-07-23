"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Spinner from "@/components/ui/Spinner";

import { Collection } from "@/types/collection";

import {
    getAllCollections,
    createCollection,
    updateCollection,
    deleteCollection,
} from "@/services/collectionService";

interface CollectionSidebarProps {
    selectedCollectionId: number | null;
    onSelectCollection: (collectionId: number | null) => void;
    onDropPrompt: (promptId: number, collectionId: number) => void;
}

export default function CollectionSidebar({
    selectedCollectionId,
    onSelectCollection,
    onDropPrompt,
}: CollectionSidebarProps) {
    const [collections, setCollections] = useState<Collection[]>([]);
    const [loading, setLoading] = useState(true);

    const [showInput, setShowInput] = useState(false);
    const [newCollection, setNewCollection] = useState("");

    const [editingId, setEditingId] = useState<number | null>(null);
    const [editingName, setEditingName] = useState("");

    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchCollections();
    }, []);

    const fetchCollections = async () => {
        setLoading(true);

        try {
            const data = await getAllCollections();
            setCollections(data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load collections.");
        } finally {
            setLoading(false);
        }
    };

    const handleCreateCollection = async () => {
        if (!newCollection.trim() || submitting) return;

        setSubmitting(true);

        try {
            await createCollection(newCollection);

            toast.success("Collection created.");

            setNewCollection("");
            setShowInput(false);

            await fetchCollections();
        } catch (error) {
            console.error(error);
            toast.error("Failed to create collection.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleRenameCollection = async (id: number) => {
        if (!editingName.trim() || submitting) return;

        setSubmitting(true);

        try {
            await updateCollection(id, editingName);

            toast.success("Collection renamed.");

            setEditingId(null);
            setEditingName("");

            await fetchCollections();
        } catch (error) {
            console.error(error);
            toast.error("Failed to rename collection.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteCollection = async (id: number) => {
        if (submitting) return;

        const confirmed = window.confirm(
            "Are you sure you want to delete this collection?"
        );

        if (!confirmed) return;

        setSubmitting(true);

        try {
            await deleteCollection(id);

            toast.success("Collection deleted.");

            if (selectedCollectionId === id) {
                onSelectCollection(null);
            }

            await fetchCollections();
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete collection.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm">

            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Collections
                </h2>

                <button
                    onClick={() => setShowInput(true)}
                    className="text-2xl font-bold text-blue-600 transition hover:scale-110"
                >
                    +
                </button>
            </div>

            {/* Create Collection */}
            {showInput && (
                <div className="mb-4 space-y-2">

                    <input
                        type="text"
                        placeholder="Collection name"
                        value={newCollection}
                        onChange={(e) => setNewCollection(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    />

                    <div className="flex gap-2">

                        <button
                            disabled={submitting}
                            onClick={handleCreateCollection}
                            className="rounded-lg bg-blue-600 px-3 py-2 text-white transition hover:bg-blue-700 disabled:opacity-60"
                        >
                            Create
                        </button>

                        <button
                            disabled={submitting}
                            onClick={() => {
                                setShowInput(false);
                                setNewCollection("");
                            }}
                            className="rounded-lg border border-gray-300 dark:border-zinc-700 px-3 py-2 transition hover:bg-gray-100 dark:hover:bg-zinc-800"
                        >
                            Cancel
                        </button>

                    </div>

                </div>
            )}

            {/* All Prompts */}
            <button
                onClick={() => onSelectCollection(null)}
                className={`mb-2 w-full rounded-lg px-3 py-2 text-left transition ${selectedCollectionId === null
                        ? "bg-blue-600 text-white"
                        : "hover:bg-gray-100 dark:hover:bg-zinc-800 dark:text-gray-200"
                    }`}
            >
                📁 All Prompts
            </button>

            {/* Loading */}
            {loading ? (
                <div className="flex justify-center py-8">
                    <Spinner size="sm" />
                </div>
            ) : collections.length === 0 ? (
                <div className="rounded-lg border border-dashed border-gray-300 dark:border-zinc-700 p-4 text-center text-sm text-gray-500 dark:text-gray-400">
                    No collections found.
                </div>
            ) : (
                <div className="space-y-2">

                    {collections.map((collection) => (
                        <div
                            key={collection.id}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => {
                                e.preventDefault();

                                const promptId = Number(
                                    e.dataTransfer.getData("text/plain")
                                );

                                if (!promptId) return;

                                onDropPrompt(promptId, collection.id);
                            }}
                            className={`flex items-center justify-between rounded-lg px-3 py-2 transition ${selectedCollectionId === collection.id
                                    ? "bg-blue-600 text-white"
                                    : "hover:bg-gray-100 dark:hover:bg-zinc-800"
                                }`}
                        >
                            {editingId === collection.id ? (
                                <input
                                    value={editingName}
                                    onChange={(e) => setEditingName(e.target.value)}
                                    className="flex-1 rounded border px-2 py-1 text-black"
                                />
                            ) : (
                                <button
                                    onClick={() => onSelectCollection(collection.id)}
                                    className="flex-1 text-left"
                                >
                                    📁 {collection.name}
                                </button>
                            )}

                            {editingId === collection.id ? (
                                <button
                                    disabled={submitting}
                                    onClick={() => handleRenameCollection(collection.id)}
                                    className="ml-2 rounded bg-green-600 px-2 py-1 text-sm text-white transition hover:bg-green-700 disabled:opacity-60"
                                >
                                    Save
                                </button>
                            ) : (
                                <div className="ml-2 flex items-center gap-2">

                                    <button
                                        title="Rename Collection"
                                        onClick={() => {
                                            setEditingId(collection.id);
                                            setEditingName(collection.name);
                                        }}
                                        className="transition hover:scale-110"
                                    >
                                        ✏️
                                    </button>

                                    <button
                                        title="Delete Collection"
                                        onClick={() =>
                                            handleDeleteCollection(collection.id)
                                        }
                                        className="transition hover:scale-110"
                                    >
                                        🗑️
                                    </button>

                                </div>
                            )}
                        </div>
                    ))}

                </div>
            )}
        </div>
    );
}