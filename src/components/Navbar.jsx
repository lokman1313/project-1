"use client";

import { useState } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { Button } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import logo from "../../public/logo.png";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const navItems = [
    { label: "Browse Jobs", href: "/jobs?page=1" },
    { label: "Company", href: "/company" },
    { label: "Pricing", href: "/pricing" },
  ];

  const dashboardLinks ={
    seeker: "/dashbord/seeker",
    recruiter: "/dashbord/reqruiter",
    admin : "/dashbord/admin",
  }

  if(user?.email){
    navItems.push({
      label: "Dashboard", href: dashboardLinks[user.role || "seeker"]
    })
  }

  return (
    <header className="sticky top-0 z-50 px-3 py-4 sm:px-4 lg:px-6">
      <nav className="mx-auto rounded-2xl border border-white/10 bg-[#121212]/90 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* Logo */}
          <NextLink href="/" className="flex items-center justify-center gap-2">
            <Image src={logo} alt="Logo" width={50} height={50} />
            <h2 className="text-3xl font-bold "><span>Job</span><span className="text-cyan-600">Finder</span></h2>
          </NextLink>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {navItems.map((item) => (
                <li key={item.label}>
                  <NextLink
                    href={item.href}
                    className="text-sm font-medium text-gray-300 hover:text-white transition"
                  >
                    {item.label}
                  </NextLink>
                </li>
              ))}
            </ul>

            <div className="h-6 w-px bg-white/10" />

            {/* Auth Section */}
            {user ? (
              <Button
                onPress={() => authClient.signOut()}
                className="bg-red-500/10 text-red-400 hover:bg-red-500/20"
                size="sm"
              >
                Logout
              </Button>
            ) : (
              <div className="flex items-center gap-4">
                <NextLink
                  href="/signin"
                  className="text-sm font-bold text-cyan-600 hover:text-indigo-300"
                >
                  Sign In
                </NextLink>

                <NextLink href="/signUp">
                  <Button className="bg-cyan-600 text-white hover:bg-indigo-500">
                    Get Started
                  </Button>
                </NextLink>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
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
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? "max-h-96 border-t border-white/10" : "max-h-0"
          }`}
        >
          <div className="p-5 space-y-4">
            {navItems.map((item) => (
              <NextLink
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block text-gray-300 hover:text-white"
              >
                {item.label}
              </NextLink>
            ))}

            <div className="border-t border-white/10 pt-4 space-y-3">
  {user ? (
    <Button
      onPress={() => {
        authClient.signOut();
        setIsMenuOpen(false);
      }}
      className="w-full bg-red-500/10 text-red-400 hover:bg-red-500/20"
      size="sm"
    >
      Logout
    </Button>
  ) : (
    <>
      <NextLink
        href="/signin"
        onClick={() => setIsMenuOpen(false)}
        className="block text-indigo-400"
      >
        Sign In
      </NextLink>

      <NextLink
        href="/signUp"
        onClick={() => setIsMenuOpen(false)}
      >
        <Button className="w-full bg-indigo-600 text-white">
          Get Started
        </Button>
      </NextLink>
    </>
  )}
</div>
          </div>
        </div>
      </nav>
    </header>
  );
}