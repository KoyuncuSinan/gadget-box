import mongoose from "mongoose";
import databaseConnection from "../util/databaseConnect";
import Game from "@/models/Game";

export default async function Searchbar(req,res){
    if(req.method !== "GET"){
        return res.status(405).json({message: "Method not allowed."})
    }

    await databaseConnection();

    try{
        const gamesForSearchbar = await Game.find();
        const gameNamesAndIds = gamesForSearchbar.map(game => ({name: game.name, id: game._id, releaseDate: game.releaseDate}))
        return res.status(200).json(gameNamesAndIds)
    }catch(err){
        console.error("Error while searching", err)
        return res.status(500).json({message: "Error while searching"});
    }
}