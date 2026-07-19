"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const data = [
  { job: "Frontend Dev", applicants: 45 },
  { job: "Backend Dev", applicants: 82 },
  { job: "UI Designer", applicants: 28 },
  { job: "Data Analyst", applicants: 64 },
  { job: "Product Mgr", applicants: 19 },
];

export default function RecruiterChart() {
  return (
    <div className="bg-zinc-900 border border-zinc-850 rounded-2xl p-6 space-y-4 shadow-lg">
      <div>
        <h3 className="text-lg font-bold text-white">Applicants per Job</h3>
        <p className="text-xs text-zinc-500">Distribution of seeker responses across active vacancies.</p>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
            <XAxis dataKey="job" stroke="#71717a" fontSize={10} tickLine={false} />
            <YAxis stroke="#71717a" fontSize={11} tickLine={false} />
            <Tooltip
              contentStyle={{ backgroundColor: "#18181b", borderColor: "#27272a", borderRadius: "12px" }}
              labelStyle={{ color: "#a1a1aa", fontWeight: "bold" }}
              itemStyle={{ color: "#60a5fa" }}
            />
            <Bar dataKey="applicants" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={32} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
