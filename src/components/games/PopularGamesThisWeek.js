import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import useBetterMediaQuery from "../util/useBetterMediaQuery";

export default function PopularGamesThisWeek({ games }) {
  const isMobile = useBetterMediaQuery("(max-width: 899px)");

  if (!games) {
    return <p>No games available.</p>;
  }

  const gameList = Object.values(games);
  const popularGames = gameList.slice(0, 15).map((game, index) => {
    return (
      <li key={game._id} className="">
        <Link href={`/games/${game._id}`}>
          <Image
            src={game.image}
            width={600}
            height={600}
            alt="Game's image"
            className="h-[80%] w-[100%] object-cover rounded-md hover:brightness-125
            umd:h-[12rem]
            lg:h-[14rem]"
            priority
          ></Image>
        </Link>
      </li>
    );
  });

  return (
    <>
      {isMobile ? (
        <>
          <div className="flex flex-row justify-between font-light text-gray-400 items-center">
            <h3>POPULAR GAMES THIS WEEK</h3>
            <Link href={`/games`} className="font-thin text-xs">
              MORE
            </Link>
          </div>
          <hr className="mb-2"></hr>
          <ul className="grid grid-cols-3 gap-2">{popularGames}</ul>
        </>
      ) : (
        <>
          <div className="flex flex-row justify-between font-light text-gray-400 items-center">
            <h3>POPULAR GAMES THIS WEEK</h3>
            <Link href={`/games/all`} className="font-thin text-xs hover:text-white">
              MORE
            </Link>
          </div>
          <hr className="mb-2"></hr>
          <ul className="grid grid-cols-5 gap-2">{popularGames}</ul>
        </>
      )}
    </>
  );
}
