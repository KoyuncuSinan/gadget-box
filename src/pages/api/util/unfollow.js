import User from "@/models/User";
import { connectDB } from "../lib/db";
import { getSession } from "next-auth/react";

export default async function unfollow(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed." });
  }

  try {
    await connectDB();
  } catch (err) {
    console.error("MongoDB connection error.", err);
    return res.status(500).json({ message: "Internal server error." });
  }

  try {
    const session = await getSession(req);
    if (!session) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const userEmail = session.user.email;
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: "Can't find the user" });
    }
    const targetUserId = req.query.id;
    const targetUser = await User.findOne({ _id: targetUserId });
    if (!targetUser) {
      return res.status(404).json({ message: "Can't find the target user" });
    }

    user.followings = user.followings.filter(
      (followedUser) => followedUser.toString() !== targetUser._id.toString()
    );

    targetUser.followers = targetUser.followers.filter(
      (follower) => follower.toString() !== user._id.toString()
    );

    await user.save();
    await targetUser.save();

    return res.status(200).json({ message: "User unfollowed successfully" });
  } catch (err) {
    console.error("Unfollow user error.", err);
    return res.status(500).json({ message: "Internal server error." });
  }
}