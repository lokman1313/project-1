"use client";

import { useState } from "react";
import { Input, Button, TextField, Label } from "@heroui/react";
import { FaEnvelope, FaArrowLeft, FaLink } from "react-icons/fa";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { getResetLinkForTesting } from "@/lib/action/users";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [resetLink, setResetLink] = useState("");
  const [inputEmail, setInputEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const { email } = Object.fromEntries(formData.entries());
    setInputEmail(email);

    // Call Better Auth forgetPassword API
    const { data, error } = await authClient.forgetPassword({
      email,
      redirectTo: "/reset-password",
    });

    // Wait a brief moment to let DB write finish
    await new Promise((r) => setTimeout(r, 1000));

    // Fetch the reset link from the database (ideal for local development/testing without SMTP)
    const dbTokenRes = await getResetLinkForTesting(email);

    setLoading(false);

    if (dbTokenRes.success) {
      setEmailSent(true);
      setResetLink(dbTokenRes.resetLink);
      toast.success("Password reset token generated!");
    } else if (error) {
      toast.error(error.message || "Failed to initiate password reset.");
    } else {
      toast.error("User not found or database error.");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-10 bg-[#09090b]">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-[#121214] shadow-xl">
        <div className="p-8">
          
          <div className="mb-6">
            <Link
              href="/signin"
              className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-500 hover:text-cyan-400 transition"
            >
              <FaArrowLeft /> Back to Sign In
            </Link>
          </div>

          <div className="mb-8 text-center space-y-2">
            <h1 className="text-3xl font-extrabold text-white">Forgot Password</h1>
            <p className="text-zinc-400 text-sm">
              Enter your email address and we'll send you instructions to reset your password.
            </p>
          </div>

          {!emailSent ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <TextField className="w-full" name="email" type="email">
                <Label className="flex items-center gap-2 text-zinc-300">
                  <FaEnvelope className="text-zinc-500" /> Email Address
                </Label>
                <Input
                  name="email"
                  placeholder="name@example.com"
                  type="email"
                  required
                  className="bg-[#18181b] border-zinc-800 focus:border-cyan-500 text-zinc-200"
                />
              </TextField>

              <Button
                type="submit"
                color="primary"
                className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold"
                isLoading={loading}
              >
                Send Reset Link
              </Button>
            </form>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-emerald-950/50 text-emerald-400 border border-emerald-900/30">
                <FaEnvelope />
              </div>
              <h3 className="text-lg font-semibold text-zinc-200">Check Your Inbox</h3>
              <p className="text-sm text-zinc-500 max-w-xs mx-auto">
                If an account exists for {inputEmail}, reset instructions have been generated.
              </p>

              {/* Developer/Testing Link Fallback */}
              {resetLink && (
                <div className="mt-6 p-4 bg-zinc-900/80 border border-zinc-850 rounded-xl text-left space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
                    <FaLink /> TEST RESET LINK (No SMTP needed)
                  </div>
                  <p className="text-[11px] text-zinc-500">
                    Since SMTP is not configured in this environment, you can use the direct link below to reset your password:
                  </p>
                  <Link
                    href={resetLink}
                    className="block text-center text-xs font-semibold bg-zinc-800 hover:bg-zinc-750 text-white py-2.5 rounded-lg border border-zinc-700 transition"
                  >
                    Click to Reset Password
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
