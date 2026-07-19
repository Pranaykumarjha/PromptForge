import api from "@/lib/axios";
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from "@/types/auth";

export const register = async (data: RegisterRequest) => {
  const response = await api.post("/api/users/register", data);
  return response.data;
};

export const login = async (
  data: LoginRequest
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    "/api/users/login",
    data
  );
  return response.data;
};