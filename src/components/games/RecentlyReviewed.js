import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import useBetterMediaQuery from "../util/useBetterMediaQuery";

export default function RecentlyReviewed({ games }) {
    const isMobile = useBetterMediaQuery("(max-width: 899px)");

  if (!games) {
    return <p>No games available.</p>;
  }

  const gameList = Object.values(games);
  const reviewedGames = gameList.slice(0, 8).map((game, index) => {
    return (
      <li className="">
        <Link href={`/games/${game._id}`}>
          <Image
            src={game.image}
            width={1000}
            height={1000}
            alt="Game's image"
            className="h-[7rem] w-[100%] object-cover rounded-md hover:brightness-125
            xs:h-[8rem]
            sm:h-[9rem]
            md:h-[10rem]
            umd:h-[12rem]
            lg:h-[14rem]"
          ></Image>
        </Link>
      </li>
    );
  });

  return (
    <>
      {isMobile ? (
        <>
          <div className="flex flex-row justify-between font-light text-gray-400 mt-5 items-center">
            <h3 className>RECENTLY REVIEWED</h3>
            <Link href={`/games`} className="font-thin text-xs">
              MORE
            </Link>
          </div>
          <hr className="mb-2"></hr>
          <ul className="grid grid-cols-4 gap-2">{reviewedGames}</ul>
        </>
      ):
      (
        <>
          <div className="flex flex-row justify-between font-light text-gray-400 mt-5 items-center">
            <h3 className>RECENTLY REVIEWED</h3>
            <Link href={`/games`} className="font-thin text-xs hover:text-white">
              MORE
            </Link>
          </div>
          <hr className="mb-2"></hr>
          <ul className="grid grid-cols-3 gap-2">{reviewedGames}</ul>
        </>
      )
      }
    </>
  );
}
