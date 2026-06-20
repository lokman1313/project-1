"use client";

import { Button, Input } from "@heroui/react";
import { FaSearch, FaFire } from "react-icons/fa";
import { motion } from "motion/react";

const trendingTags = [
  "Trending Position",
  "Product Designer",
  "AI Engineering",
  "DevOps Engineer",
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden text-white">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black" />

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="flex min-h-screen flex-col items-center justify-center py-20">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md"
          >
            <FaFire className="text-orange-500" />
            <span className="font-semibold">50,000+</span>
            <span className="text-sm text-gray-400">
              NEW JOBS THIS MONTH
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-8 max-w-5xl text-center text-4xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Find Your Dream Job Today
          </motion.h1>

          {/* Paragraph (left + right split animation) */}
          <div className="mx-auto mt-6 max-w-2xl text-center text-gray-400 md:text-lg">
            <motion.p
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              JobFinder connects top talent
            </motion.p>

            <motion.p
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              with world-class companies. Browse thousands of curated opportunities
              and discover your next career move faster.
            </motion.p>
          </div>

          {/* Search Section */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-10 w-full max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
          >
            <div className="flex flex-col gap-4 md:flex-row">

              <Input
                size="lg"
                radius="lg"
                variant="bordered"
                placeholder="Job title, skill, or company"
                className="w-full md:flex-1"
              />

              <Input
                size="lg"
                radius="lg"
                variant="bordered"
                placeholder="Location or Remote"
                className="w-full md:max-w-xs"
              />

              <Button
                color="primary"
                size="lg"
                radius="lg"
                className="w-full px-8 font-semibold md:w-auto bg-cyan-600"
              >
                <FaSearch />
                Search Jobs
              </Button>

            </div>
          </motion.div>

          {/* Trending Tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            {trendingTags.map((tag, i) => (
              <motion.button
                key={tag}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 transition-all duration-300 hover:bg-white/10"
              >
                {tag}
              </motion.button>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}