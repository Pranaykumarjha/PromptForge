"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import AuthInput from "@/components/auth/AuthInput";

import { registerSchema } from "@/lib/validators/auth";
import { register as registerUser } from "@/services/authService";

import { RegisterRequest } from "@/types/auth";

export default function RegisterPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequest>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterRequest) => {
    if (loading) return;

    try {
      setLoading(true);
      setApiError("");

      await registerUser(data);

      toast.success("Account created successfully!");

      router.push("/login");
    } catch (error: any) {
      const message =
        error.response?.data?.message ??
        "Registration failed. Please try again.";

      setApiError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 dark:bg-zinc-950 px-4 transition-colors">
      <div className="w-full max-w-md rounded-xl border border-transparent bg-white p-8 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">

        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Create Account
          </h1>

          <p className="text-sm text-slate-600 dark:text-gray-400">
            Create your PromptForge account.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-5"
        >
          <div>
            <AuthInput
              label="Name"
              type="text"
              placeholder="Enter your name"
              registration={register("name")}
            />

            {errors.name && (
              <p className="mt-1 text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

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
            className="w-full rounded-lg bg-slate-900 px-4 py-3 font-medium text-white transition-all duration-200 hover:scale-[1.02] hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>
      </div>
    </main>
  );
}