// import Game from "@/models/Game";
// import mongoose from "mongoose";
// import { connectDB, closeConnection } from "./lib/db";

// export default async function games(){
//     connectDB()
//     const res = await fetch(`https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&page=15`,{
//         method:"GET",
//         headers:{
//             "Content-Type":"application/json"
//         }
//     })
//     const data = await res.json();
//     const apiGames = data.results
//     const allApiGames = apiGames.map(async (apiGame)=> {
//         const id = apiGame.id
//         const response = await fetch(`https://api.rawg.io/api/games/${id}?key=${process.env.RAWG_API_KEY}`,{
//         method: "GET",
//         headers: {
//             "Content-Type":"application/json"
//         }
//     })
//     const dataDetail = await response.json();
//     const description = dataDetail.description_raw
//     const website = dataDetail.website;
//     const gameName = apiGame.name
//     const gameRelease = apiGame.released
//     const gameImage = apiGame.background_image
//     console.log(id, gameName, gameRelease, gameImage)

//         const game = new Game({
//             name: gameName,
//             releaseDate: gameRelease,
//             website: website,
//             description: description,
//             image: gameImage,
//             reviewCount: 0
//         })
       
//         console.log(game)
//         await game.save()

//     })
    
    
// }