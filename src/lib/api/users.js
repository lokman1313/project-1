import { getDb } from "../db";

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
      _id: String(u._id),
      id: String(u._id),
      createdAt: u.createdAt ? (u.createdAt instanceof Date ? u.createdAt.toISOString() : String(u.createdAt)) : null,
      updatedAt: u.updatedAt ? (u.updatedAt instanceof Date ? u.updatedAt.toISOString() : String(u.updatedAt)) : null,
    }));

    return { success: true, users: serializedUsers };
  } catch (error) {
    console.error("getUsersList error:", error);
    return { success: false, error: error.message, users: [] };
  }
};