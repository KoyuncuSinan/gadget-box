
import React,{useState} from "react"
import Link from "next/link"
import Image from "next/image"
import { useMediaQuery } from "react-responsive";


export default function PopularGamesThisWeek({games}){
    const isMobile = useMediaQuery({query:"(max-width:899px"})


    if (!games) {
        return <p>No games available.</p>;
      }
      
    const gameList = Object.values(games)
    const popularGames = gameList.slice(0,15).map((game, index) => {
        return(
                <li className="">
                    <Link href={`/games/${game._id}`}>
                        <Image src={game.image} width={1000} height={1000} alt="Game's image" 
                        className="w-[7rem] h-[9rem] object-cover mx-auto rounded-md" priority>

                        </Image>
                    </Link>
                </li>
        )
    })

    return(
        <>
         {isMobile && 
        <> 
        <div className="flex flex-row justify-between font-light text-gray-400 items-center">
        <h3 className>POPULAR GAMES THIS WEEK</h3>
        <Link href={`/games`} className="font-thin text-xs">MORE</Link>
        </div>
        <hr className="mb-2"></hr>
        <ul className="grid grid-cols-3 gap-2">
            {popularGames}
        </ul>
        
        </>
        }
        


        </>
    )

}