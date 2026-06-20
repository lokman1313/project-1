import { userSession } from "@/lib/core/session";
import React from "react";

const ProfilePage = async () => {
  const user = await userSession();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-zinc-400">
        No user found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-lg">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xl font-bold">
            {user.name?.charAt(0)?.toUpperCase()}
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white">
              {user.name}
            </h2>
            <p className="text-sm text-zinc-400">{user.email}</p>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-3 text-sm">
          <div className="flex justify-between border-b border-zinc-800 pb-2">
            <span className="text-zinc-400">Role</span>
            <span className="text-white capitalize">{user.role}</span>
          </div>

          <div className="flex justify-between border-b border-zinc-800 pb-2">
            <span className="text-zinc-400">Plan</span>
            <span className="text-white capitalize">{user.plan}</span>
          </div>

          <div className="flex justify-between border-b border-zinc-800 pb-2">
            <span className="text-zinc-400">Email Verified</span>
            <span
              className={`${
                user.emailVerified
                  ? "text-emerald-400"
                  : "text-amber-400"
              }`}
            >
              {user.emailVerified ? "Verified" : "Not Verified"}
            </span>
          </div>

          <div className="flex justify-between border-b border-zinc-800 pb-2">
            <span className="text-zinc-400">Created At</span>
            <span className="text-white">
              {new Date(user.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-zinc-400">Updated At</span>
            <span className="text-white">
              {new Date(user.updatedAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;