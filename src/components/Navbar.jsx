"use client";

import { useState } from "react";
import { Link, Button } from "@heroui/react";
import Image from "next/image";
import logo from "../../public/logo.png"
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Browse Jobs", href: "/jobs" },
    { label: "Company", href: "/company" },
    { label: "Pricing", href: "/pricing" },
  ];

  return (
    <div className="sticky top-0 z-50 px-3 py-4 sm:px-4 lg:px-6">
      <nav className="mx-auto rounded-2xl border border-white/10 bg-[#121212]/90 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center">
           <Image src={logo} alt="logo" width={150} height={150}></Image>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            <ul className="flex items-center gap-6 lg:gap-8">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-gray-300 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Divider */}
            <div className="h-6 w-px bg-white/15" />

            {/* Auth */}
            <div className="flex items-center gap-4 lg:gap-5">
              <Link
                href="/signin"
                className="text-sm font-medium text-indigo-400 hover:text-indigo-300"
              >
                Sign In
              </Link>

              <Button
                radius="md"
                className="bg-indigo-600 px-5 lg:px-6 text-white hover:bg-indigo-500"
              >
                Get Started
              </Button>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center md:hidden"
            aria-label="Toggle Menu"
          >
            <svg
              className="h-6 w-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`overflow-hidden transition-all duration-300 md:hidden ${
            isMenuOpen
              ? "max-h-[400px] border-t border-white/10"
              : "max-h-0"
          }`}
        >
          <div className="space-y-4 p-5">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block text-gray-300 hover:text-white"
                onPress={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <div className="border-t border-white/10 pt-4">
              <div className="flex flex-col gap-3">
                <Link
                  href="/signin"
                  className="text-indigo-400"
                  onPress={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>

                <Button
                  className="w-full bg-indigo-600 text-white"
                  radius="md"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}