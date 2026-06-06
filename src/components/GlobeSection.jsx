"use client";

import {
  FaBriefcase,
  FaBuilding,
  FaUsers,
  FaStar,
} from "react-icons/fa";
import globe from "../../public/globe.png";

const stats = [
  {
    Icon: FaBriefcase,
    value: "50K",
    label: "Active Jobs",
  },
  {
    Icon: FaBuilding,
    value: "12K",
    label: "Companies",
  },
  {
    Icon: FaUsers,
    value: "2M",
    label: "Job Seekers",
  },
  {
    Icon: FaStar,
    value: "97%",
    label: "Satisfaction Rate",
  },
];

export default function GlobeSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      {/* Globe Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${globe.src})`,
        }}
      />

      {/* Glow Effect */}
      <div className="absolute left-1/2 top-24 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-indigo-600/30 blur-[140px]" />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-end px-4">
        <div className="pb-5 md:pb-16">
          {/* Heading */}
          <div className="text-center">
            <h2 className="text-3xl font-medium text-white md:text-5xl">
              Assisting over 15,000 job seekers
            </h2>

            <p className="mt-3 text-lg text-gray-300 md:text-3xl">
              find their dream positions.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {stats.map((item) => {
              const Icon = item.Icon;

              return (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-black/60 p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-black/70"
                >
                  <div className="mb-8 text-gray-400">
                    <Icon size={18} />
                  </div>

                  <h3 className="text-4xl font-bold text-white md:text-5xl">
                    {item.value}
                  </h3>

                  <p className="mt-3 text-sm text-gray-400">
                    {item.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}