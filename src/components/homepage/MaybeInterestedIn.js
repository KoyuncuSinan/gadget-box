import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import VisibilityIcon from "@mui/icons-material/Visibility";
import useBetterMediaQuery from "../util/useBetterMediaQuery";

export default function MaybeInterestedIn({ games }) {
  const gameList = Object.values(games);
  const isMobile = useBetterMediaQuery('(max-width: 899px)');

  const DisplayGames = gameList.map((game, index) => {
    return (
      <li key={game._id} className="relative">
        <Link href={`/games/${game._id}`}>
          <Image
            src={game.image}
            width={500}
            priority
            height={500}
            alt="Game's image"
            className="h-[80%] w-[100%] object-cover rounded-md hover:brightness-110
            umd:h-[10rem] lg:h-[12rem]
            xl:h-[15rem]
            "
          />
        </Link>
        <div className="flex flex-row">
          <VisibilityIcon className="w-[1rem]" />
          <span className="ml-1">{game.reviewCount}</span>
        </div>
      </li>
    );
  });
  return (
    <>
      {isMobile && (
        <>
          <div className="flex flex-row justify-between font-light items-center uppercase">
            <h3>You may be interested in</h3>
            <Link href={`/games`} className="font-thin text-xs ">
              MORE
            </Link>
          </div>
          <hr className="mb-2"></hr>
          <ul className="grid grid-cols-3 gap-2 mx-auto
          sm:grid-cols-4">
          
          {DisplayGames}
          </ul>
        </>
      )}
      {isMobile === false && (
        <> 
        <div className="flex flex-row justify-between font-light items-center uppercase">
            <h3>You may be interested in</h3>
            <Link href={`/games`} className="font-thin text-xs hover:text-white">
              MORE
            </Link>
          </div>
          <hr className="mb-2"></hr>
          <ul className="grid grid-cols-4 gap-2 mx-auto
          xl:grid-cols-3 
          ">
          
          {DisplayGames}
          </ul>
        </>
      )}
    </>
  );
}
