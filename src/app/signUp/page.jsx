"use client";

import { useState } from "react";
import {
  Input,
  Button,
  TextField,
  Label,
  InputGroup,
  Separator,
  RadioGroup,
  Radio,
  Description,
} from "@heroui/react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";

const SignUp = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchParams= useSearchParams().get("redirect") || "/"
  const router =useRouter()

  // Email/Password Sign Up
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const { name, email, password ,role} = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signUp.email({
      name,
      email,
      password,
      role,
      
    });

    setLoading(false);

    if (error) {
      console.error(error);
      return;
    }
    else if(data){
      router.push(searchParams)
    }
  };

  // Google Sign Up
  const handleGoogleSignUp = async () => {
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: searchParams,
    });

    if (error) {
      console.error(error);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-10 bg-background">
      <div className="w-full max-w-md rounded-2xl border border-default-200 bg-content1 shadow-lg">
        <div className="p-8">

          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">Create Account</h1>
            <p className="text-default-500 mt-2">
              Sign up to get started
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <TextField className="w-full">
              <Label>Name</Label>
              <Input
                name="name"
                type="text"
                placeholder="Enter your name"
                required
              />
            </TextField>

            {/* Email */}
            <TextField className="w-full">
              <Label>Email</Label>
              <Input
                name="email"
                type="email"
                placeholder="Enter your email"
                required
              />
            </TextField>

            {/* Password */}
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
                    onPress={() => setIsVisible(!isVisible)}
                    aria-label={isVisible ? "Hide password" : "Show password"}
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

            {/* role group */}
            <div className="flex flex-col gap-4">
      <Label>Your Posison</Label>
      <RadioGroup defaultValue="seeker" name="role" orientation="horizontal">
        <Radio value="seeker">
          <Radio.Control>
            <Radio.Indicator />
          </Radio.Control>
          <Radio.Content>
            <Label>Job Seeker</Label>
            
          </Radio.Content>
        </Radio>
        <Radio value="recruiter">
          <Radio.Control>
            <Radio.Indicator />
          </Radio.Control>
          <Radio.Content>
            <Label>Recruiter</Label>
            
          </Radio.Content>
        </Radio>
        
      </RadioGroup>
    </div>

            {/* Submit */}
            <Button
              type="submit"
              color="primary"
              className="w-full"
              isLoading={loading}
            >
              Create Account
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs text-default-500">OR</span>
            <Separator className="flex-1" />
          </div>

          {/* Google Auth */}
          <Button
            onPress={handleGoogleSignUp}
            className="w-full h-12 bg-slate-900 text-white hover:bg-slate-800 font-medium transition-all duration-200"
          >
            <FaGoogle className="text-blue-400 text-lg" />
            Continue with Google
          </Button>

          {/* Footer */}
          <p className="text-center text-sm text-default-500 mt-6">
            Already have an account?{" "}
            <Link
              href={`/signin?redirect=${searchParams}`}
              className="text-primary font-medium hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;