"use client";
import { useSearchParams } from "next/navigation";
import { LoginForm } from "@/components/login-form";
import { ResetForm } from "@/components/reset";

export default function Page() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <ResetForm />
      </div>
    </div>
  );
}
