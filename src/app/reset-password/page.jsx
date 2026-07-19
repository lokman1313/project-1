"use client";

import { useState, Suspense } from "react";
import { Input, Button, TextField, Label, InputGroup } from "@heroui/react";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Password reset token is missing or invalid.");
      return;
    }

    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const { password, confirmPassword } = Object.fromEntries(formData.entries());

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      setLoading(false);
      return;
    }

    const { data, error } = await authClient.resetPassword({
      newPassword: password,
      token: token,
    });

    setLoading(false);

    if (error) {
      toast.error(error.message || "Failed to reset password.");
      console.error(error);
      return;
    }

    toast.success("Password reset successfully! Redirecting to sign in...");
    setTimeout(() => {
      router.push("/signin");
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <TextField className="w-full">
        <Label className="flex items-center gap-2 text-zinc-300">
          <FaLock className="text-zinc-500" /> New Password
        </Label>
        <InputGroup>
          <InputGroup.Input
            name="password"
            type={isVisible ? "text" : "password"}
            placeholder="Min. 8 characters"
            required
            className="bg-[#18181b] border-zinc-800 focus:border-cyan-500 text-zinc-200"
          />
          <InputGroup.Suffix>
            <Button
              isIconOnly
              variant="light"
              size="sm"
              type="button"
              onPress={() => setIsVisible(!isVisible)}
              className="text-zinc-500 hover:text-zinc-300"
            >
              {isVisible ? <FaEyeSlash /> : <FaEye />}
            </Button>
          </InputGroup.Suffix>
        </InputGroup>
      </TextField>

      <TextField className="w-full">
        <Label className="flex items-center gap-2 text-zinc-300">
          <FaLock className="text-zinc-500" /> Confirm New Password
        </Label>
        <InputGroup>
          <InputGroup.Input
            name="confirmPassword"
            type={isVisible ? "text" : "password"}
            placeholder="Re-enter your password"
            required
            className="bg-[#18181b] border-zinc-800 focus:border-cyan-500 text-zinc-200"
          />
          <InputGroup.Suffix>
            <Button
              isIconOnly
              variant="light"
              size="sm"
              type="button"
              onPress={() => setIsVisible(!isVisible)}
              className="text-zinc-500 hover:text-zinc-300"
            >
              {isVisible ? <FaEyeSlash /> : <FaEye />}
            </Button>
          </InputGroup.Suffix>
        </InputGroup>
      </TextField>

      <Button
        type="submit"
        color="primary"
        className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold"
        isLoading={loading}
      >
        Reset Password
      </Button>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-10 bg-[#09090b]">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-[#121214] shadow-xl">
        <div className="p-8">
          <div className="mb-8 text-center space-y-2">
            <h1 className="text-3xl font-extrabold text-white">Reset Password</h1>
            <p className="text-zinc-400 text-sm">
              Enter your new password below.
            </p>
          </div>

          <Suspense fallback={
            <div className="flex items-center justify-center py-6">
              <span className="w-6 h-6 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
            </div>
          }>
            <ResetPasswordForm />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
