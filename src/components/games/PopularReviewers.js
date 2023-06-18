
import React,{useState} from "react"
import Link from "next/link"
import Image from "next/image"
import useBetterMediaQuery from "../util/useBetterMediaQuery";


export default function PopularReviewers({reviewers}){
    const isMobile = useBetterMediaQuery("(max-width: 899px)");


    if (!reviewers) {
        return <p>No games available.</p>;
      }
      
    const reviewerList = Object.values(reviewers)
    const popularReviewers = reviewerList.map((reviewer, index) => {
        const isLastElement = index === reviewerList.length -1;

        return(
                <li className="flex flex-row items-center mb-3" key={reviewer._id}>
                    <Link href={`/user/${reviewer._id}`}>
                        <Image src={reviewer.profilePicture} width={1000} height={1000} alt="Reviewer's image" 
                        className="w-[3rem] h-[3rem] object-cover mx-auto rounded-full hover:scale-105" priority>
                        </Image>
                    </Link>
                    <div className="ml-3">
                        <Link href={`/user/${reviewer._id}`}>
                            <h3 className="text-white font-semibold hover:text-orange-300">{reviewer.username}</h3>
                        </Link>
                        <div className="text-slate-400 font-extralight">
                            <span>{reviewer.reviewCount}</span>
                            <span className="mx-1">reviews</span>
                        </div>
                    </div>
                    {!isLastElement && <hr className="mb-2 mt-2 border-1 border-slate-600"></hr> }

                </li>
        )
    })

    return(
        <>
         {isMobile ?
         (
        <> 
        <div className="flex flex-row justify-between font-light text-gray-400 items-center">
        <h3>POPULAR REVIEWERS</h3>
        <Link href={`/games`} className="font-thin text-xs">MORE</Link>
        </div>
        <hr className="mb-2"></hr>
        <ul className="mb-2 grid grid-cols-5">
            {popularReviewers}
        </ul>
        </>
         )
         :
         (
            <> 
        <div className="flex flex-row justify-between font-light text-gray-400 items-center">
        <h3>POPULAR REVIEWERS</h3>
        <Link href={`/games`} className="font-thin text-xs">MORE</Link>
        </div>
        <hr className="mb-2"></hr>
        <ul className="mb-2 grid grid-cols-5">
            {popularReviewers}
        </ul>
        </>
         )
        }
        </>
    )

}