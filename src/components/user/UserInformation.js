"use client"
import Image from "next/image";
import { useMediaQuery } from "react-responsive";


export default function UserInformation({infos}){
    const isMobile = useMediaQuery({query: "(max-width: 899px)"})

    if(!infos){
        return <p>No information about this user.</p>
    }
    return(
        <> 
            {isMobile && (
            <section className="w-[90%] mx-auto">
                <div className="flex flex-row mt-10 items-center justify-center mr-20">
                    <Image src={infos.profilePicture} width={500} height={500} 
                    className="w-[5rem] h-[5rem] rounded-full object-cover border-gray-100 border-[1px] " 
                    alt="User's profile picture" priority ></Image>
                    <h3 className="text-white font-semibold ml-3 mt-5">{infos.username}</h3>
                </div>
                <div className="flex flex-row text-slate-400 font-light justify-center ">
                    <span>{infos.firstname}</span>
                    <span className="ml-1 mb-3">{infos.lastname}</span>
                </div>
            </section>
            
            )       
            }
         </>
    )


}