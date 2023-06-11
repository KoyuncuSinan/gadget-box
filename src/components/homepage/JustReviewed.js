import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import useBetterMediaQuery from "../util/useBetterMediaQuery";


export default function JustReviewed({ games }) {
  const isMobile = useBetterMediaQuery('(max-width: 899px)');

  const gameList = Object.values(games);
  const DisplayGames = gameList.map((game, index) => {
    return (
      <li key={game._id} className="">
        <Link href={`/games/${game._id}`}>
          <Image
            src={game.image}
            width={500}
            height={500}
            alt="Game's image"
            className="h-[80%] w-[100%] object-cover rounded-md
            umd:h-[12rem]
            lg:h-[14rem] 
            "
            loading="lazy"
          />
        </Link>
      </li>
    );
  });

  return (
    <>
      {isMobile && (
        <>
          <div className="flex flex-row justify-between font-light items-center">
            <h3 className="font-light uppercase">Just Reviewed</h3>
            <Link href={`/games`} className="font-thin text-xs">
              MORE
            </Link>
          </div>
          <hr className="mb-2"></hr>
          <ul className="grid grid-cols-4 mb-5 gap-2 sm:grid-cols-5 md:grid-cols-5">{DisplayGames}</ul>
        </>
      )}
      {isMobile === false && (
        <> 
        <div className="flex flex-row justify-between font-light items-center uppercase">
            <h3 className="font-light">Just Reviewed</h3>
            <Link href={`/games`} className="font-thin text-xs">
              MORE
            </Link>
          </div>
          <hr className="mb-2"></hr>
          <ul className="grid grid-cols-5 mb-5 gap-2">{DisplayGames}</ul>
        </>
      )}
    </>
  );
}
