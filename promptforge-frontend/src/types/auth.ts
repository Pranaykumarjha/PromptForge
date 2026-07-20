export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}
export interface LoginRequest {
    email: string;
    password: string;
}
export interface AuthResponse {
    token: string;
    user: User;
}
export interface User {
    id: number;
    name: string;
    email: string;
}
export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isReady: boolean;
  login: (authData: AuthResponse) => void;
  logout: () => void;
}