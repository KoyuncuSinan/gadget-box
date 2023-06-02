
import React,{useState} from "react"
import Link from "next/link"
import Image from "next/image"
import { useMediaQuery } from "react-responsive";


export default function PopularReviewers({reviewers}){
    const isMobile = useMediaQuery({query:"(max-width:899px"})


    if (!reviewers) {
        return <p>No games available.</p>;
      }
      
    const reviewerList = Object.values(reviewers)
    const popularReviewers = reviewerList.map((reviewer, index) => {
        const isLastElement = index === reviewerList.length -1;

        return(
                <li className="flex flex-row items-center mb-3">
                    <Link href={`/user/${reviewer._id}`}>
                        <Image src={reviewer.profilePicture} width={1000} height={1000} alt="Reviewer's image" 
                        className="w-[3rem] h-[3rem] object-cover mx-auto rounded-full" priority>
                        </Image>
                    </Link>
                    <div className="ml-3">
                        <Link href={`/user/${reviewer._id}`}>
                            <h3 className="text-white font-semibold">{reviewer.username}</h3>
                        </Link>
                        <span className="text-slate-400 font-extralight">{reviewer.reviewCount} reviews</span>
                    </div>
                    {!isLastElement && <hr className="mb-2 mt-2 border-1 border-slate-600"></hr> }

                </li>
        )
    })

    return(
        <>
         {isMobile && 
        <> 
        <div className="flex flex-row justify-between font-light text-gray-400 items-center">
        <h3 className>POPULAR REVIEWERS</h3>
        <Link href={`/games`} className="font-thin text-xs">MORE</Link>
        </div>
        <hr className="mb-2"></hr>
        <ul className="mb-2">
            {popularReviewers}
        </ul>
        </>
        }
        </>
    )

}