import React,{useState} from "react"
import Link from "next/link"
import Image from "next/image"
import { useMediaQuery } from "react-responsive";


export default function AllGames({games}){
    const isMobile = useMediaQuery({query:"(max-width:899px"})


    if (!games) {
        return <p>No games available.</p>;
      }
      
    const gameList = Object.values(games.games)
    const allGames = gameList.map((game, index) => {
        return(
                <li key={game._id}>
                    <Link href={`/games/${game._id}`}>
                        <Image src={game.image} width={1000} height={1000} alt="Game's image" 
                        className="w-[7rem] h-[8rem] object-cover mx-auto rounded-md" loading="lazy">

                        </Image>
                    </Link>
                </li>
        )
    })

    return(
        <>
         {isMobile && 
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
        }
        


        </>
    )

}