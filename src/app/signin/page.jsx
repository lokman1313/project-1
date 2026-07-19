"use client";

import { useState } from "react";
import {
  Input,
  Button,
  TextField,
  Label,
  InputGroup,
  Separator,
} from "@heroui/react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

const SignInClient = () => {
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";

  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  const handelSignIn = async () => {
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: redirectPath,
    });

    if (error) {
      // safe fallback
    }
  };

  const handelSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    const { email, password } = userData;

    const { data, error } = await authClient.signIn.email({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    if (data) {
      router.push(redirectPath);
    }
  };

  return (
     <section className="min-h-screen flex items-center justify-center px-4 py-10 bg-background">
      <div className="w-full max-w-md rounded-2xl border border-default-200 bg-content1 shadow-lg">
        <div className="p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p className="text-default-500 mt-2">
              Sign in to your account
            </p>
          </div>

          <form onSubmit={handelSubmit} className="space-y-5">
            <TextField className="w-full" name="email" type="email">
              <Label>Email</Label>
              <Input
                name="email"
                placeholder="Enter your email"
                required
              />
            </TextField>

            <TextField className="w-full">
              <Label>Password</Label>

              <InputGroup>
                <InputGroup.Input
                  name="password"
                  type={isVisible ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                />

                <InputGroup.Suffix>
                  <Button
                    isIconOnly
                    variant="light"
                    size="sm"
                    type="button"
                    aria-label={
                      isVisible ? "Hide password" : "Show password"
                    }
                    onPress={() => setIsVisible(!isVisible)}
                  >
                    {isVisible ? (
                      <FaEyeSlash className="size-4" />
                    ) : (
                      <FaEye className="size-4" />
                    )}
                  </Button>
                </InputGroup.Suffix>
              </InputGroup>
            </TextField>

            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              color="primary"
              className="w-full"
            >
              Sign In
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs text-default-500">OR</span>
            <Separator className="flex-1" />
          </div>

          <Button
            onPress={handelSignIn}
            className="w-full h-12 bg-slate-900 text-white hover:bg-slate-800 font-medium transition-all duration-200"
          >
            <FaGoogle className="text-lg" />
            Sign in with Google
          </Button>

          <p className="text-center text-sm text-default-500 mt-6">
            Don't have an account?{" "}
            <Link
              href={`/signUp?redirect=${redirectPath}`}
              className="text-primary font-medium hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignInClient;