import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import FavoriteIcon from "@mui/icons-material/Favorite";
import useBetterMediaQuery from "../util/useBetterMediaQuery";

export default function PopularReviewsThisWeek({ reviews }) {
    const isMobile = useBetterMediaQuery("(max-width: 899px)");

  if (!reviews) {
    return <p>No reviews available.</p>;
  }

  const reviewList = Object.values(reviews);
  const popularReviews = reviewList.map((review, index) => {
    const isLastElement = index === reviewList.length - 1;
    return (
      <li className="" key={review._id}>
        {isMobile ? (
          <>
            <div className="grid grid-cols-3">
              <figure
                className="col-span-1 w-[85%] h-[10rem] object-cover rounded-md
            sm:h-[12rem]
            md:h-[14rem]
            umd:h-[7rem] umd:w-[60%]
            "
              >
                <Image
                  src={review.game.image}
                  width={800}
                  height={800}
                  alt="Reviewed game's image"
                  className="w-full h-full object-cover rounded-md"
                ></Image>
              </figure>
              <div className="col-span-2">
                <div className="flex flex-row items-center  justify-between relative">
                  <Link href={`/games/${review.game._id}`}>
                    <h2 className="text-white font-bold text-2xl sm:text-3xl ">
                      {review.game.name}
                    </h2>
                  </Link>
                  <span className="text-gray-500 font-light text-xl">
                    {review.game.releaseDate.slice(0, 4)}
                  </span>
                </div>
                <div className="flex flex-row mt-3 items-center mb-2">
                  <Image
                    src={review.owner.profilePicture}
                    width={300}
                    height={300}
                    className="w-[2rem] h-[2rem] sm:w-[3rem] sm:h-[3rem]  rounded-full object-cover"
                  ></Image>
                  <Link href={`/user/${review.owner._id}`}>
                    <span className="ml-2 text-gray-400 font-bold text-lg xs:text-xl ">
                      {review.owner.username}
                    </span>
                  </Link>
                </div>
                <span className="text-gray-400">{review.rating}/10 Rating</span>
              </div>
            </div>
            <div className="mb-3">
              <p className="mt-3 text-gray-400">{review.reviews}</p>
            </div>
            <div className="mt-5 flex flex-row text-gray-500 font-semibold mb-5">
              <FavoriteIcon />
              <span className="ml-2">{review.likes} likes</span>
            </div>
            {!isLastElement && (
              <hr className="mb-2 mt-2 border-1 border-slate-600"></hr>
            )}
          </>
        ) : (
          <>
            <div className="grid grid-cols-4">
                <figure className="col-span-1 w-[50%]">
                    <Image src={review.game.image} width={800} height={800} alt="Reviewed game's image"
                    className="h-[7rem] object-cover rounded-md xl:h-[8rem] 2xl:h-[9rem]"                    
                    ></Image>
                </figure>

                <div className="col-span-3 -ml-10 lg:-ml-12 xl:-ml-20 2xl:-ml-24 3xl:-ml-28">
                    <div className="flex flex-row items-center  justify-between">
                    <Link href={`/games/${review.game._id}`}>
                    <h2 className="text-white font-bold text-2xl tracking-wide hover:text-orange-300">
                      {review.game.name}
                    </h2>
                  </Link>
                        <span className="text-gray-500 font-light text-xl">{review.game.releaseDate.slice(0, 4)}</span>
                    </div>

                    <div className="flex flex-row mt-1 items-center mb-2">
                        <Image src={review.owner.profilePicture} width={400} height={400} alt="Reviewed game's owner image" 
                        className="w-[2rem] h-[2rem] rounded-full object-cover"></Image>
                        <Link href={`/user/${review.owner._id}`}>
                    <span className="ml-2 text-gray-400 font-bold text-sm hover:text-gray-100">
                      {review.owner.username}
                    </span>
                    </Link>
                    <span className="text-gray-400 ml-2">{review.rating}/10 Rating</span>
                    </div>

                    <p className="my-2 text-gray-400 text-base">{review.reviews}</p>

                    <div className="mt-2 flex flex-row text-gray-500 font-semibold mb-5">
                        <FavoriteIcon />
                        <span>{review.likes}</span>
                    </div>

                </div>
            </div>
            {!isLastElement && (
              <hr className="mb-2 mt-2 border-1 border-slate-600"></hr>
            )}
        </>
        )}
      </li>
    );
  });

  return (
    <>
      {isMobile ? (
        <>
          <div className="flex flex-row justify-between font-light text-gray-400 mt-5 items-center">
            <h3 className>POPULAR REVIEWS THIS WEEK</h3>
            <Link href={`/games`} className="font-thin text-xs">
              MORE
            </Link>
          </div>
          <hr className="mb-2"></hr>
          <ul className="">{popularReviews}</ul>
        </>
      ) : (
        <>
          <div className="flex flex-row justify-between font-light text-gray-400 mt-5 items-center">
            <h3 className>POPULAR REVIEWS THIS WEEK</h3>
            <Link href={`/games`} className="font-thin text-xs hover:text-white">
              MORE
            </Link>
          </div>
          <hr className="mb-2"></hr>
          <ul className="">{popularReviews}</ul>
        </>
      )}
    </>
  );
}
