import { FaCog, FaDatabase, FaShieldAlt, FaEnvelope, FaBell } from "react-icons/fa";

export default function AdminSettingsPage() {
  return (
    <div className="min-h-screen bg-[#121212] p-6 md:p-10 text-slate-200">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-indigo-500/10">
            <FaCog className="text-indigo-400 text-2xl" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Platform Settings</h1>
            <p className="text-zinc-400 text-sm mt-1">Configure global application behaviors and server variables.</p>
          </div>
        </div>

        {/* Settings Form Container */}
        <div className="space-y-6">
          
          {/* General Platform Settings */}
          <div className="bg-zinc-900 border border-zinc-850 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
              <FaCog className="text-indigo-400" />
              <h2 className="font-semibold text-white">General Settings</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">Platform Name</label>
                <input
                  type="text"
                  defaultValue="JobFinder"
                  className="w-full px-4 py-2.5 bg-[#18181b] border border-zinc-800 rounded-xl text-sm text-zinc-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">Support Email Contact</label>
                <input
                  type="email"
                  defaultValue="support@jobfinder.com"
                  className="w-full px-4 py-2.5 bg-[#18181b] border border-zinc-800 rounded-xl text-sm text-zinc-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Security & Access Settings */}
          <div className="bg-zinc-900 border border-zinc-850 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
              <FaShieldAlt className="text-purple-400" />
              <h2 className="font-semibold text-white">Security & Auth Policies</h2>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-[#18181b] rounded-xl border border-zinc-850">
                <div>
                  <h4 className="text-sm font-semibold text-zinc-200">Require Email Verification</h4>
                  <p className="text-xs text-zinc-500">Block jobs/applications until seeker/recruiter verify their email addresses.</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 accent-indigo-600 rounded" />
              </div>

              <div className="flex items-center justify-between p-3 bg-[#18181b] rounded-xl border border-zinc-850">
                <div>
                  <h4 className="text-sm font-semibold text-zinc-200">Enable Google SSO Provider</h4>
                  <p className="text-xs text-zinc-500">Allow users to register and sign-in directly using their Google profile.</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 accent-indigo-600 rounded" />
              </div>
            </div>
          </div>

          {/* Database Status Settings */}
          <div className="bg-zinc-900 border border-zinc-850 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
              <FaDatabase className="text-emerald-400" />
              <h2 className="font-semibold text-white">System Environment</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-zinc-400">
              <div className="flex justify-between p-3 bg-[#18181b] rounded-xl border border-zinc-850">
                <span>Database Connection</span>
                <span className="text-emerald-400 font-bold">ONLINE</span>
              </div>
              <div className="flex justify-between p-3 bg-[#18181b] rounded-xl border border-zinc-850">
                <span>Next.js Build Mode</span>
                <span className="text-indigo-400 font-bold">PRODUCTION</span>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-2">
            <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-600/10 transition active:scale-[0.97]">
              Save Platform Configuration
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
