import Game from "@/models/Game";
import Review from "@/models/Review";
import User from "@/models/User";
import mongoose from "mongoose";
import { connectDB, closeConnection } from "../lib/db";

export default async function gamesPage(req,res){
    if(req.method !== "GET"){
        return res.status(405).json({message: "Method not allowed."})
    }
    try{
        await connectDB()
    }catch(err){
        console.error("MongoDB Connection Error", err)
        return res.status(500).json({message: "Internal server error"})
    }

    try{
        const popular16Games = await Game.aggregate([{$sample: {size:16}}])
        const justReviewed12Games = await Game
        .find({reviews: {$exists: true, $not: {$size:0} }})
        .populate({path: "reviews", options: {sort:{createdAt: -1 }}, perDocumentLimit: 1})
        .sort({"reviews.createdAt" : -1})
        .limit(12);

        const getReviews = await Review.find()
        .populate("owner").limit(6);

        const popularReviewers = await User.aggregate([
            {
                $project:{
                    username:1,
                    reviewCount: {$size: "$reviews"},
                },
            },
            {
                $sort: {reviewCount: -1 },

            },
            {$limit: 6},
        ]);
        return res.status(200).json({popular16Games: popular16Games, justReviewed12Games: justReviewed12Games, getReviews: getReviews, popularReviewers: popularReviewers});


    }catch(err){
        console.error("Unexpected error", err)
        return res.status(500).json({message: "No games found"})
    }
}