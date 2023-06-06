import Image from "next/image";
import React from "react";
import Link from "next/link";

export default function JustReviewed({games}){
    const gameList = Object.values(games)
    const DisplayGames = gameList.map((game, index) => {
        return(
            
                <li key={game._id}>
                    <Link href={`/games/${game._id}`}>
                            <Image src={game.image} width={500} height={500} alt="Game's image" className="h-[3rem] w-[7rem] object-cover" loading="lazy"/>
                        </Link>
                </li>
           
        )
    })

    return(
        <>
        <div className="flex flex-row justify-between font-light items-center">
        <h3 className="font-light">JUST REVIEWED</h3>
        <Link href={`/games`} className="font-thin text-xs">MORE</Link>
        </div>
        <hr className="mb-2"></hr>
        <ul className="grid grid-cols-4 mb-5 gap-2">
        {DisplayGames}
        </ul>

        </>
    )
}