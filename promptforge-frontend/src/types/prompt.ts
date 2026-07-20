export interface Prompt {
  id: number;
  title: string;
  content: string;
  collectionId: number | null;
  collectionName: string | null;
  favorite: boolean;
}