"use client";
import Image from "next/image";
import React from "react";

export default function JustReviewed({games}){
    const gameList = Object.values(games)
    const DisplayGames = gameList.map((game, index) => {
        return(
            <ul className="grid grid-cols-10">
                <li index= {game._id}>
                    <Image src={game.image} width={50} height={80} alt="Games' image"/>
                </li>
            </ul>
        )
    })

    return(
        <>
            {DisplayGames}

        </>
    )
}