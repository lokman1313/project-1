"use client";

import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const data = [
  { day: "Mon", users: 120 },
  { day: "Tue", users: 180 },
  { day: "Wed", users: 160 },
  { day: "Thu", users: 220 },
  { day: "Fri", users: 290 },
  { day: "Sat", users: 240 },
  { day: "Sun", users: 310 },
];

export default function AdminChart() {
  return (
    <div className="bg-zinc-900 border border-zinc-850 rounded-2xl p-6 space-y-4 shadow-lg">
      <div>
        <h3 className="text-lg font-bold text-white">Daily Traffic Metrics</h3>
        <p className="text-xs text-zinc-500">Overview of user registration frequency and sessions.</p>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
            <XAxis dataKey="day" stroke="#71717a" fontSize={11} tickLine={false} />
            <YAxis stroke="#71717a" fontSize={11} tickLine={false} />
            <Tooltip
              contentStyle={{ backgroundColor: "#18181b", borderColor: "#27272a", borderRadius: "12px" }}
              labelStyle={{ color: "#a1a1aa", fontWeight: "bold" }}
              itemStyle={{ color: "#a855f7" }}
            />
            <Line type="monotone" dataKey="users" stroke="#a855f7" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
