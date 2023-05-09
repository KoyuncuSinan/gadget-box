import Game from "@/models/Game";
import mongoose from "mongoose";
import { connectDB, closeConnection } from "../lib/db";

export default async function(req,res){
    if(req.method !== "GET"){
        return res.status(405).json({message: "Method not allowed."})
    }
    try{
        await connectDB()
    }catch(err){
        console.error("MongoDB Connection Error", err)
        return res.status(500).json({message: "Internal server error"})
    }

    const id = mongoose.Types.ObjectId(req.query.id);
    const singleGame = await Game.findById({id})
    if(!singleGame){
        return res.status(404).json({message:"Couldn't find the game"})
    }
    return res.status(200).json(singleGame);
}