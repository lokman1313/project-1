import AdminUsersTable from "@/components/dashbordComponents/AdminUsersTable";
import { getUsersList } from "@/lib/api/users";

export default async function AdminUsersPage() {
  const data = await getUsersList();
  const users = data?.users || [];
 

  return (
    <div className="min-h-screen bg-[#121212] p-8 text-slate-200">
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="flex items-center justify-between p-5 border-b border-zinc-800">
          <h2 className="text-lg font-semibold text-white">User Management</h2>

          <input
            type="text"
            placeholder="Search users..."
            className="w-72 px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-sm text-white outline-none focus:border-indigo-500"
          />
        </div>

        <AdminUsersTable users={users} />
      </div>
    </div>
  );
}
