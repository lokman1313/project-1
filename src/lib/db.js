import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME || "project-1";

if (!uri) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env");
}

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function getDb() {
  const mongoClient = await clientPromise;
  return mongoClient.db(dbName);
}

export async function getMongoClient() {
  return clientPromise;
}
