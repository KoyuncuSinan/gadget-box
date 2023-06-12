import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useMediaQuery } from "react-responsive";
import useBetterMediaQuery from "../util/useBetterMediaQuery";

export default function AllReviews({ reviews }) {
  const isMobile = useBetterMediaQuery("(max-width: 899px)");

  if (!reviews) {
    return <p>No reviews available.</p>;
  }

  const reviewList = Object.values(reviews);
  const allReviews = reviewList.map((review, index) => {
    const isLastElement = index === reviewList.length - 1;
    return (
      <li key={review._id}>
        {isMobile ? (
          <>
            <div className="grid grid-cols-3">
              <Image
                src={review.game.image}
                width={800}
                height={800}
                alt="Reviewed game's image"
                className="col-span-1 w-[85%] h-[9rem] object-cover rounded-md "
                priority
              ></Image>
              <div className="col-span-2">
                <div className="flex flex-row items-center">
                  <Link href={`/games/${review.game._id}`}>
                    <h2 className="text-white font-bold text-2xl">
                      {review.game.name}
                    </h2>
                  </Link>
                  <span className="text-gray-500 font-light text-xl ml-4">
                    {review.game.releaseDate.slice(0, 4)}
                  </span>
                </div>
                <div className="flex flex-row mt-3 items-center mb-2">
                  <Image
                    src={review.owner.profilePicture}
                    width={300}
                    height={300}
                    alt="User's profile picture"
                    className="w-[2rem] h-[2rem] rounded-full object-cover"
                    priority
                  ></Image>
                  <Link href={`/user/${review.owner._id}`}>
                    <span className="ml-2 text-gray-400 font-bold text-lg">
                      {review.owner.username}
                    </span>
                  </Link>
                  <span className="text-gray-500 font-light text-xs ml-4">
                    Played at {review.createdAt.slice(0, 10)}
                  </span>
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
              <Image
                src={review.game.image}
                width={800}
                height={800}
                alt="Reviewed game's image"
                className="col-span-1 w-[95%] lg:w-[85%] h-full object-cover rounded-md "
                priority
              ></Image>
              <div className="col-span-3">
                <div className="flex flex-row items-center">
                  <Link href={`/games/${review.game._id}`}>
                    <h2 className="text-white font-bold text-2xl hover:text-orange-300">
                      {review.game.name}
                    </h2>
                  </Link>
                  <span className="text-gray-500 font-light text-xl ml-4">
                    {review.game.releaseDate.slice(0, 4)}
                  </span>
                </div>
                <div className="flex flex-row mt-3 items-center mb-2">
                  <Image
                    src={review.owner.profilePicture}
                    width={300}
                    height={300}
                    alt="User's profile picture"
                    className="w-[2rem] h-[2rem] rounded-full object-cover"
                    priority
                  ></Image>
                  <Link href={`/user/${review.owner._id}`}>
                    <span className="ml-2 text-gray-400 font-bold text-lg hover:text-gray-100">
                      {review.owner.username}
                    </span>
                  </Link>
                  <span className="text-gray-500 font-light text-xs ml-4">
                    Played at {review.createdAt.slice(0, 10)}
                  </span>
                </div>
                <span className="text-gray-400">{review.rating}/10 Rating</span>
                <div className="mb-3">
                  <p className="mt-3 text-gray-400">{review.reviews}</p>
                </div>
                <div className="mt-5 flex flex-row text-gray-500 font-semibold mb-5">
                  <FavoriteIcon />
                  <span className="ml-2">{review.likes} likes</span>
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
      <div className="flex flex-row justify-between font-light text-gray-400 mt-5 items-center">
        <h3 className>All Reviews</h3>
      </div>
      <hr className="mb-2"></hr>
      <ul className="">{allReviews}</ul>
    </>
  );
}
