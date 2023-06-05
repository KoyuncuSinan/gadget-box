import User from "@/models/User";
import { connectDB } from "../lib/db";
import { getSession } from "next-auth/react";
import mongoose from "mongoose";
import formidable from "formidable";


export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function follow(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method now allowed." });
  }
  try {
    await connectDB();
  } catch (err) {
    console.error("MongoDB connection error.", err);
    return res.status(500).json({ message: "Internal server error." });
  }

  try {
    const form = new formidable.IncomingForm
    form.parse(req, async(err,fields, files) => {
        if(err){
            console.error("Formidable Error",err)
            return res.status(500).json({message: "Internal Server Error"});
        }
        const session = await getSession({ req });
        console.log(session)
        if (!session) {
          return res.status(401).json({ message: "Unauthorized" });
        }
        const userEmail = session.user.email;
        const user = await User.findOne({ email: userEmail });
        if (!user) {
          return res.status(404).json({ message: "Can't find the user" });
        }
        const targetUserId = fields.id;
        const targetUser = await User.findOne({ _id: targetUserId });
        if (!targetUser) {
          return res.status(404).json({ message: "Can't find the target user" });
        }
        user.followings.push(targetUser._id);
        targetUser.followers.push(user._id);
        await user.save();
        await targetUser.save();
        return res.status(200).json({ message: "User followed successfully" });
    })
  } catch (err) {
    console.error("Follow user error.", err);
    return res.status(500).json({ message: "Internal server error." });
  }
}
