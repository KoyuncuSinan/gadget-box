import { MongoClient } from "mongodb";
import mongoose from "mongoose";


export let cachedDb = null;


export function connectDB() {
  return new Promise(async (resolve, reject) => {
    if (cachedDb !== null && cachedDb._readyState === 1) {
      console.log("Using existing MongoDB connection...");
      resolve(cachedDb);
      return;
    }

    console.log("Creating new MongoDB connection...");
    
    try {
      const db = await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });

      console.log("MongoDB connected!");
      cachedDb = db.connection;
      resolve(cachedDb);
    } catch (err) {
      console.error("Error connecting to MongoDB", err);
      reject(err);
    }
  });
}