import Game from "@/models/Game";
import User from "@/models/User";
import mongoose from "mongoose";
import { connectDB } from "../lib/db";

export default async function allGames(req,res){
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
        const games = await Game.find()
        .sort({ "reviews.length": 1 })
        .select("image")
        .limit(72);
        const gamesCount = await Game.countDocuments()
        return res.status(200).json({games:games, gamesCount: gamesCount})
    }catch(err){
        console.error("No review found",err)
        return res.status(500).json({message: "No games found"})
    }
}