import { useMediaQuery } from "react-responsive";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

export default function UserAllGames({data}){
    const isMobile = useMediaQuery({query:"(max-width:899px"})
    const router = useRouter();
    const {id} = router.query;

    if (!data) {
        return <p>No games available.</p>;
      }
      const gameList = Object.values(data.userGames.games)
      const displayList = gameList.map((game, index) =>{
        return(
            <li key={game._id}>
                <Link href={`/games/${game._id}`}>
                    <Image src={game.image} height={600} width={600} alt="Game's image" className="h-[8rem] sm:h-[9rem] md:h-[10rem] umd:h-[12rem] hover:brightness-110 
                    w-[100%] object-cover rounded-md"></Image>
                </Link>
            </li>
        )
      })

      return(
        <>
           

        <div className="flex flex-row font-bold text-white items-center mt-5">
            <Image src={data.userGames.profilePicture} width={500} height={500} className="w-[3rem] h-[3rem] rounded-full object-cover" alt="User's profile picture"></Image>
            <Link href={`/user/${id}`}>
                <span className="ml-3  hover:text-orange-300">{data.userGames.username}</span>
            </Link> 
        </div>
        <div className="flex flex-row justify-between font-light text-white mt-10 items-center mt">
        <h3>PLAYED</h3>
        </div>
        <hr className="mb-2"></hr>
        <ul className="grid grid-cols-4 umd:grid-cols-5 gap-2">
            {displayList}
        </ul>
        </>
      )
}