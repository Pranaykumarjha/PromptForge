"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";
import { AuthContextType, AuthResponse, User } from "@/types/auth";

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        try {
            const storedToken = localStorage.getItem("token");
            const storedUser = localStorage.getItem("user");

            if (!storedToken) {
                localStorage.removeItem("user");
                setToken(null);
                setUser(null);
                return;
            }

            if (
                !storedUser ||
                storedUser === "undefined" ||
                storedUser === "null"
            ) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                setToken(null);
                setUser(null);
                return;
            }

            const parsedUser = JSON.parse(storedUser) as User;

            if (
                parsedUser &&
                typeof parsedUser === "object" &&
                typeof parsedUser.email === "string" &&
                typeof parsedUser.name === "string"
            ) {
                setToken(storedToken);
                setUser(parsedUser);
            } else {
                throw new Error("Invalid stored user payload");
            }
        } catch (error) {
            console.warn("Failed to restore auth session:", error);
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setToken(null);
            setUser(null);
        }
    }, []);

    const login = (authData: AuthResponse) => {
        setUser(authData.user);
        setToken(authData.token);

        localStorage.setItem("token", authData.token);
        localStorage.setItem("user", JSON.stringify(authData.user));
    };

    const logout = () => {
        setUser(null);
        setToken(null);

        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated: !!token,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
}