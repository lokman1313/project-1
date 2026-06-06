"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import {
  FaCheck,
  FaChartLine,
  FaBolt,
  FaCrown,
  FaArrowRight,
} from "react-icons/fa";

const plans = [
  {
    name: "Starter",
    monthlyPrice: 0,
    yearlyPrice: 0,
    icon: <FaCheck />,
    description: "Perfect for getting started",
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
    featured: false,
  },
  {
    name: "Growth",
    monthlyPrice: 17,
    yearlyPrice: 153, // 25% off from $204/year
    icon: <FaChartLine />,
    description: "Most popular for professionals",
    features: [
      "Daily AI match brief (top 20)",
      "Verified salary bands",
      "Company insight dashboards",
      "Priority AI recommendations",
    ],
    featured: true,
  },
  {
    name: "Premium",
    monthlyPrice: 99,
    yearlyPrice: 891, // 25% off from $1188/year
    icon: <FaBolt />,
    description: "Advanced tools for power users",
    features: [
      "Everything in Growth",
      "Multi-profile career portfolios",
      "Shared talent rooms",
      "Recruiter view (read-only)",
    ],
    featured: false,
  },
];

export default function PricingSection() {
  const [billing, setBilling] = useState("monthly");

  return (
    <section className="bg-black py-24 text-white">
      <div className="mx-auto max-w-7xl px-4">
        {/* Label */}
        <div className="mb-4 flex justify-center">
          <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1 text-xs font-medium uppercase tracking-[0.3em] text-violet-400">
            Pricing
          </span>
        </div>

        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold md:text-5xl">
            Pay for the leverage,
            <br />
            not the listings
          </h2>

          <p className="mt-4 text-gray-400">
            Choose the plan that fits your career growth and hiring goals.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="mt-10 flex justify-center">
          <div className="flex items-center rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-md">
            <button
              onClick={() => setBilling("monthly")}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                billing === "monthly"
                  ? "bg-white text-black shadow-sm"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Monthly
            </button>

            <button
              onClick={() => setBilling("yearly")}
              className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                billing === "yearly"
                  ? "bg-white text-black shadow-sm"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <span>Yearly</span>

              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                  billing === "yearly"
                    ? "bg-pink-500 text-white"
                    : "bg-pink-500/20 text-pink-400"
                }`}
              >
                Save 25%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => {
            const currentPrice =
              billing === "monthly"
                ? plan.monthlyPrice
                : plan.yearlyPrice;

            const yearlySavings =
              plan.monthlyPrice * 12 - plan.yearlyPrice;

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
                      <h3 className="font-semibold">{plan.name}</h3>
                      <p className="text-xs text-gray-400">
                        {plan.description}
                      </p>
                    </div>
                  </div>

                  {plan.featured && (
                    <FaCrown className="text-lg text-yellow-400" />
                  )}
                </div>

                {/* Price */}
                <div className="relative z-10 mt-8">
                  <div className="flex items-start">
                    <span className="text-5xl font-bold">
                      ${currentPrice}
                    </span>

                    <span className="ml-2 mt-2 text-sm text-gray-400">
                      /{billing === "monthly" ? "month" : "year"}
                    </span>
                  </div>

                  {billing === "yearly" && plan.monthlyPrice > 0 && (
                    <p className="mt-2 text-sm text-green-400">
                      Save ${yearlySavings} per year
                    </p>
                  )}
                </div>

                {/* Description */}
                <p className="mt-4 text-sm text-gray-400">
                  Start building your insights hub:
                </p>

                {/* Features */}
                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 text-sm text-gray-300"
                    >
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10">
                        <FaCheck className="text-[10px]" />
                      </div>

                      <span>{feature}</span>
                    </li>
                  ))}
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