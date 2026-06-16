"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import {
  FaCheck,
  FaTimes,
  FaBriefcase,
  FaUserGraduate,
  FaRocket,
  FaCrown,
  FaArrowRight,
} from "react-icons/fa";

const rolePlans = {
  seeker: [
    {
      name: "Free",
      price: 0,
      icon: <FaUserGraduate />,
      description: "Basic profile and entry-level access",
      features: [
        "Apply to jobs: Up to 3/month",
        "Saved jobs: Up to 10",
        "Basic profile setup",
        "Email alerts",
      ],
      featured: false,
    },
    {
      name: "Pro",
      price: 19,
      icon: <FaRocket />,
      description: "Perfect for active job hunters",
      features: [
        "Apply to jobs: Up to 30 / month",
        "Unlimited saved jobs",
        "Application tracking",
        "Salary insights",
      ],
      featured: true,
    },
    {
      name: "Premium",
      price: 39,
      icon: <FaCrown />,
      description: "Maximum leverage for your career",
      features: [
        "Unlimited job applications",
        "Unlimited saved jobs",
        "Profile boost",
        "Early access to new jobs",
        "Priority support",
      ],
      featured: false,
    },
  ],
  recruiter: [
    {
      name: "Free",
      price: 0,
      icon: <FaBriefcase />,
      description: "Ideal for your first year of hiring",
      features: [
        "Active Job Posts: Up to 3",
        "Analytics: ✗",
        "Basic applicant management",
        "Standard visibility",
      ],
      featured: false,
    },
    {
      name: "Growth",
      price: 49,
      icon: <FaRocket />,
      description: "As your hiring starts to scale",
      features: [
        "Active Job Posts: Up to 10",
        "Analytics: Basic",
        "Applicant tracking",
        "Email support",
      ],
      featured: true,
    },
    {
      name: "Enterprise",
      price: 149,
      icon: <FaCrown />,
      description: "Advanced tools for growing teams",
      features: [
        "Active Job Posts: Up to 50",
        "Analytics: Advanced",
        "Featured listings",
        "Team collaboration",
        "Custom branding",
        "Priority support",
      ],
      featured: false,
    },
  ],
};

export default function PricingSection() {
  const [role, setRole] = useState("seeker");

  const currentPlans = rolePlans[role];

  return (
    <section className="bg-black py-24 text-white">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section Label */}
        <div className="mb-4 flex justify-center">
          <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1 text-xs font-medium uppercase tracking-[0.3em] text-violet-400">
            Pricing Plans
          </span>
        </div>

        {/* Dynamic Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold md:text-5xl tracking-tight">
            Pay for the leverage,
            <br />
            <span className="bg-gradient-to-r from-violet-400 to-pink-500 bg-clip-text text-transparent">
              not the listings
            </span>
          </h2>
          <p className="mt-4 text-gray-400">
            {role === "seeker"
              ? "Choose the plan that fits your career growth and scales your opportunities."
              : "New companies can post up to 3 active jobs for free — ideal for their first year of hiring — and upgrade as scaling demands."}
          </p>
        </div>

        {/* Role Toggle Switch */}
        <div className="mt-10 flex justify-center">
          <div className="flex items-center rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-md">
            <button
              onClick={() => setRole("seeker")}
              className={`rounded-full px-6 py-2 text-sm font-medium transition-all duration-300 ${
                role === "seeker"
                  ? "bg-white text-black shadow-sm"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Job Seekers
            </button>

            <button
              onClick={() => setRole("recruiter")}
              className={`rounded-full px-6 py-2 text-sm font-medium transition-all duration-300 ${
                role === "recruiter"
                  ? "bg-white text-black shadow-sm"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Recruiters
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {currentPlans.map((plan) => {
            return (
              <div
                key={plan.name}
                className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-1 ${
                  plan.featured
                    ? "border-violet-500/30 bg-white/[0.07] shadow-[0_0_40px_rgba(139,92,246,0.15)]"
                    : "border-white/10 bg-white/[0.03]"
                }`}
              >
                {plan.featured && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent" />
                    <div className="absolute right-5 top-5 rounded-full bg-violet-500/20 px-3 py-1 text-xs font-medium text-violet-300">
                      Popular
                    </div>
                  </>
                )}

                {/* Header */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-white/10 p-2 text-violet-400">
                      {plan.icon}
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg">{plan.name}</h3>
                      <p className="text-xs text-gray-400">
                        {plan.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="relative z-10 mt-8">
                  <div className="flex items-start">
                    <span className="text-5xl font-bold">
                      ${plan.price}
                    </span>
                    <span className="ml-2 mt-2 text-sm text-gray-400">
                      /month
                    </span>
                  </div>
                </div>

                {/* Features List */}
                <ul className="mt-8 flex-1 space-y-3">
                  {plan.features.map((feature, idx) => {
                    // Check if feature contains a cross '✗'
                    const isUnsupported = feature.includes("✗");

                    return (
                      <li
                        key={idx}
                        className={`flex items-center gap-3 text-sm ${
                          isUnsupported ? "text-gray-500 line-through decoration-white/10" : "text-gray-300"
                        }`}
                      >
                        <div className={`flex h-5 w-5 items-center justify-center rounded-full ${
                          isUnsupported ? "bg-white/5 text-gray-500" : "bg-white/10"
                        }`}>
                          {isUnsupported ? (
                            <FaTimes className="text-[10px]" />
                          ) : (
                            <FaCheck className="text-[10px]" />
                          )}
                        </div>

                        <span>{feature}</span>
                      </li>
                    );
                  })}
                </ul>

                {/* CTA Button */}
                <Button
                  radius="full"
                  className={`mt-8 h-12 w-full font-medium ${
                    plan.featured
                      ? "bg-white text-black"
                      : "bg-white/10 text-white"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    Choose This Plan
                    <FaArrowRight />
                  </span>
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}