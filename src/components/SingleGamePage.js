import Image from "next/image"
import Link from "next/link";
import { useState,useEffect } from "react";
import { useSession } from "next-auth/react"
import { useRouter } from "next/router";
import { useMediaQuery } from "react-responsive";
import VisibilityIcon from '@mui/icons-material/Visibility';
import LanguageIcon from '@mui/icons-material/Language';
import FavoriteIcon from '@mui/icons-material/Favorite';




export default function SingleGamePage({game}){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const { data: session, status } = useSession()


    const router = useRouter();
    const {id} = router.query;
    const isMobile = useMediaQuery({query:"(max-width:899px"})

    const handleShowMore = () => {
        setShowMore(!showMore);
      };
      const description = game.description || '';
      const displayedDescription = showMore ? description : description.slice(0, 200) + '...';
    
    useEffect(() => {
        if(status === "authenticated"){
            setIsLoggedIn(true);
        }
    }, [status])

    if(!game || !game.reviews){
        return null;
    }

    const displayReviews = game.reviews.map((review,index) => {
        const isLastElement = index === game.reviews.length -1;
        return(
                <li className="" key={review._id}>
                    <div className="grid grid-cols-3">
                        <div className="col-span-3">
                            <div className="flex flex-row mt-3 items-center mb-2">
                                <Image src={review.owner.profilePicture} width={300} height={300} className="w-[2rem] h-[2rem] rounded-full object-cover" priority></Image>
                                <Link href={`/user/${review.owner._id}`}>
                                <span className="ml-2 text-gray-400 font-bold text-lg">{review.owner.username}</span>
                                </Link>
                            </div>
                            <span className="text-gray-400">{review.rating}/10 Rating</span>
                            <span className="text-gray-400 text-sm ml-10">Played at {review.createdAt.slice(0,10)}</span>
                        </div>
                    </div>
                    <div className="mb-3">
                    <p className="mt-3 text-gray-400">{review.reviews}</p>
                    </div>
                    <div className="mt-5 flex flex-row text-gray-500 font-semibold mb-5">
                    <FavoriteIcon />
                    <span className="ml-2">{review.likes} likes</span></div>
                    {!isLastElement && <hr className="mb-2 mt-2 border-1 border-slate-600"></hr> }
                </li>
        )
    })
    
    return(
    <main>
    {isMobile &&
    <>
    <Image src={game.image} width={800} height={500} className="brightness-75"></Image>
    <div className="w-[90%] mx-auto">
    <div className="grid grid-cols-4 mt-2 w-[95%] mx-auto">
        <section className="col-span-1 text-gray-400"> 
            <Image src={game.image} width={200} height={600} alt="Game's image" className="h-[10rem] object-cover"></Image>
            <div className="flex flex-row mt-1">
                <VisibilityIcon />
                <span className="text-center block font-light ml-1">{game.reviewCount}</span>
            </div>
            <div className="flex flex-row text-gray-400 mt-1">
            <LanguageIcon />
            <Link href={game.website} className="ml-1">Website</Link>
            </div>
            <div className="mt-5 bg-slate-600 rounded-md" >
            {isLoggedIn ? 
            <Link href={`/games/${id}/review/create`}>
                <button className="text-slate-300">Send a review</button> 
            </Link>
                : 
            <Link href="/auth/login">
                <button className="text-slate-300 text-sm">
                    Sign in to rate or review
                </button>
            
            </Link>}
            </div>
        </section>
        <section className="col-span-3 w-[85%] mx-auto">
            <h2 className="text-2xl font-bold text-white">{game.name}</h2>
            <span className="text-xs font-thin text-gray-400">{game.releaseDate}</span>
            <div>
        <p className="text-base font-light text-gray-400">{displayedDescription}</p>
        {!showMore ? (
            <button onClick={handleShowMore}>More</button>) :
            <button onClick={handleShowMore}>Less</button> 
            
         }
                </div>        
            </section>
        
    </div>
    <section>
    <div className="flex flex-row justify-between font-light text-gray-400 mt-5 items-center">
        <h3 className>REVIEWS</h3>
        </div>
        <hr className="mb-2"></hr>
        <ul>
            {displayReviews}
        </ul>
    </section>
    </div>
    </>
    }
    
    </main>

    )
}