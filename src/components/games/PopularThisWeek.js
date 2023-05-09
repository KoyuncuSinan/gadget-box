"use client";

import React,{useState} from "react";
import Image from "next/image";
export default function PopularThisWeek({games}){
    const gameList = Object.values(games);
    console.log(gameList)

    const DisplayGames = gameList.map((game, index) => {
        return(
                <li key={game._id}>
                    <Image src={game.image} width={200} height={600} alt="Game's image"/>
                    <div className="flex flex-row">
                        <span>{game.reviewCount}</span>
                    </div>
                </li>
        )
    })
    return(
        <>
        <div className="flex flex-row justify-between">
        <h3>You may be interested in</h3>
        <span>MORE</span>
        <hr className="text-white"></hr>
        </div>
        <ul className="grid grid-cols-4">
            {DisplayGames}
        </ul>

        </>
    )
}