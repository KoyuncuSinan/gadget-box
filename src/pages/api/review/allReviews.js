import Review from "@/models/Review";
import User from "@/models/User";
import mongoose from "mongoose";
import Game from "@/models/Game";
import { connectDB } from "../lib/db";

export default async function allReviews(req,res){
    if(req.method !== "GET"){
        return res.status(405).json({message: "Method not allowed."})
    }

    try{
        await connectDB();
    }catch(err){
        console.error("MongoDB Connection Error", err)
        return res.status(500).json({message: "Internal server error"})
    }
    try{
        const reviews = await Review.find()
        .sort({ createdAt: -1 })
        .populate("owner", "username profilePicture")
        .populate("game", "name releaseDate image");
      
      return res.status(200).json(reviews);
    }catch(err){
        console.error("No review found",err)
        return res.status(500).json({message: "No games found"})
    }
}