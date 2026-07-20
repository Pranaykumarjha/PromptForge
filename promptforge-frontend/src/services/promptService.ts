import api from "@/lib/axios";
import { Prompt } from "@/types/prompt";

export const getAllPrompts = async (): Promise<Prompt[]> => {
    const response = await api.get("/api/prompts");
    return response.data;
};

export const getPromptById = async (
    id: number
): Promise<Prompt> => {
    const response = await api.get(`/api/prompts/${id}`);
    return response.data;
};

export const deletePrompt = async (
    id: number
): Promise<void> => {
    await api.delete(`/api/prompts/${id}`);
};

export const toggleFavorite = async (
    id: number
): Promise<Prompt> => {
    const response = await api.put(`/api/prompts/${id}/favorite`);
    return response.data;
};

export const searchPrompts = async (
    keyword: string
): Promise<Prompt[]> => {
    const response = await api.get("/api/prompts/search", {
        params: {
            keyword,
        },
    });

    return response.data;
};

export const getFavoritePrompts = async (): Promise<Prompt[]> => {
    const response = await api.get("/api/prompts/favorites");
    return response.data;
};

export const assignPromptToCollection = async (
    promptId: number,
    collectionId: number
): Promise<Prompt> => {
    const response = await api.put(
        `/api/prompts/${promptId}/collection/${collectionId}`
    );

    return response.data;
};
export interface UpdatePromptRequest {
    title: string;
    content: string;
}

export const updatePrompt = async (
    id: number,
    data: UpdatePromptRequest
): Promise<Prompt> => {
    const response = await api.put(`/api/prompts/${id}`, data);
    return response.data;
};