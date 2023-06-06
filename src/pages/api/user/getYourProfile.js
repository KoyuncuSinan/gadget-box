import { connectDB } from "../lib/db";
import User from "@/models/User";
import { getSession } from "next-auth/react";
import mongoose from "mongoose";

export default async function getYourProfile(req, res) {
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
    const session = await getSession({ req });
    console.log(session)
    if (!session) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return res.status(404).json({ message: "Can't find the user" });
    }
    console.log(user._id);
    res.status(200).json(user._id);
  } catch (err) {
    console.error("Follow user error.", err);
    return res.status(500).json({ message: "Internal server error." });
  }
}
