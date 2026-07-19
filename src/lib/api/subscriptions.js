import { getDb } from "../db";

export const getSubscriptionsList = async () => {
  try {
    const db = await getDb();
    // Get all subscriptions sorted by creation or just return them
    const subscriptions = await db.collection("subscriptions").find({}).sort({ createdAt: -1 }).toArray();
    
    // Normalize MongoDB documents to plain objects for Next.js Server Components
    return subscriptions.map(sub => ({
      ...sub,
      _id: String(sub._id),
      createdAt: sub.createdAt ? (sub.createdAt instanceof Date ? sub.createdAt.toISOString() : String(sub.createdAt)) : null,
      updatedAt: sub.updatedAt ? (sub.updatedAt instanceof Date ? sub.updatedAt.toISOString() : String(sub.updatedAt)) : null,
    }));
  } catch (error) {
    console.error("getSubscriptionsList error:", error);
    return [];
  }
};
