"use client";

import { useEffect, useState } from "react";
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

    useEffect(() => {
        fetchCollections();
    }, []);

    const fetchCollections = async () => {
        try {
            const data = await getAllCollections();
            setCollections(data);
        } catch (error) {
            console.error("Failed to fetch collections:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateCollection = async () => {
        if (!newCollection.trim()) return;

        try {
            await createCollection(newCollection);

            setNewCollection("");
            setShowInput(false);

            await fetchCollections();
        } catch (error) {
            console.error("Failed to create collection:", error);
        }
    };

    const handleRenameCollection = async (id: number) => {
        if (!editingName.trim()) return;

        try {
            await updateCollection(id, editingName);

            setEditingId(null);
            setEditingName("");

            await fetchCollections();
        } catch (error) {
            console.error("Failed to rename collection:", error);
        }
    };

    const handleDeleteCollection = async (id: number) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this collection?"
        );

        if (!confirmed) return;

        try {
            await deleteCollection(id);

            if (selectedCollectionId === id) {
                onSelectCollection(null);
            }

            await fetchCollections();
        } catch (error) {
            console.error("Failed to delete collection:", error);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow p-5">

            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                    Collections
                </h2>

                <button
                    onClick={() => setShowInput(true)}
                    className="text-xl font-bold text-blue-600 hover:text-blue-800"
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
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <div className="flex gap-2">
                        <button
                            onClick={handleCreateCollection}
                            className="rounded-lg bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
                        >
                            Create
                        </button>

                        <button
                            onClick={() => {
                                setShowInput(false);
                                setNewCollection("");
                            }}
                            className="rounded-lg border px-3 py-2 hover:bg-gray-100"
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
                    : "hover:bg-gray-100"
                    }`}
            >
                📁 All Prompts
            </button>

            {/* Collections */}
            {loading ? (
                <p className="text-sm text-gray-500">
                    Loading collections...
                </p>
            ) : collections.length === 0 ? (
                <p className="text-sm text-gray-500">
                    No collections found.
                </p>
            ) : (
                <div className="space-y-2">

                    {collections.map((collection) => (
                        <div
                            key={collection.id}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => {
                                e.preventDefault();

                                const raw = e.dataTransfer.getData("text/plain");
                                console.log("Raw drag data:", raw);

                                const promptId = Number(raw);
                                console.log("Parsed promptId:", promptId);

                                if (!promptId) return;

                                onDropPrompt(promptId, collection.id);
                            }}
                            className={`flex items-center justify-between rounded-lg px-3 py-2 transition ${selectedCollectionId === collection.id
                                ? "bg-blue-600 text-white"
                                : "hover:bg-gray-100"
                                }`}
                        >
                            {editingId === collection.id ? (
                                <input
                                    value={editingName}
                                    onChange={(e) =>
                                        setEditingName(e.target.value)
                                    }
                                    className="flex-1 rounded border px-2 py-1 text-black"
                                />
                            ) : (
                                <button
                                    onDragOver={(e) => e.preventDefault()}
                                    onClick={() =>
                                        onSelectCollection(collection.id)
                                    }
                                    className="flex-1 text-left"
                                >
                                    📁 {collection.name}
                                </button>
                            )}

                            {editingId === collection.id ? (
                                <button
                                    onClick={() =>
                                        handleRenameCollection(collection.id)
                                    }
                                    className="ml-2 rounded bg-green-600 px-2 py-1 text-sm text-white hover:bg-green-700"
                                >
                                    Save
                                </button>
                            ) : (
                                <div className="ml-2 flex items-center gap-2">

                                    <button
                                        onClick={() => {
                                            setEditingId(collection.id);
                                            setEditingName(collection.name);
                                        }}
                                        title="Rename Collection"
                                    >
                                        ✏️
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleDeleteCollection(collection.id)
                                        }
                                        title="Delete Collection"
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