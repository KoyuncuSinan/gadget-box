import React,{useState, useEffect} from "react";
import Header from "@/components/navbar/Header";
import AllGames from "@/components/games/AllGames";

export default function(){
    const [data, setData] = useState()
    const [errorMessage, setErrorMessage] = useState("")
    const [isThereError, setIsThereError] = useState(false); 
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            try{
                const res = await fetch(`/api/games/allGames`,{
                    method:"GET",
                    headers:{
                        "Content-Type":"application/json"
                    }
                })
                if(!res.ok){
                        setIsThereError(true);
                        setErrorMessage(res.message);
                        setIsLoading(false)
                }
                const responseData = await res.json()
                setData(responseData);
                console.log(responseData)
                setIsLoading(false);
            }catch(err){
                console.error(err)
                setIsThereError(true);
                setErrorMessage("Internal server error");
            }
        }
        getData()
    },[])

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
                    <AllGames games={data} />
                    </>
            )}
            </section>
        </main>
    </>
    )

}