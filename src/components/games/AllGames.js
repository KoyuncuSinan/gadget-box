import React,{useState} from "react"
import Link from "next/link"
import Image from "next/image"
import useBetterMediaQuery from "../util/useBetterMediaQuery";


export default function AllGames({games}){
    const isMobile = useBetterMediaQuery("(max-width: 899px)");


    if (!games) {
        return <p>No games available.</p>;
      }
      
    const gameList = Object.values(games.games)
    const allGames = gameList.map((game, index) => {
        return(
                <li key={game._id}>
                    <Link href={`/games/${game._id}`}>
                        <Image src={game.image} width={1000} height={1000} alt="Game's image" 
                        className="w-[100%] h-[8rem] sm:h-[10rem] md:h-[11rem] object-cover mx-auto rounded-md" priority>

                        </Image>
                    </Link>
                </li>
        )
    })

    return(
        <>
         {isMobile ?
        <> 
        <div className="flex flex-row justify-between font-light text-gray-400 items-center mt-4">
        <h3 className>ALL GAMES</h3>
        </div>
        <hr className="mb-2"></hr>
        <div className="mt-4 mb-2 flex justify-center items-center bg-gray-600 rounded-md h-[2rem]">
            <span className="text-gray-400 font-light text-sm">There are {games.gamesCount} games.</span>
        </div>
        <ul className="grid grid-cols-4 gap-2">
            {allGames}
        </ul>
        </> 
        :
        <> 
        <div className="flex flex-row justify-between font-light text-gray-400 items-center mt-4">
        <h3 className>ALL GAMES</h3>
        </div>
        <hr className="mb-2"></hr>
        <div className="mt-4 mb-2 flex justify-center items-center bg-gray-600 rounded-md h-[2rem]">
            <span className="text-gray-400 font-light text-sm">There are {games.gamesCount} games.</span>
        </div>
        <ul className="grid grid-cols-5 gap-4">
            {allGames}
        </ul>
        </> 
        }
        


        </>
    )

}