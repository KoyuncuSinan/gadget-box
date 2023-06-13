import { useMediaQuery } from "react-responsive";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import useBetterMediaQuery from "../util/useBetterMediaQuery";

export default function UserFollowings({data}){
    const isMobile = useBetterMediaQuery("(max-width: 899px)");
    const router = useRouter();
    const {id} = router.query;

    if (!data) {
        return <p>No games available.</p>;
      }

      const followingList = Object.values(data.getUserFollowings.followings)
      const displayFollowings = followingList.slice(0,18).map((following, index) => {
        return(
            <li>
            <Link href={`/user/${following._id}`}>
                <Image src={following.profilePicture} width={500} height={500} alt="Following's profile picture" 
                className="w-[3rem] h-[3rem] rounded-full object-cover hover:scale-105"></Image>

            </Link>
            </li>
        )
      })

    return(
        <>

         {isMobile ? (
        <> 
        <div className="flex flex-row justify-between font-light text-gray-400 mt-10 items-center mt">
        <h3 className>FOLLOWING</h3>
        <Link href={`/user/${id}/following`} className="font-thin text-xs">{followingList.length}</Link>
        </div>
        <hr className="mb-2"></hr>
        <ul className="grid grid-cols-6">
            {displayFollowings}
        </ul>
        
        </>

         )
        :
        (
            <> 
        <div className="flex flex-row justify-between font-light text-gray-400 mt-10 items-center mt">
        <h3 className>FOLLOWING</h3>
        <span className="font-thin text-xs">{followingList.length}</span>
        </div>
        <hr className="mb-2"></hr>
        <ul className="grid grid-cols-10">
            {displayFollowings}
        </ul>
        
        </>
        )
        }
        



        </>
    )
}