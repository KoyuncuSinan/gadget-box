import mongoose from "mongoose";
import { connectDB,cachedDb} from "../lib/db";
import Game from "@/models/Game";
import Review from "@/models/Review";
import databaseConnection from "../util/databaseConnect";

export default async function filteredGames(req,res){
    if(req.method !== "GET"){
        return res.status(405).json({message: "Method not allowed."})
    }

    await databaseConnection();
   
   try{
        const random6Games = await Game.aggregate([{$sample: {size:6} }])
        const recentlyReviewed10Games = await Game
        .find({ reviews: { $exists: true, $not: { $size: 0 } } }) // Find games that have at least one review
        .populate({ path: 'reviews', options: { sort: { createdAt: -1 } }, perDocumentLimit: 1 }) // Populate the reviews field and sort by createdAt in descending order
        .sort({ 'reviews.createdAt': -1 }) // Sort the games by the createdAt field of the most recent review
        .limit(8); // Limit the result to ten games
        return res.status(200).json({random6Games: random6Games, recentlyReviewed10Games: recentlyReviewed10Games});

    } catch(err){
        console.error("No games found", err)
        return res.status(500).json({message: "No games found"});
    }
    

}