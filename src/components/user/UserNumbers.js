import useBetterMediaQuery from '../util/useBetterMediaQuery';
import Divider from '@mui/material/Divider';


export default function UserNumbers({data}){
    const isMobile = useBetterMediaQuery("(max-width: 899px)");
    console.log(data.getUserGames.games)

    return(
        <>
        
            <section className="mx-auto mt-5">
            <div className="grid grid-cols-4">
                <div className="flex flex-col items-center">
                    <span className="text-white font-bold text-xl">{data.getUserGames.games.length}</span>
                    <span className="text-slate-500 font-light text-sm">GAMES</span>
                </div>
               
                <div className="flex flex-col items-center">
                    <span className="text-white font-bold text-xl">{data.userInformation.reviews.length}</span>
                    <span className="text-slate-500 font-light text-sm">REVIEWS</span>
                </div>

                <div className="flex flex-col items-center ">
                    <span className="text-white font-bold text-xl">{data.userInformation.followers.length}</span>
                    <span className="text-slate-500 font-light text-sm">FOLLOWERS</span>
                </div>

                <div className="flex flex-col items-center ml-1 sm:ml-0">
                    <span className="text-white font-bold text-xl">{data.getUserFollowings.followings.length}</span>
                    <span className="text-slate-500 font-light text-sm">FOLLOWING</span>
                </div>
            </div>
        </section>
    </>
    )
}