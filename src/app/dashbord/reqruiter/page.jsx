"use client";

import DashboardStats from "@/components/dashbordComponents/DashboardStats";
import { authClient } from "@/lib/auth-client";
import { FaFileAlt, FaUsers, FaBolt, FaCheckCircle, FaBriefcase } from "react-icons/fa";
import RecruiterChart from "@/components/dashbordComponents/RecruiterChart";

export default function RequiterDashbordPage() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center">
        <span className="w-8 h-8 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
      </div>
    );
  }

  const user = session?.user;
  const recruiterData = [
    {
      title: "Total Job Posts",
      value: "12",
      icon: FaFileAlt,
    },
    {
      title: "Total Applicants",
      value: "284",
      icon: FaUsers,
    },
    {
      title: "Active Jobs",
      value: "5",
      icon: FaBolt,
    },
    {
      title: "Jobs Closed",
      value: "7",
      icon: FaCheckCircle,
    },
  ];

  return (
    <div className="p-6 md:p-8 space-y-8 bg-[#09090b] min-h-screen text-zinc-100">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-zinc-900 to-[#121214] border border-zinc-800 p-6 sm:p-8 rounded-2xl relative overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[60px] pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-950/40 text-blue-400 border border-blue-900/30">
            <FaBriefcase className="text-[10px]" /> Recruiter Panel
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Welcome back, <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">{user?.name || "Recruiter"}</span>
          </h1>
          <p className="text-zinc-400 text-sm max-w-lg">
            Manage your company listings, post new roles, and coordinate with job seekers.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-zinc-400">Overview Stats</h3>
        <DashboardStats data={recruiterData} />
      </div>

      {/* Recharts Graphical Chart */}
      <RecruiterChart />

    </div>
  );
}