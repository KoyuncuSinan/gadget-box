import React,{useState, useEffect} from "react";
import { useRouter } from "next/router";

export default function UnfollowButton({user}){

    const router = useRouter();
    const {id} = router.query


    const handleClick = async (e) => {
        e.preventDefault()
        try{
            const res = await fetch(`/api/util/unfollow`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                }
            })
            const data = await res.json();
            if(!data){
                setIsThereError(true);
                setErrorMessage(data.message);
                setIsLoading(false)
            }
            setState(data);
            console.log(state);
            setIsLoading(false);

        }catch(err){
            console.error(err)
            setIsThereError(true);
            setErrorMessage("Internal server error");
        }finally{
            
            setIsLoading(false)
        }
    }

    return(
        <button onClick={handleClick} className="bg-orange-500 text-white">Follow</button>
    )
}

