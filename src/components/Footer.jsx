"use client";

import Link from "next/link";
import { FaFacebookF, FaPinterestP, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className=" text-gray-400">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold">
              <span >Job</span>
              <span className="text-cyan-600">Finder</span>
            </h2>

            <p className="max-w-xs text-sm leading-7 text-gray-500">
              The AI-native career platform. Built for people who take their
              work seriously.
            </p>

            <div className="flex items-center gap-3 pt-8">
              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-md bg-zinc-900 transition hover:bg-blue-600"
              >
                <FaFacebookF size={16} />
              </Link>

              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-md bg-indigo-600 transition hover:opacity-90"
              >
                <FaPinterestP size={16} />
              </Link>

              <Link
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-md bg-zinc-900 transition hover:bg-blue-700"
              >
                <FaLinkedinIn size={16} />
              </Link>
            </div>
          </div>

          {/* Links Wrapper */}
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 lg:col-span-3">
            {/* Product */}
            <div>
              <h3 className="mb-5 text-lg font-semibold text-indigo-400">
                Product
              </h3>

              <ul className="space-y-4">
                <li>
                  <Link href="#" className="hover:text-white transition">
                    Job discovery
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition">
                    Worker AI
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition">
                    Companies
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition">
                    Salary data
                  </Link>
                </li>
              </ul>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="mb-5 text-lg font-semibold text-indigo-400">
                Navigations
              </h3>

              <ul className="space-y-4">
                <li>
                  <Link href="#" className="hover:text-white transition">
                    Help center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition">
                    Career library
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="mb-5 text-lg font-semibold text-indigo-400">
                Resources
              </h3>

              <ul className="space-y-4">
                <li>
                  <Link href="#" className="hover:text-white transition">
                    Brand Guideline
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition">
                    Newsroom
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-zinc-800 pt-8 text-sm text-gray-500 md:flex-row">
          <p>Copyright © 2026 — Your Company</p>

          <div className="flex flex-wrap items-center gap-4">
            <Link href="#" className="hover:text-white transition">
              Terms & Policy
            </Link>
            <span className="hidden md:block">•</span>
            <Link href="#" className="hover:text-white transition">
              Privacy Guideline
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}