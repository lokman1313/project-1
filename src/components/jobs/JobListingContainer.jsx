"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import JobFilters from "./JobFilter";
import JobCard from "./JobCard";

export default function JobListingContainer({ initialJobs }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize filtering hooks from active URL state
  const [searchQuery, setSearchQuery] = useState(() => searchParams.get("search") || "");
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
  const [selectedType, setSelectedType] = useState(() => searchParams.get("type") || "all");
  const [selectedCategory, setSelectedCategory] = useState(() => searchParams.get("category") || "all");
  const [isRemoteOnly, setIsRemoteOnly] = useState(() => searchParams.get("remote") === "true");

  // Debounce search query input text changes by 300ms
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Push filter adjustments safely back into current window location path parameters
  useEffect(() => {
    const params = new URLSearchParams();

    if (debouncedSearch) params.set("search", debouncedSearch);
    if (selectedType !== "all") params.set("type", selectedType);
    if (selectedCategory !== "all") params.set("category", selectedCategory);
    if (isRemoteOnly) params.set("remote", "true");

    const query = params.toString();
    router.replace(`${pathname}${query ? `?${query}` : ""}`, { scroll: false });
  }, [debouncedSearch, selectedType, selectedCategory, isRemoteOnly, pathname, router]);

  // Compute matched filter matches instantly inside runtime memo block
  const filteredJobs = useMemo(() => {
    return (initialJobs || []).filter((job) => {
      const matchesSearch =
        !debouncedSearch ||
        job.jobTitle?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        job.companyName?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        job.requirements?.toLowerCase().includes(debouncedSearch.toLowerCase());

      const matchesType = selectedType === "all" || job.jobType === selectedType;
      const matchesCategory = selectedCategory === "all" || job.jobCategory === selectedCategory;
      const matchesRemote = !isRemoteOnly || job.isRemote === true;

      return matchesSearch && matchesType && matchesCategory && matchesRemote;
    });
  }, [debouncedSearch, selectedType, selectedCategory, isRemoteOnly, initialJobs]);

  return (
    <>
      <JobFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        isRemoteOnly={isRemoteOnly}
        setIsRemoteOnly={setIsRemoteOnly}
      />

      <div className="max-w-7xl mx-auto mb-6 text-sm text-zinc-500 px-4 sm:px-6 lg:px-8">
        Showing {filteredJobs.length} position{filteredJobs.length !== 1 && "s"}
      </div>

      {filteredJobs.length > 0 ? (
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8 justify-items-center mb-12">
          {filteredJobs.map((jobItem) => (
            <JobCard
              key={jobItem._id?.$oid || jobItem._id} 
              job={jobItem} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-zinc-800 rounded-[32px] max-w-7xl mx-auto mx-4 sm:mx-6 lg:mx-8">
          <p className="text-zinc-500 text-lg">No positions match your search criteria.</p>
        </div>
      )}
    </>
  );
}