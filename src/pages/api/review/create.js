import Review from "@/models/Review";
import mongoose from "mongoose";
import { connectDB, closeConnection } from "../lib/db";
import formidable from "formidable"
import User from "@/models/User";
import Game from "@/models/Game";
import { getSession } from "next-auth/react";

export const config = {
    api: {
        bodyParser: false,
    },
  };

export default async function createReview(req,res){
    if(req.method !== "POST"){
        return res.status(405).json({message: "Method not allowed"})
    };
    try{
        await connectDB();
    }catch(err){
        console.error("MongoDB Connection Error",err)
        return res.status(500).json({message:"Internal server error"})
    }
    const form = new formidable.IncomingForm
    form.parse(req,async(err,fields, files) => {
        if(err){
            console.error("Formidable Error",err)
            return res.status(500).json({message: "Internal Server Error"});
        }
        const session = await getSession({req})
        if(!session){
            return res.status(401).json({message: "Unauthorized"});
        }

        const reviewMade = fields.review;
        const ratingMade = fields.rating;
        const ownerEmail = session.user.email;
        try{
        const owner = await User.findOne({email: ownerEmail})
        const ownerId = owner._id
        const gameId = fields.gameId
            const newReview = await new Review({
                owner: ownerId,
                reviews: reviewMade, 
                game: gameId,
                rating: ratingMade,
            })
            const savedReview = await newReview.save();
            console.log(savedReview)
            const updatedUser = await User.findOneAndUpdate(
                {_id: ownerId},
                {$push: {reviews: savedReview._id, games: gameId}},
                {new: true}
            )
            const updatedGame = await Game.findOneAndUpdate(
                {_id: gameId},
                {
                    $push: {reviews: savedReview._id},
                    $inc: {reviewCount: 1}
                },
                {new: true},
            )
            closeConnection();
            return res.status(201).json({message: "Review created successfully"})
        }catch(err){
            console.error("Error while creating review",err)
            return res.status(500).json({message: "Internal Server Error"});
        }finally {
            closeConnection();
          }

    })
}