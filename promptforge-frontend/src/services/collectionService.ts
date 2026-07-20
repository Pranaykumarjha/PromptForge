import api from "@/lib/axios";
import { Collection } from "@/types/collection";

export const getAllCollections = async (): Promise<Collection[]> => {
    const response = await api.get("/api/collections");
    return response.data;
};

export const getCollectionById = async (
    id: number
): Promise<Collection> => {
    const response = await api.get(`/api/collections/${id}`);
    return response.data;
};

export const createCollection = async (
    name: string
): Promise<Collection> => {
    const response = await api.post("/api/collections", {
        name,
    });

    return response.data;
};

export const updateCollection = async (
    id: number,
    name: string
): Promise<Collection> => {
    const response = await api.put(`/api/collections/${id}`, {
        name,
    });

    return response.data;
};

export const deleteCollection = async (
    id: number
): Promise<void> => {
    await api.delete(`/api/collections/${id}`);
};