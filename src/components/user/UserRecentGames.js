import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import useBetterMediaQuery from "../util/useBetterMediaQuery";

export default function UserRecentGames({data}){
    const isMobile = useBetterMediaQuery("(max-width: 899px)");
    const router = useRouter();
    const {id} = router.query;

    const gameList = Object.values(data.getUserGames.games)
    const displayGames = gameList.map((game,index) => {
        return(
        <li key={game._id}>
                    <Link href={`/games/${game._id}`}>
                        <Image src={game.image} width={1000} height={1000} priority alt="Game's image" 
                        className="w-full h-full object-cover mx-auto rounded-md hover:brightness-110">
                        </Image>
                    </Link>
                </li>

        )
    })

    return(
        <>
            {isMobile ? (
        <> 
        <div className="flex flex-row justify-between font-light text-gray-400 items-center mt-10">
        <h3>RECENT GAMES</h3>
        <Link href={`/user/${id}/games`} className="font-thin text-xs">ALL</Link>
        </div>
        <hr className="mb-2"></hr>
        <ul className="grid grid-cols-4 gap-2">
            {displayGames}
        </ul>
        
        </>
            )
            :
            (
            <> 
                    <div className="flex flex-row justify-between font-light text-gray-400 items-center mt-5">
                    <h3>RECENT GAMES</h3>
                    <Link href={`/user/${id}/games`} className="font-thin text-xs hover:text-white">ALL</Link>
                    </div>
                    <hr className="mb-2"></hr>
                    <ul className="grid grid-cols-4 gap-2">
                        {displayGames}
                    </ul>
        
        </>
            )
        }
        </>

    )

}