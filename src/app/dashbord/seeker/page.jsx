import { getApplicationById } from "@/lib/api/application";
import { userSession } from "@/lib/core/session";
import { FaFileAlt, FaClock, FaCheckCircle, FaBriefcase, FaUserGraduate } from "react-icons/fa";
import SeekerChart from "@/components/dashbordComponents/SeekerChart";

export const dynamic = "force-dynamic";

const Page = async () => {
  const user = await userSession();
  const applications = await getApplicationById(user?.id) || [];

  const totalApplications = applications.length;

  const appliedCount = applications.filter(
    (app) => (app.status || "").toLowerCase() === "applied"
  ).length;

  const interviewCount = applications.filter(
    (app) => (app.status || "").toLowerCase() === "interview" || (app.status || "").toLowerCase() === "review"
  ).length;

  const acceptedCount = applications.filter(
    (app) => (app.status || "").toLowerCase() === "accepted" || (app.status || "").toLowerCase() === "offered" || (app.status || "").toLowerCase() === "shortlisted"
  ).length;

  return (
    <div className="p-6 md:p-8 space-y-8 bg-[#09090b] min-h-screen text-zinc-100">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-zinc-900 to-[#121214] border border-zinc-800 p-6 sm:p-8 rounded-2xl relative overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-600/10 rounded-full blur-[60px] pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-950/40 text-cyan-400 border border-cyan-900/30">
            <FaUserGraduate className="text-[10px]" /> Job Seeker
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Welcome back, <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">{user?.name || "Seeker"}</span>
          </h1>
          <p className="text-zinc-400 text-sm max-w-lg">
            Track your job applications, profile matches, and schedule interviews all in one place.
          </p>
        </div>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="bg-zinc-900 border border-zinc-850 rounded-2xl p-5 hover:border-zinc-700 transition duration-300 flex items-center justify-between group">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Total Applications</p>
            <h2 className="text-2xl font-extrabold text-white">{totalApplications}</h2>
          </div>
          <div className="p-3.5 rounded-xl bg-zinc-800 text-zinc-400 group-hover:bg-zinc-700/50 group-hover:text-white transition-colors">
            <FaFileAlt className="text-lg" />
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-850 rounded-2xl p-5 hover:border-zinc-700 transition duration-300 flex items-center justify-between group">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Applied Tiers</p>
            <h2 className="text-2xl font-extrabold text-cyan-400">{appliedCount}</h2>
          </div>
          <div className="p-3.5 rounded-xl bg-cyan-950/30 text-cyan-400 group-hover:bg-cyan-900/30 transition-colors">
            <FaBriefcase className="text-lg" />
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-850 rounded-2xl p-5 hover:border-zinc-700 transition duration-300 flex items-center justify-between group">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">In Review / Interview</p>
            <h2 className="text-2xl font-extrabold text-amber-400">{interviewCount}</h2>
          </div>
          <div className="p-3.5 rounded-xl bg-amber-950/30 text-amber-400 group-hover:bg-amber-900/30 transition-colors">
            <FaClock className="text-lg" />
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-850 rounded-2xl p-5 hover:border-zinc-700 transition duration-300 flex items-center justify-between group">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Offers Accepted</p>
            <h2 className="text-2xl font-extrabold text-emerald-400">{acceptedCount}</h2>
          </div>
          <div className="p-3.5 rounded-xl bg-emerald-950/30 text-emerald-400 group-hover:bg-emerald-900/30 transition-colors">
            <FaCheckCircle className="text-lg" />
          </div>
        </div>

      </div>

      {/* Recharts Graphical Chart */}
      <SeekerChart />

      {/* Placeholder Details/Quick-Start */}
      <div className="bg-zinc-900 border border-zinc-850 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">Quick Next Steps</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-zinc-400">
          <div className="p-4 bg-[#18181b] rounded-xl border border-zinc-850">
            <h4 className="font-semibold text-zinc-200 mb-1">Upload Resume & Update Details</h4>
            <p className="text-xs text-zinc-500">Go to your Profile tab to make sure recruiters have your latest credentials.</p>
          </div>
          <div className="p-4 bg-[#18181b] rounded-xl border border-zinc-850">
            <h4 className="font-semibold text-zinc-200 mb-1">Browse and Apply</h4>
            <p className="text-xs text-zinc-500">Head over to the Jobs tab to find active vacancies from top employers.</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Page;