import React,{useState, useEffect} from "react";
import { useRouter } from "next/router";
import Header from "@/components/navbar/Header";
import { useMediaQuery } from "react-responsive";
import UserAllGames from "@/components/user/UserAllGames";

export default function Games(){

    const [data, setData] = useState("");
    const [errorMessage, setErrorMessage] = useState("")
    const [isThereError, setIsThereError] = useState(false); 
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const {id} = router.query;

    const isMobile = useMediaQuery({query: "(max-width: 899px)"})

    useEffect(() => {
        const getData = async () => {
            try{
                const res = await fetch(`/api/user/${id}/games`,{
                    method:"GET",
                    headers:{
                        "Content-Type":"application/json"
                    }
                })
                const data = await res.json();
                if(!data){
                    setIsThereError(true);
                    setErrorMessage(data.message);
                    setIsLoading(false)
                }else{

                    setData(data);
                    console.log(data.userGames);
                    setIsLoading(false);
                }

            }catch(err){
                console.error(err)
                setIsThereError(true);
                setErrorMessage("Internal server error");
            }finally{
                
                setIsLoading(false)
            }
        }
        if(id){
            getData()
        }
    },[id])



    return(
        <>
            <Header />
            <main className="w-[90%] mx-auto">
                <section>
                {isLoading ? (
        <p>Loading...</p>
            ) : isThereError ? (
            <p>{errorMessage}</p>
            ) : (
                <>
                <UserAllGames data={data} />
                </>
        )}
                    
                </section>
            </main>
        </>
    )
}