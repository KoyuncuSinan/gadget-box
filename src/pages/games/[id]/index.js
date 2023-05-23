import React,{useState,useEffect} from "react";
import SingleGamePage from "@/components/games/SingleGamePage";
import { useRouter } from "next/router";

export default function GameSingle(){
    const [data, setData] = useState("");
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();
    const {id} = router.query;


    useEffect(() => {
        const getData = async () => {
            try{
                const res = await fetch(`/api/games/${id}`,{
                    headers:{
                        "Content-Type": "application/json"
                    }
                })
                const data = await res.json();
                if(!res.ok){
                    setIsError(true);
                    console.log(data)
                    setErrorMessage(data.message)
                }else{
                    console.log(data)
                    setData(data)
                }
            }catch(err){
                console.error(err);
            }
        }
        getData()

    },[id])

    return(
        <>
            <SingleGamePage game={data}/>
        </>
    )

}

