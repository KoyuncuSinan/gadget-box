import User from "@/models/User";
import databaseConnection from "../util/databaseConnect";
import { getServerSession } from "next-auth/next";
import mongoose from "mongoose";
import { authOptions } from "../auth/[...nextauth]";

export default async function yourProfile(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method now allowed." });
  }

  await databaseConnection();

  const session = await getServerSession(req,res, authOptions);
  console.log(session)
  try {
    if (!session) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return res.status(404).json({ message: "Can't find the user" });
    }
    console.log(user._id);
    res.status(200).json({userId: user._id});
  } catch (err) {
    console.error("Session error.", err);
    return res.status(500).json({ message: "Internal server error." });
  }
}
