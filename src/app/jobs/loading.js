// src/app/jobs/loading.js
import React from "react";

export default function Loading() {
  return (
    <main className="min-h-screen py-12 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Skeleton */}
        <div className="mb-10 space-y-3 animate-pulse">
          <div className="h-10 bg-zinc-800 w-64 rounded-xl" />
          <div className="h-5 bg-zinc-800 w-96 rounded-lg" />
        </div>

        {/* Filter Input Grid Skeleton */}
        <div className="bg-zinc-900/50 p-6 rounded-[24px] border border-zinc-800/80 mb-10 h-28 animate-pulse" />

        {/* Job Cards Skeleton Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="p-6 w-full max-w-[440px] h-[320px] bg-zinc-900 border border-zinc-800 rounded-[32px] animate-pulse space-y-6">
              <div className="flex items-center gap-3">
                <div className="bg-zinc-800 rounded-xl w-10 h-10" />
                <div className="h-5 bg-zinc-800 w-32 rounded-md" />
              </div>
              <div className="h-8 bg-zinc-800 w-3/4 rounded-md" />
              <div className="space-y-2">
                <div className="h-4 bg-zinc-800 w-full rounded-md" />
                <div className="h-4 bg-zinc-800 w-5/6 rounded-md" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}