"use server"

import { revalidatePath } from "next/cache";
import { getDb } from "../db";
import { ObjectId } from "mongodb";

// Helper to convert ID to ObjectId or String
function parseId(id) {
  try {
    return new ObjectId(id);
  } catch (e) {
    return id;
  }
}

export const getUsersList = async () => {
  try {
    const db = await getDb();
    const users = await db
      .collection("user")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    const serializedUsers = users.map((u) => ({
      ...u,
      _id: u._id.toString(),
      id: u._id.toString(),
    }));

    return { success: true, users: serializedUsers };
  } catch (error) {
    console.error("getUsersList error:", error);
    return { success: false, error: error.message };
  }
};

export const updateUserRole = async (userId, role) => {
  if (!userId || !role) return { success: false, error: "Missing parameters" };

  try {
    const db = await getDb();
    const result = await db.collection("user").updateOne(
      { $or: [{ _id: parseId(userId) }, { _id: String(userId) }, { id: String(userId) }] },
      { $set: { role: role } }
    );
    
    revalidatePath("/dashbord/admin/users");
    return { success: true, modifiedCount: result.modifiedCount };
  } catch (error) {
    console.error("updateUserRole error:", error);
    return { success: false, error: error.message };
  }
};

export const updateUserStatus = async (userId, status) => {
  if (!userId || !status) return { success: false, error: "Missing parameters" };

  try {
    const db = await getDb();
    const result = await db.collection("user").updateOne(
      { $or: [{ _id: parseId(userId) }, { _id: String(userId) }, { id: String(userId) }] },
      { $set: { status: status } }
    );

    revalidatePath("/dashbord/admin/users");
    return { success: true, modifiedCount: result.modifiedCount };
  } catch (error) {
    console.error("updateUserStatus error:", error);
    return { success: false, error: error.message };
  }
};

export const deleteUser = async (userId) => {
  if (!userId) return { success: false, error: "Missing parameter" };

  try {
    const db = await getDb();
    const result = await db.collection("user").deleteOne({
      $or: [{ _id: parseId(userId) }, { _id: String(userId) }, { id: String(userId) }]
    });

    revalidatePath("/dashbord/admin/users");
    return { success: true, deletedCount: result.deletedCount };
  } catch (error) {
    console.error("deleteUser error:", error);
    return { success: false, error: error.message };
  }
};

export const getResetLinkForTesting = async (email) => {
  if (!email) return { success: false, error: "Email is required" };

  try {
    const db = await getDb();
    const tokenDoc = await db.collection("verification").findOne(
      { identifier: email },
      { sort: { createdAt: -1 } }
    );

    if (!tokenDoc) {
      return { success: false, error: "No reset token found for this email. Make sure you submitted the form first." };
    }

    const resetLink = `/reset-password?token=${tokenDoc.value}`;
    return { success: true, resetLink };
  } catch (error) {
    console.error("getResetLinkForTesting error:", error);
    return { success: false, error: error.message };
  }
};