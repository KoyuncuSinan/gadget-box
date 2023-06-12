import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import useBetterMediaQuery from "../util/useBetterMediaQuery";


export default function UserInformation({infos}){
    const isMobile = useBetterMediaQuery("(max-width: 899px)");

    if(!infos){
        return <p>No information about this user.</p>
    }
    return(
        <> 
            {isMobile ? (
            <section className="mx-auto relative">
                <div className="flex flex-row mt-10 items-center justify-center">
                    <Image src={infos.profilePicture} width={500} height={500} 
                        className="w-[5rem] h-[5rem] rounded-full object-cover border-gray-100 border-[1px] " 
                        alt="User's profile picture" priority ></Image>
                   <div className="flex items-center flex-col ml-3">
                    <h3 className="text-white font-semibold ">{infos.username}</h3>
                    <span className="text-slate-400 font-light ">{infos.firstname} {infos.lastname}</span>
                   </div>
                </div>
               
            </section>
            )       
            :
            (
                <section className="w-[60%] mx-auto relative">
                <div className="flex flex-row mt-10 items-center justify-center">
                    <Image src={infos.profilePicture} width={500} height={500} 
                        className="w-[5rem] h-[5rem] rounded-full object-cover border-gray-100 border-[1px] " 
                        alt="User's profile picture" priority ></Image>
                   <div className="flex items-center flex-col ml-3">
                    <h3 className="text-white font-semibold ">{infos.username}</h3>
                    <span className="text-slate-400 font-light ">{infos.firstname} {infos.lastname}</span>
                   </div>
                </div>
            </section>
            )
            }
         </>
    )


}