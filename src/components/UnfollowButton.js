import React,{useState, useEffect} from "react";
import { useRouter } from "next/router";

export default function UnfollowButton(){

    const router = useRouter();
    const {id} = router.query
    const [errorMessage, setErrorMessage] = useState("")
    const [isThereError, setIsThereError] = useState(false); 
    const [isLoading, setIsLoading] = useState(true);

    const handleClick = async (e) => {
        try{
            const res = await fetch(`/api/util/unfollow`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({id:id})
            })
            const data = await res.json();
            if(!data){
                setIsThereError(true);
                setErrorMessage(data.message);
                setIsLoading(false)
            }
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
        <button onClick={handleClick} className="bg-orange-700 text-white px-2 rounded-md">Unfollow</button>
    )
}

