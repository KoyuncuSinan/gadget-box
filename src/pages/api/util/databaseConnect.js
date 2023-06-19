import { connectDB,cachedDb } from "../lib/db";

export default async function databaseConnection() {
    if (cachedDb === null) {
        await connectDB();
    }
    return cachedDb;
  }