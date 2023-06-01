import Review from "@/models/Review";
import Game from "@/models/Game";
import mongoose from "mongoose";
import { connectDB, closeConnection } from "../lib/db";

export default async function(req,res){
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method not allowed." });
      }
    
      try {
        await connectDB();
      } catch (err) {
        console.error("MongoDB Connection Error", err);
        return res.status(500).json({ message: "Internal server error" });
      }
    
      const gameId = req.query.id;
      console.log("Received gameId:", gameId);
    
      const singleGame = await Game.findById(gameId).populate({
        path: "reviews",
        populate: {
          path: "owner",
        },
      });
    
      if (!singleGame) {
        return res.status(404).json({ message: "Couldn't find the game" });
      }
    
      return res.status(200).json(singleGame);
}