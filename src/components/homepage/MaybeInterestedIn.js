import React,{useState} from "react";
import Image from "next/image";
import Link from "next/link";
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function MaybeInterestedIn({games}){
    const gameList = Object.values(games);
    console.log(gameList)

    const DisplayGames = gameList.map((game, index) => {
        return(
                <li key={game._id}>
                        <Link href={`/games/${game._id}`}>
                            <Image src={game.image} width={500} height={500} alt="Game's image" className="h-[5rem] w-[7rem] object-cover" loading="lazy"/>
                        </Link>
                    <div className="flex flex-row">
                        <VisibilityIcon className="w-[1rem]"/>
                        <span className="ml-1">{game.reviewCount}</span>
                    </div>
                </li>
        )
    })
    return(
        <>
        <div className="flex flex-row justify-between font-light items-center">
        <h3 className>You may be interested in</h3>
        <Link href={`/games`} className="font-thin text-xs">MORE</Link>
        </div>
        <hr className="mb-2"></hr>
        <ul className="grid grid-cols-3 gap-2">
            {DisplayGames}
        </ul>

        </>
    )
}