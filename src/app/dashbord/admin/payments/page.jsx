import { getSubscriptionsList } from "@/lib/api/subscriptions";
import { FaCreditCard, FaUser, FaCalendarAlt, FaDollarSign } from "react-icons/fa";

export const dynamic = "force-dynamic";

const planBadgeStyles = {
  seeker_free: "bg-zinc-800 text-zinc-400 border-zinc-700/50",
  seeker_pro: "bg-blue-950/40 text-blue-400 border-blue-900/30",
  seeker_premium: "bg-violet-950/40 text-violet-400 border-violet-900/30",
  recruiter_free: "bg-zinc-800 text-zinc-400 border-zinc-700/50",
  recruiter_growth: "bg-emerald-950/40 text-emerald-400 border-emerald-900/30",
  recruiter_enterprise: "bg-amber-950/40 text-amber-400 border-amber-900/30",
};

export default async function AdminPaymentsPage() {
  const subscriptions = await getSubscriptionsList();

  return (
    <div className="min-h-screen bg-[#121212] p-6 md:p-10 text-slate-200">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-violet-500/10">
              <FaCreditCard className="text-violet-400 text-2xl" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">Subscription Payments</h1>
              <p className="text-zinc-400 text-sm mt-1">
                Monitor user subscriptions, active tiers, and transaction statuses.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-zinc-900 border border-zinc-850 rounded-2xl p-5">
            <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">Total Sales Transactions</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-2">{subscriptions.length}</h2>
          </div>
          <div className="bg-zinc-900 border border-zinc-850 rounded-2xl p-5">
            <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">Active Pro Subscriptions</span>
            <h2 className="text-2xl md:text-3xl font-bold text-blue-400 mt-2">
              {subscriptions.filter(s => s.planId?.includes("pro") || s.planId?.includes("growth")).length}
            </h2>
          </div>
          <div className="bg-zinc-900 border border-zinc-850 rounded-2xl p-5">
            <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">Premium & Enterprise Tiers</span>
            <h2 className="text-2xl md:text-3xl font-bold text-violet-400 mt-2">
              {subscriptions.filter(s => s.planId?.includes("premium") || s.planId?.includes("enterprise")).length}
            </h2>
          </div>
        </div>

        {/* Table Listing */}
        <div className="bg-zinc-900 border border-zinc-850 rounded-2xl overflow-hidden shadow-xl">
          {subscriptions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-zinc-400 border-collapse">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-500 bg-[#17171a]/50 select-none">
                    <th className="py-4 px-6 font-medium">Customer Email</th>
                    <th className="py-4 px-6 font-medium">Subscribed Plan</th>
                    <th className="py-4 px-6 font-medium">Transaction Date</th>
                    <th className="py-4 px-6 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/50 bg-[#121214]/30">
                  {subscriptions.map((sub) => (
                    <tr key={sub._id} className="hover:bg-zinc-800/20 transition-colors">
                      {/* Email */}
                      <td className="py-4.5 px-6 font-medium text-zinc-200 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <FaUser className="text-zinc-600 text-xs" />
                          {sub.email}
                        </div>
                      </td>
                      {/* Plan ID */}
                      <td className="py-4.5 px-6 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${planBadgeStyles[sub.planId] || "bg-zinc-800 text-zinc-400 border-zinc-700"}`}>
                          {sub.planId ? sub.planId.replace("_", " ").toUpperCase() : "FREE"}
                        </span>
                      </td>
                      {/* Created At */}
                      <td className="py-4.5 px-6 text-zinc-400 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <FaCalendarAlt className="text-zinc-600 text-xs" />
                          {sub.createdAt ? new Date(sub.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit"
                          }) : "N/A"}
                        </div>
                      </td>
                      {/* Status */}
                      <td className="py-4.5 px-6 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Completed
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-16">
              <FaCreditCard className="mx-auto text-3xl text-zinc-700 mb-3" />
              <h3 className="text-zinc-300 font-semibold">No Transactions Found</h3>
              <p className="text-zinc-500 text-xs mt-1">There are no payment records registered on this platform yet.</p>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}
