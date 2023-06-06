import { useMediaQuery } from "react-responsive";
import Divider from '@mui/material/Divider';


export default function UserNumbers({data}){
    const isMobile = useMediaQuery({query:"(max-width:899px"})
    console.log(data.getUserGames.games)

    return(
        <>
        {isMobile &&
        (
            <section className="w-[90%] mx-auto mt-3">
            <div className="grid grid-cols-7">
                <div className="flex flex-col items-center">
                    <span className="text-white font-bold text-xl">{data.getUserGames.games.length}</span>
                    <span className="text-slate-500 font-light text-sm">GAMES</span>
                </div>
                <Divider orientation="vertical" className="mx-auto border-slate-700"/>
                <div className="flex flex-col items-center">
                    <span className="text-white font-bold text-xl">{data.userInformation.reviews.length}</span>
                    <span className="text-slate-500 font-light text-sm">REVIEWS</span>
                </div>
                <Divider orientation="vertical" className="mx-auto border-slate-700"/>

                <div className="flex flex-col items-center ">
                    <span className="text-white font-bold text-xl">{data.userInformation.followers.length}</span>
                    <span className="text-slate-500 font-light text-sm">FOLLOWERS</span>
                </div>
                <Divider orientation="vertical" className="mx-auto border-slate-700"/>

                <div className="flex flex-col items-center ">
                    <span className="text-white font-bold text-xl">{data.getUserFollowings.followings.length}</span>
                    <span className="text-slate-500 font-light text-sm">FOLLOWING</span>
                </div>
            </div>
        </section>

        )}
    </>
    )
}