"use client"

import React,{useState} from "react"
import Link from "next/link"
import Image from "next/image"
import { useMediaQuery } from "react-responsive";


export default function PopularReviewsThisWeek({reviews}){
    const isMobile = useMediaQuery({query:"(max-width:899px"})


    if (!reviews) {
        return <p>No reviews available.</p>;
      }
      
    const reviewList = Object.values(reviews)
    const popularReviews = reviewList.map((review, index) => {
        const isLastElement = index === reviewList.length -1;
        return(
                <li className="" key={review._id}>
                    <div className="grid grid-cols-3">
                        <Image src={review.game.image} width={500} height={500} className="col-span-1 w-[6rem] h-[8rem] object-cover"></Image>
                        <div className="col-span-2">
                            <div className="flex flex-row items-center">
                            <Link href={`/games/${review.game._id}`}>
                                <h2 className="text-white font-bold text-2xl">{review.game.name}</h2>
                            </Link>
                            <span className="text-gray-500 font-light text-xl ml-4">{review.game.releaseDate.slice(0,4)}</span>
                            </div>
                            <div className="flex flex-row mt-3 items-center mb-2">
                                <Image src={review.owner.profilePicture} width={300} height={300} className="w-[2rem] h-[2rem] rounded-full object-cover"></Image>
                                <Link href={`/user/${review.owner._id}`}>
                                <span className="ml-2 text-gray-400 font-bold text-lg">{review.owner.username}</span>
                                </Link>
                            </div>
                            <span className="text-gray-400">{review.rating}/10 Rating</span>
                        </div>
                    </div>
                    <div className="mb-3">
                    <p className="mt-3 text-gray-400">{review.reviews}</p>
                    <span className="mt-1">{review.likes}0</span>
                    </div>
                    {!isLastElement && <hr className="mb-2 mt-2 border-1 border-slate-600"></hr> }
                </li>
        )
    })

    return(
        <>
         {isMobile && 
        <> 
        <div className="flex flex-row justify-between font-light text-gray-400 mt-5 items-center">
        <h3 className>POPULAR REVIEWS THIS WEEK</h3>
        <Link href={`/games`} className="font-thin text-xs">MORE</Link>
        </div>
        <hr className="mb-2"></hr>
        <ul className="">
            {popularReviews}
        </ul>
        
        </>
        }
        


        </>
    )

}