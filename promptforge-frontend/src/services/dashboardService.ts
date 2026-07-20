import api from "@/lib/axios";
import { DashboardSummary } from "@/types/dashboard";

export const getDashboardSummary = async (): Promise<DashboardSummary> => {
  const response = await api.get("/api/dashboard/summary");

  return response.data;
};