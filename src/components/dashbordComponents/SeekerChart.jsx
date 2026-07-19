"use client";

import React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const data = [
  { month: "Jan", applications: 1 },
  { month: "Feb", applications: 3 },
  { month: "Mar", applications: 2 },
  { month: "Apr", applications: 5 },
  { month: "May", applications: 8 },
  { month: "Jun", applications: 4 },
  { month: "Jul", applications: 7 },
];

export default function SeekerChart() {
  return (
    <div className="bg-zinc-900 border border-zinc-850 rounded-2xl p-6 space-y-4 shadow-lg">
      <div>
        <h3 className="text-lg font-bold text-white">Application Trend</h3>
        <p className="text-xs text-zinc-500">Your monthly job application submission metrics.</p>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
            <XAxis dataKey="month" stroke="#71717a" fontSize={11} tickLine={false} />
            <YAxis stroke="#71717a" fontSize={11} tickLine={false} />
            <Tooltip
              contentStyle={{ backgroundColor: "#18181b", borderColor: "#27272a", borderRadius: "12px" }}
              labelStyle={{ color: "#a1a1aa", fontWeight: "bold" }}
              itemStyle={{ color: "#06b6d4" }}
            />
            <Area type="monotone" dataKey="applications" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#colorApps)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
