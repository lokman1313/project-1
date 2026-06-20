"use client";

import {
  FiSearch,
  FiTrendingUp,
  FiBriefcase,
  FiBookmark,
  FiZap,
  FiFileText,
  FiTarget,
  FiArrowUpRight,
} from "react-icons/fi";

const features = [
  {
    icon: FiSearch,
    title: "Smart Search",
    description: "Find your ideal job with advanced filters.",
  },
  {
    icon: FiTrendingUp,
    title: "Salary Insights",
    description: "Get real salary data to negotiate confidently.",
  },
  {
    icon: FiBriefcase,
    title: "Top Companies",
    description: "Apply to vetted companies that are hiring.",
  },
  {
    icon: FiBookmark,
    title: "Saved Jobs",
    description: "Manage apps & favorites on your dashboard.",
  },
  {
    icon: FiZap,
    title: "One-Click Apply",
    description: "Simplify your job applications for an easier process.",
  },
  {
    icon: FiFileText,
    title: "Resume Builder",
    description: "Create professional resumes with modern templates.",
  },
  {
    icon: FiTarget,
    title: "Skill-Based Matching",
    description: "Discover jobs that match your skills and experience.",
  },
  {
    icon: FiArrowUpRight,
    title: "Career Growth Resources",
    description: "Boost your career with quick interview tips.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-10 text-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <span className="h-1 w-1 rounded-full bg-indigo-500" />
            <span className="text-xs uppercase tracking-[0.25em] text-gray-400">
              Features Job
            </span>
            <span className="h-1 w-1 rounded-full bg-indigo-500" />
          </div>

          <h2 className="mx-auto max-w-xl text-4xl font-bold leading-tight md:text-5xl">
            Everything you need
            <br />
            to succeed
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="group flex gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition-all duration-300 hover:border-indigo-500/40 hover:bg-white/[0.04]"
              >
                {/* Icon */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent">
                  <Icon
                    size={18}
                    className="text-violet-300 transition group-hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div>
                  <h3 className="mb-2 text-sm font-semibold">
                    {feature.title}
                  </h3>

                  <p className="text-xs leading-5 text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}