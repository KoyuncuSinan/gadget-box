import User from "@/models/User";
import mongoose from "mongoose";
import { use } from "react";
import { connectDB, closeConnection } from "../lib/db";

export default async function userPage() {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method now allowed." });
  }

  try {
    await connectDB();
  } catch (err) {
    console.error("MongoDB connection error.", err);
    return res.status(500).json({ message: "Internal server error." });
  }

  try {
    const userId = req.query.id;
    const getUserRecentReviews = await User.findById(userId)
      .populate({
        path: "reviews",
        options: { sort: { createdAt: -1 }, limit: 1 },
        populate: { path: "games" },
      })
      .sort({ "reviews.createdAt": -1 })
      .limit(3);
    const getUserGames = await User.findById(userId).populate("games");

    const getUserPopularReviews = await User.findById(userId)
    .populate({
        path: "reviews",
        options: {sort: {likes: -1}, limit: 2},
        populate: {path: "games"},
    })
    .sort({"reviews.likes": -1})
    .limit(2);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
