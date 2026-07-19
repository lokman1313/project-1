"use client";

import React, { useState } from "react";
import { FaBuilding, FaGlobe, FaMapMarkerAlt, FaUsers, FaSearch, FaBriefcase } from "react-icons/fa";
import Image from "next/image";

export default function CompaniesClient({ initialCompanies = [] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All");

  const getInitials = (name = "") => {
    return name
      .split(" ")
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const industries = ["All", ...new Set(initialCompanies.map((c) => c.industry).filter(Boolean))];

  const filteredCompanies = initialCompanies.filter((company) => {
    const matchesSearch =
      (company.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (company.description || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (company.location || "").toLowerCase().includes(searchTerm.toLowerCase());

    const matchesIndustry = selectedIndustry === "All" || company.industry === selectedIndustry;

    return matchesSearch && matchesIndustry;
  });

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Top Companies Hiring
          </h1>
          <p className="text-zinc-400 max-w-xl mx-auto text-base sm:text-lg">
            Discover world-class organizations, explore their culture, and find your next career opportunity.
          </p>
        </div>

        {/* Search & Filter section */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-[#121214] p-5 rounded-2xl border border-zinc-800/80 shadow-lg">
          {/* Search bar */}
          <div className="relative w-full md:max-w-md">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 text-sm" />
            <input
              type="text"
              placeholder="Search by company name, location, or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#18181b] border border-zinc-800 rounded-xl text-sm placeholder-zinc-500 text-zinc-200 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all"
            />
          </div>

          {/* Industry filter */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto py-1 no-scrollbar">
            {industries.map((industry) => (
              <button
                key={industry}
                onClick={() => setSelectedIndustry(industry)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all ${
                  selectedIndustry === industry
                    ? "bg-cyan-600 border-cyan-500 text-white shadow-lg shadow-cyan-600/15"
                    : "bg-[#18181b] border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
                }`}
              >
                {industry}
              </button>
            ))}
          </div>
        </div>

        {/* Grid listing */}
        {filteredCompanies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((company) => {
              const websiteDisplay = company.website?.replace(/^https?:\/\//, "");
              const websiteHref = company.website?.startsWith("http") ? company.website : `https://${company.website}`;

              return (
                <div
                  key={company._id}
                  className="bg-[#121214] border border-zinc-800/60 rounded-2xl p-6 flex flex-col justify-between hover:border-zinc-700/80 hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="space-y-4">
                    {/* Brand header */}
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12 rounded-xl bg-[#18181b] border border-zinc-800 flex items-center justify-center overflow-hidden shrink-0">
                        {company.logo ? (
                          <Image
                            src={company.logo}
                            alt={`${company.name} logo`}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="text-sm font-bold text-cyan-500">
                            {getInitials(company.name)}
                          </div>
                        )}
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors truncate">
                          {company.name}
                        </h3>
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-950/40 text-cyan-400 border border-cyan-900/30 capitalize">
                          {company.industry || "General"}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-zinc-400 line-clamp-3 leading-relaxed">
                      {company.description || "No description provided for this company."}
                    </p>
                  </div>

                  {/* Metadata and Link */}
                  <div className="mt-6 pt-4 border-t border-zinc-800/40 flex flex-col gap-3">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-zinc-500">
                      {company.location && (
                        <span className="flex items-center gap-1">
                          <FaMapMarkerAlt className="text-zinc-600" /> {company.location}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <FaUsers className="text-zinc-600" /> {company.employees || "1-10"} employees
                      </span>
                    </div>

                    {company.website && (
                      <a
                        href={websiteHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-medium transition-colors w-fit"
                      >
                        <FaGlobe className="text-[10px]" />
                        {websiteDisplay}
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#121214] rounded-3xl border border-zinc-850">
            <FaBuilding className="mx-auto text-4xl text-zinc-700 mb-4" />
            <h3 className="text-lg font-semibold text-zinc-200">No Companies Found</h3>
            <p className="text-zinc-500 mt-1 text-sm max-w-xs mx-auto">
              We couldn't find any companies matching your search or filters. Try adjusting your settings.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
