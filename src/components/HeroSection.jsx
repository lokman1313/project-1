"use client";

import { FaFire, FaSearch, FaBriefcase, FaArrowRight } from "react-icons/fa";
import { motion } from "motion/react";
import Link from "next/link";

const trendingTags = [
  "React Developer",
  "AI Engineer",
  "Product Designer",
  "DevOps specialist",
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-20 pb-16 text-white min-h-[85vh] flex items-center justify-center">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[#08080a]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370a_1px,transparent_1px),linear-gradient(to_bottom,#1f29370a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 px-5 py-2.5 backdrop-blur-md shadow-lg shadow-cyan-500/5"
          >
            <FaFire className="text-orange-500 animate-pulse text-sm" />
            <span className="font-bold text-xs tracking-wider text-cyan-400">50,000+</span>
            <span className="text-xs font-medium text-zinc-400">
              NEW CURATED JOBS THIS MONTH
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-8 max-w-5xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Find Your Dream Career <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-sm">
              Without the Friction
            </span>
          </motion.h1>

          {/* Subtitle / Paragraph */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-zinc-400 leading-relaxed"
          >
            JobFinder connects top builders with the world's most innovative companies. 
            Skip the generic pipelines and apply to verified positions directly.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-md"
          >
            <Link
              href="/jobs?page=1"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-600 px-8 py-4 font-bold text-white shadow-lg shadow-cyan-600/20 hover:bg-cyan-500 transition-all duration-300 hover:shadow-cyan-500/25 active:scale-[0.98]"
            >
              <FaSearch className="text-sm" /> Explore All Jobs
            </Link>
            <Link
              href="/company"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-[#121214]/60 px-8 py-4 font-bold text-zinc-200 hover:text-white hover:border-zinc-700 hover:bg-[#121214]/90 transition-all duration-300 active:scale-[0.98]"
            >
              <FaBriefcase className="text-sm" /> Browse Companies <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Trending Tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 flex flex-wrap justify-center items-center gap-3"
          >
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mr-2">Trending Searches:</span>
            {trendingTags.map((tag, i) => (
              <motion.button
                key={tag}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.08 }}
                className="rounded-xl border border-zinc-800 bg-[#121214]/40 px-4 py-2 text-xs font-medium text-zinc-400 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-cyan-500/5 transition-all duration-300"
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