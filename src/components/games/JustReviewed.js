"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";

export default function JustReviewed({games}){
    const gameList = Object.values(games)
    const DisplayGames = gameList.map((game, index) => {
        return(
            <ul className="grid grid-cols-5 mb-5">
                <li index= {game._id}>
                    <Link href={`/games/${game._id}`}>
                            <Image src={game.image} width={1920} height={1080} alt="Game's image" className="h-[3rem] w-[7rem] object-cover"/>
                        </Link>
                </li>
            </ul>
        )
    })

    return(
        <>
        <div className="flex flex-row justify-between font-light">
        <h3 className="font-light">JUST REVIEWED</h3>
        <Link href={`/games`}>MORE</Link>
        </div>
        <hr className="mb-2"></hr>
           
        {DisplayGames}

        </>
    )
}