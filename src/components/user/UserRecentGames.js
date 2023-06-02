import { useMediaQuery } from "react-responsive";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

export default function UserRecentGames({data}){
    const isMobile = useMediaQuery({query:"(max-width:899px"})
    const router = useRouter();
    const {id} = router.query;

    const gameList = Object.values(data.getUserGames.games)
    const displayGames = gameList.map((game,index) => {
        return(
        <li className="">
                    <Link href={`/games/${game._id}`}>
                        <Image src={game.image} width={1000} height={1000} alt="Game's image" 
                        className="w-[7rem] h-[8rem] object-cover mx-auto rounded-md" priority>
                        </Image>
                    </Link>
                </li>

        )
    })

    return(
        <>
            {isMobile && 
        <> 
        <div className="flex flex-row justify-between font-light text-gray-400 items-center mt-10">
        <h3 className>RECENT GAMES</h3>
        <Link href={`/user/${id}/games`} className="font-thin text-xs">ALL</Link>
        </div>
        <hr className="mb-2"></hr>
        <ul className="grid grid-cols-4 gap-2">
            {displayGames}
        </ul>
        
        </>
        }
        </>

    )

}