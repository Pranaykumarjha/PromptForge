"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";

interface ProtectedRouteProps {
    children: ReactNode;
}

export default function ProtectedRoute({
    children,
}: ProtectedRouteProps) {
    const router = useRouter();

    const { isAuthenticated, isReady } = useAuth();

    useEffect(() => {
        if (isReady && !isAuthenticated) {
            router.replace("/login");
        }
    }, [isAuthenticated, isReady, router]);

    if (!isReady || !isAuthenticated) {
        return null;
    }

    return <>{children}</>;
}