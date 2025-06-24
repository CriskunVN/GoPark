"use client";
import { useSearchParams } from "next/navigation";
import { LoginForm } from "@/components/login-form";

export default function Page() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success");

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        {success === "1" && (
          <p className="text-green-600 text-sm text-center mb-4">
            ✅ Account created successfully. Please log in to continue.
          </p>
        )}
        <LoginForm />
      </div>
    </div>
  );
}
