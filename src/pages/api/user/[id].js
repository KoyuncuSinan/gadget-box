import User from "@/models/User";
import mongoose from "mongoose";
import { connectDB, closeConnection } from "../lib/db";
import Review from "@/models/Review";
import Game from "@/models/Game";

export default async function(req,res) {
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
    if(!userId){
      return res.status(400).json({message:"Invalid user ID"})
    }
    console.log("Received userId:", userId);

    const userInformation = await User.findById(userId).select("firstname lastname username profilePicture reviews")
    const getUserRecentReviews = await User.findById(userId).select("username")
      .populate({
        path: "reviews",
        options: { sort: { createdAt: -1 }, limit: 2 },
        populate: { path: "game" },
      })
      .sort({ "reviews.createdAt": -1 })
      .limit(3);
      
    const getUserGames = await User.findById(userId).select("username").populate({
      path: "games",
      select: "image"
    }).limit(6);

    const followersCount = await User.countDocuments({_id: userId})
  .populate("followers")
  .countDocuments();
    
    const getUserPopularReviews = await User.findById(userId).select("username")
    .populate({
        path: "reviews",
        options: {sort: {likes: -1}, limit: 2},
        populate: {path: "game"},
    })
    .sort({"reviews.likes": -1})
    .limit(2);

    const getUserFollowings = await User.findById(userId).select("username").populate({
        path: "followings",
        select: "_id profilePicture"
    })

    res.status(200).json({userInformation: userInformation,
      getUserRecentReviews: getUserRecentReviews,
      getUserGames: getUserGames,
      getUserPopularReviews: getUserPopularReviews,
      getUserFollowings: getUserFollowings,
      followersCount: followersCount})
    
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
