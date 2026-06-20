"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import JobFilters from "./JobFilter";
import JobCard from "./JobCard";
import PageinetionSection from "../PageinetionSection";

export default function JobListingContainer({ jobs , filters ,total }) {
  const router = useRouter();

  // Initialize filtering hooks from active URL state
  const [searchQuery, setSearchQuery] = useState(filters.search || "");
  const [selectedType, setSelectedType] = useState(filters.jobType ||"all");
  const [selectedCategory, setSelectedCategory] = useState(filters.jobCategory ||"all");
  const [isRemoteOnly, setIsRemoteOnly] = useState(filters.isRemote || false);
  const [page, setPage] = useState(filters.page || 1 );


  useEffect(()=>{
    const sp = new URLSearchParams() //sp = searchParams
    if(searchQuery){
      sp.set("search",searchQuery)
    }
    if(selectedType !== 'all'){
      sp.set("jobType",selectedType)
    }
    if(selectedCategory !== "all"){
      sp.set("jobCategory",selectedCategory)
    }
    if(isRemoteOnly){
      sp.set("isRemote",true)
    }
    if(page){
      sp.set("page",page)
    }
    const path = `?${sp.toString()}`
    router.push(path)
  },[searchQuery,router,selectedType,selectedCategory,isRemoteOnly,page])


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
        Showing {jobs.length} position{jobs.length !== 1 && "s"}
      </div>

      {jobs.length > 0 ? (
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8 justify-items-center mb-12">
          {jobs.map((jobItem) => (
            <JobCard
              key={jobItem._id?.$oid || jobItem._id} 
              job={jobItem} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-zinc-800 rounded-[32px] max-w-7xl mx-auto ">
          <p className="text-zinc-500 text-lg">No positions match your search criteria.</p>
        </div>
      )}
      <PageinetionSection page={page} total={total} setPage={setPage}></PageinetionSection>
    </>
  );
}