"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { FaExclamationTriangle, FaHome, FaRedo } from "react-icons/fa";

export default function ErrorPage({
  error,
  reset,
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-lg w-full text-center">
        {/* Icon */}
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-danger/10">
          <FaExclamationTriangle className="text-4xl text-danger" />
        </div>

        {/* Content */}
        <h1 className="mt-8 text-4xl font-bold text-foreground">
          Oops! Something went wrong
        </h1>

        <p className="mt-4 text-default-500">
          We encountered an unexpected error while processing your request.
          Please try again or return to the homepage.
        </p>

        {/* Error Message (development only) */}
        {process.env.NODE_ENV === "development" && error?.message && (
          <div className="mt-6 rounded-lg border border-danger/20 bg-danger/5 p-4 text-left">
            <p className="text-sm text-danger break-words">
              {error.message}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            color="primary"
            startContent={<FaRedo />}
            onPress={() => reset?.()}
          >
            Try Again
          </Button>

          <Button
            as={Link}
            href="/"
            variant="bordered"
            startContent={<FaHome />}
          >
            Back to Home
          </Button>
        </div>

        {/* Error Code */}
        <p className="mt-10 text-xs text-default-400">
          Error Code: 500
        </p>
      </div>
    </div>
  );
}