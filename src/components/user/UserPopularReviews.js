import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import FavoriteIcon from '@mui/icons-material/Favorite';
import useBetterMediaQuery from "../util/useBetterMediaQuery";

export default function UserPopularReviews({data}){
    const isMobile = useBetterMediaQuery("(max-width: 899px)");
    const router = useRouter();
    const {id} = router.query;

    if (!data) {
        return <p>No games available.</p>;
      }

      const reviewList = Object.values(data.getUserPopularReviews.reviews)
      const popularReviews = reviewList.map((review, index) => {
        const isLastElement = index === reviewList.length -1;
        return(
                <li className="" key={review._id}>
                    <div className="grid grid-cols-3">
                        <Image src={review.game.image} width={500} height={500} className="col-span-1 w-[5rem] h-[7rem] object-cover" priority alt="Game's image"></Image>
                        <div className="col-span-2">
                            <div className="flex flex-row items-center">
                            <Link href={`/games/${review.game._id}`}>
                                <h2 className="text-white font-bold text-2xl">{review.game.name}</h2>
                            </Link>
                            <span className="text-gray-500 font-light text-xl ml-4">{review.game.releaseDate.slice(0,4)}</span>
                            </div>
                            <div className="mt-3 text-gray-400 items-center flex flex-row justify-between">
                            <span className="text-gray-400">{review.rating}/10 Rating</span>
                            <span className="text-sm text-gray-600 font-normal">Played {review.createdAt.slice(0,10)}</span>

                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                    <p className="mt-3 text-gray-400">{review.reviews}</p>
                    <div className="mt-5 flex flex-row text-gray-500 font-semibold">
                    <FavoriteIcon />
                    <span className="ml-2">{review.likes} likes</span></div>
                    </div>
                    {!isLastElement && <hr className="mb-2 mt-2 border-1 border-slate-600"></hr> }
                </li>
        )
    })
    return(
        <>
         {isMobile ? (
        <> 
        <div className="flex flex-row justify-between font-light text-gray-400 mt-16 items-center mt">
        <h3 className>POPULAR REVIEWS</h3>
        <Link href={`/user/${id}/reviews`} className="font-thin text-xs">MORE</Link>
        </div>
        <hr className="mb-2"></hr>
        <ul className="">
            {popularReviews}
        </ul>
        
        </>)
        :
        (
            <> 
        <div className="flex flex-row justify-between font-light text-gray-400 mt-16 items-center mt">
        <h3 className>POPULAR REVIEWS</h3>
        <Link href={`/user/${id}/reviews`} className="font-thin text-xs">MORE</Link>
        </div>
        <hr className="mb-2"></hr>
        <ul className="">
            {popularReviews}
        </ul>
        
        </>
        )
        }
        


        </>
    ) 

}
