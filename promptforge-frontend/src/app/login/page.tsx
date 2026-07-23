"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import AuthInput from "@/components/auth/AuthInput";
import { loginSchema } from "@/lib/validators/auth";
import { login } from "@/services/authService";
import { useAuth } from "@/context/AuthContext";

import { LoginRequest } from "@/types/auth";

export default function LoginPage() {
  const router = useRouter();
  const { login: saveUser } = useAuth();

  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginRequest) => {
    if (loading) return;

    try {
      setApiError("");
      setLoading(true);

      const response = await login(data);

      saveUser(response);

      toast.success("Welcome back!");

      router.push("/");
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Invalid email or password.";

      setApiError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 dark:bg-zinc-950 px-4 transition-colors">
      <div className="w-full max-w-md rounded-xl bg-white dark:bg-zinc-900 p-8 shadow-lg border border-transparent dark:border-zinc-800">

        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Welcome Back
          </h1>

          <p className="text-sm text-slate-600 dark:text-gray-400">
            Sign in to continue to PromptForge.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-5"
        >
          <div>
            <AuthInput
              label="Email"
              type="email"
              placeholder="Enter your email"
              registration={register("email")}
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <AuthInput
              label="Password"
              type="password"
              placeholder="Enter your password"
              registration={register("password")}
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {apiError && (
            <p className="text-center text-sm text-red-500">
              {apiError}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-slate-900 dark:bg-blue-600 px-4 py-3 font-medium text-white transition-all duration-200 hover:scale-[1.02] hover:bg-slate-800 dark:hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </main>
  );
}