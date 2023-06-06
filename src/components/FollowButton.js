import React,{useState, useEffect} from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import UnfollowButton from "./UnfollowButton";



export default function FollowButton({user}){
    const [state, setState] = useState()
    const [errorMessage, setErrorMessage] = useState("")
    const [isThereError, setIsThereError] = useState(false); 
    const [isLoading, setIsLoading] = useState(true);
    const { data: session, status } = useSession();
    const [isFollowed, setIsFollowed] = useState()

   const targetFollowersList = user.followers

   
    useEffect(() => {
        if (status === "authenticated" && session) {
            const userEmail = session.user.email;
          setState(true);
          for (let i = 0; i < targetFollowersList.length; i++) {
            if (targetFollowersList[i].email.includes(userEmail)) {
              setIsFollowed(true);
              break;
            } else {
              setIsFollowed(false);
            }
          }
        } else if (status === "unauthenticated") {
          setState(false);
        }
      }, [status, targetFollowersList, session]);
    

  
    const router = useRouter();
    const {id} = router.query
    console.log(id)
   
        const handleClick = async (e) => {
            try{
                const res = await fetch(`/api/util/follow`,{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json",
                    },
                    body:JSON.stringify({id:id})
                })
                if (!res.ok) { 
                    throw new Error("Follow request failed");
                  }
                const data = await res.json();
                if(!data){
                    setIsThereError(true);
                    setErrorMessage(data.message);
                    setIsLoading(false)
                }
                setState(data);
                console.log(state);
                setIsLoading(false);
                router.reload()

            }catch(err){
                console.error(err)
                setIsThereError(true);
                setErrorMessage("Internal server error");
            }finally{
                
                setIsLoading(false)
            }
        }


    return(
        <div>
        {state ? (isFollowed 
        ? (<span><UnfollowButton/></span>) 
        :  ((<button onClick={handleClick} className="bg-orange-500 text-white">Follow</button>))) : <span></span>}
        </div>
    )
}