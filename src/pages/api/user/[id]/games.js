import User from "@/models/User";
import { connectDB, closeConnection } from "../../lib/db";
import mongoose from "mongoose";
import Game from "@/models/Game";

export default async function games(req, res) {
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
    if (!userId) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    console.log("Received userId:", userId);

    const userGames = await User.findById(userId)
      .select("firstname lastname username profilePicture games")
      .populate({
        path: "games",
        select: "image releaseDate",
      })
      .limit(20);

    res.status(200).json({ userGames: userGames });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
