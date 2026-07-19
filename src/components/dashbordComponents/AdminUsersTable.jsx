"use client";

import { updateUserRole, updateUserStatus, deleteUser } from "@/lib/action/users";
import React, { useState } from "react";
import {
  FaUser,
  FaBriefcase,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { toast } from "react-toastify";

export default function AdminUsersTable({ users }) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [pendingChange, setPendingChange] = useState(null); // stores { userId, userName, newRole }
  const [isUpdating, setIsUpdating] = useState(false);

  const formatDate = (dateValue) => {
    if (!dateValue) return "N/A";

    const date = new Date(dateValue);

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };
  const roleStyles = {
    admin: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
    recruiter: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
    seeker: "bg-zinc-500/10 text-zinc-400 border border-zinc-500/20",
  };

  // Safe accessor for MongoDB OID
  const getUserId = (user) => user._id?.$oid || user.id || user._id;

  // Trigger confirmation modal instead of executing directly
  const initiateRoleChange = (userId, userName, newRole) => {
    setPendingChange({ userId, userName, newRole });
    setIsConfirmOpen(true);
  };

  // Execute server action if confirmed
  const confirmRoleChange = async () => {
    if (!pendingChange) return;

    setIsUpdating(true);
    try {
      const { userId, newRole } = pendingChange;
      const res = await updateUserRole(userId, newRole);
      if (res.success) {
        toast.success(`User role updated to ${newRole}`);
      } else {
        toast.error(res.error || "Failed to update role");
      }
    } catch (error) {
      console.error("Failed to update user role:", error);
      toast.error("An error occurred");
    } finally {
      setIsUpdating(false);
      setIsConfirmOpen(false);
      setPendingChange(null);
    }
  };

  const handleStatusChange = async (userId, newStatus) => {
    try {
      const res = await updateUserStatus(userId, newStatus);
      if (res.success) {
        toast.success(`User status updated to ${newStatus}`);
      } else {
        toast.error(res.error || "Failed to update status");
      }
    } catch (error) {
      console.error("Failed to update user status:", error);
      toast.error("An error occurred");
    }
  };

  const handleDelete = async (userId) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await deleteUser(userId);
      if (res.success) {
        toast.success("User deleted successfully");
      } else {
        toast.error(res.error || "Failed to delete user");
      }
    } catch (error) {
      console.error("Failed to delete user:", error);
      toast.error("An error occurred");
    }
  };

  return (
    <div className="relative w-full">
      <div className="w-full bg-[#1e1e1e] border border-zinc-800 rounded-xl overflow-hidden shadow-2xl font-sans">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm text-zinc-400">
            {/* Header */}
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-400 font-medium select-none">
                <th className="py-5 px-6 font-normal">User Name</th>
                <th className="py-5 px-6 font-normal">Email Address</th>
                <th className="py-5 px-6 font-normal">Role</th>
                <th className="py-5 px-6 font-normal">Join Date</th>
                <th className="py-5 px-6 font-normal">Status</th>
                <th className="py-5 px-6 font-normal text-right">Actions</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody className="divide-y divide-zinc-800/60 bg-[#1e1e1e]">
              {users.map((user) => {
                const userId = getUserId(user);
                const userRole = user.role?.toLowerCase() || "seeker";
                const userStatus = user.status || "Active";

                return (
                  <tr
                    key={userId}
                    className="hover:bg-zinc-900/40 transition-colors duration-150"
                  >
                    {/* User Name + Initial Avatar */}
                    <td className="py-4 px-6 font-medium text-zinc-200 whitespace-nowrap">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm text-white font-semibold shadow-lg">
                        {user.name
                          ? user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)
                              .toUpperCase()
                          : "U"}
                      </div>
                    </td>

                    {/* Email Address */}
                    <td className="py-4 px-6 text-zinc-400 whitespace-nowrap">
                      {user.email}
                    </td>

                    {/* Role Badge */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${roleStyles[userRole]}`}
                      >
                        {userRole}
                      </span>
                    </td>

                    {/* Join Date */}
                    <td className="py-4 px-6 text-zinc-400 whitespace-nowrap">
                      {formatDate(user.createdAt)}
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      {userStatus === "Active" ? (
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow shadow-emerald-500/5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium rounded-full bg-red-950/30 text-red-400 border border-red-900/40">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                          Suspended
                        </span>
                      )}
                    </td>

                    {/* Actions Column */}
                    <td className="py-4 px-6 text-right whitespace-nowrap text-xs font-medium">
                      <div className="flex items-center justify-end gap-4">
                        {/* Change Roles Triggers via confirmation flow */}
                        {userRole !== "admin" && (
                          <button
                            onClick={() =>
                              initiateRoleChange(userId, user.name, "admin")
                            }
                            className="px-3 py-1 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20 hover:bg-purple-500/20 transition"
                          >
                            Admin
                          </button>
                        )}
                        {userRole !== "recruiter" && (
                          <button
                            onClick={() =>
                              initiateRoleChange(userId, user.name, "recruiter")
                            }
                            className="px-3 py-1 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition"
                          >
                            Recruiter
                          </button>
                        )}
                        {userRole !== "seeker" && (
                          <button
                            onClick={() =>
                              initiateRoleChange(userId, user.name, "seeker")
                            }
                            className="px-3 py-1 rounded-lg bg-zinc-700/40 text-zinc-300 border border-zinc-700 hover:bg-zinc-700/70 transition"
                          >
                            Seeker
                          </button>
                        )}

                        {/* Suspension Toggle / Delete Operations */}
                        {userStatus === "Active" ? (
                          <button
                            onClick={() =>
                              handleStatusChange(userId, "Suspended")
                            }
                            className="text-red-500 hover:text-red-400 transition-colors pl-2 border-l border-zinc-800"
                          >
                            Suspend
                          </button>
                        ) : (
                          <>
                            <button
                              onClick={() =>
                                handleStatusChange(userId, "Active")
                              }
                              className="text-emerald-500 hover:text-emerald-400 transition-colors pl-2 border-l border-zinc-800"
                            >
                              Activate
                            </button>
                            <button
                              onClick={() => handleDelete(userId)}
                              className="text-zinc-400 hover:text-red-400 transition-colors"
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-800 text-xs text-zinc-500 select-none">
          <div>Showing 1 to {users.length} of 12,842 users</div>
          <div className="flex items-center gap-1">
            <button className="p-1 hover:text-zinc-300 transition-colors">
              <FaChevronLeft size={14} />
            </button>
            <button className="w-6 h-6 flex items-center justify-center bg-white text-zinc-900 rounded font-medium">
              1
            </button>
            <button className="w-6 h-6 flex items-center justify-center hover:bg-zinc-800/60 rounded text-zinc-400 transition-colors">
              2
            </button>
            <button className="w-6 h-6 flex items-center justify-center hover:bg-zinc-800/60 rounded text-zinc-400 transition-colors">
              3
            </button>
            <span className="px-1 text-zinc-600">...</span>
            <button className="w-fit px-1.5 h-6 flex items-center justify-center hover:bg-zinc-800/60 rounded text-zinc-400 transition-colors">
              1285
            </button>
            <button className="p-1 hover:text-zinc-300 transition-colors">
              <FaChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal Overlay */}
      {isConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/60">
          <div className="w-full max-w-sm bg-[#1e1e1e] border border-zinc-800 rounded-xl p-6 shadow-2xl space-y-6">
            <div className="space-y-2">
              <h3 className="text-base font-semibold text-zinc-100">
                Confirm Role Change
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Are you sure you want to change the role of{" "}
                <span className="text-zinc-200 font-medium">
                  {pendingChange?.userName}
                </span>{" "}
                to{" "}
                <span className="text-zinc-200 font-medium capitalize">
                  {pendingChange?.newRole}
                </span>
                ? This alters system access and application flow parameters
                permissions immediately.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 text-xs font-medium">
              <button
                disabled={isUpdating}
                onClick={() => {
                  setIsConfirmOpen(false);
                  setPendingChange(null);
                }}
                className="px-4 py-2 text-zinc-400 hover:text-zinc-200 bg-zinc-800/40 hover:bg-zinc-800 border border-zinc-800 rounded-md transition-colors disabled:opacity-5"
              >
                Cancel
              </button>
              <button
                disabled={isUpdating}
                onClick={confirmRoleChange}
                className="px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-500 rounded-md transition-colors shadow-lg shadow-indigo-600/10 disabled:opacity-50 min-w-[76px] flex items-center justify-center"
              >
                {isUpdating ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  "Confirm"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
