"use client";
import { UseFormRegisterReturn } from "react-hook-form";
interface AuthInputProps {
  label: string;
  type?: string;
  placeholder?: string;
  error?: string;
 registration: UseFormRegisterReturn;
}

export default function AuthInput({
  label,
  type = "text",
  placeholder,
  error,
  registration,
}: AuthInputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        className={`w-full rounded-lg border px-4 py-2 outline-none transition-colors ${
          error
            ? "border-red-500 focus:border-red-500"
            : "border-gray-300 focus:border-blue-500"
        }`}
        {...registration}
      />

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}