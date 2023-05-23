"use client";
import Image from "next/image"
import Link from "next/link";
import { useState,useEffect } from "react";
import { useSession } from "next-auth/react"
import { useRouter } from "next/router";


export default function SingleGamePage({game}){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { data: session, status } = useSession()

    const router = useRouter();
    const {id} = router.query;
    
    useEffect(() => {
        if(status === "authenticated"){
            setIsLoggedIn(true);
        }
    }, [status])

    if(!game || !game.reviews){
        return null;
    }

    const displayReviews = game.reviews.map((review,index) => {
        return(
                <li key={review._id}>
                     <div className="flex flex-row">
                        <Image src={review.owner.profilePicture} width={200} height={200} alt="User's picture"></Image>
                        <span>{`Review by ${review.owner.username} ${review.rating}`}</span>
                     </div>
                     <p>{review.reviews}</p>
                     <span>{review.likes}</span>
                </li>


        )
    })
    
    return(
    <main>
    <Image src={game.image} width={800} height={500} className="brightness-75"></Image>
    <div className="grid grid-cols-4 mt-2 w-[95%] mx-auto">
        <section className="col-span-1"> 
            <Image src={game.image} width={200} height={600} alt="Game's image" className="h-[10rem] object-cover"></Image>
            <span className="text-center block">{game.reviewCount}</span>
            <Link href={game.website}>Website</Link>
        </section>
        <section className="col-span-2 w-[85%] mx-auto">
            <h2 className="text-3xl font-extrabold">{game.name}</h2>
            <span className="text-xs font-thin ">{game.releaseDate}</span>
            <p className="font-light text-ellipsis">{game.description}</p>
        </section>
        <section className="col-span-1">
            {isLoggedIn ? 
            <Link href={`/games/${id}/review/create`}>
                <button>Send a review</button> 
            </Link>
                : 
            <Link href="/auth/login">
                <button>
                    Sign in to rate or review
                </button>
            
            </Link>}
        </section>
    </div>
    <section>
        <div className="flex flex-row">
            <span>POPULAR REVIEWS</span>
            <span>MORE</span>
            <hr></hr>
        </div>
        <ul>
            {displayReviews}
        </ul>
    </section>
    </main>

    )
}