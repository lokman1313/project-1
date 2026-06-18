import { getUsersList } from "@/lib/api/users";
import {
  FaUsers,
  FaUserShield,
  FaBriefcase,
  FaBuilding,
  FaFileAlt,
} from "react-icons/fa";

const AdminPage = async () => {
  const data = await getUsersList();
  const users = data?.users || [];

  const admins = users.filter((u) => u.role === "admin").length;
  const recruiters = users.filter((u) => u.role === "recruiter").length;
  const seekers = users.filter((u) => u.role === "seeker").length;

  return (
    <div className="space-y-8 md:p-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">
          Admin Dashboard
        </h1>
        <p className="text-zinc-400 mt-1">
          Manage users, jobs, recruiters and platform activity.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-zinc-400 text-sm">Total Users</p>
              <h2 className="text-3xl font-bold text-white mt-2">
                {users.length}
              </h2>
            </div>

            <div className="p-3 rounded-xl bg-indigo-500/10">
              <FaUsers className="text-indigo-400 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-zinc-400 text-sm">Admins</p>
              <h2 className="text-3xl font-bold text-purple-400 mt-2">
                {admins}
              </h2>
            </div>

            <div className="p-3 rounded-xl bg-purple-500/10">
              <FaUserShield className="text-purple-400 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-zinc-400 text-sm">Recruiters</p>
              <h2 className="text-3xl font-bold text-blue-400 mt-2">
                {recruiters}
              </h2>
            </div>

            <div className="p-3 rounded-xl bg-blue-500/10">
              <FaBriefcase className="text-blue-400 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-zinc-400 text-sm">Job Seekers</p>
              <h2 className="text-3xl font-bold text-emerald-400 mt-2">
                {seekers}
              </h2>
            </div>

            <div className="p-3 rounded-xl bg-emerald-500/10">
              <FaUsers className="text-emerald-400 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-5">
          Quick Actions
        </h3>

        <div className="grid md:grid-cols-3 gap-4">
          <button className="flex items-center gap-3 p-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition">
            <FaUsers className="text-indigo-400" />
            <span className="text-zinc-200">Manage Users</span>
          </button>

          <button className="flex items-center gap-3 p-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition">
            <FaBuilding className="text-blue-400" />
            <span className="text-zinc-200">Manage Companies</span>
          </button>

          <button className="flex items-center gap-3 p-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition">
            <FaFileAlt className="text-emerald-400" />
            <span className="text-zinc-200">Review Applications</span>
          </button>
        </div>
      </div>

      {/* Recent Activity Placeholder */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Recent Activity
        </h3>

        <div className="space-y-3 text-sm text-zinc-400">
          <div className="p-3 rounded-lg bg-zinc-800/50">
            New recruiter registered
          </div>

          <div className="p-3 rounded-lg bg-zinc-800/50">
            New company submitted for approval
          </div>

          <div className="p-3 rounded-lg bg-zinc-800/50">
            5 new job applications received
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;