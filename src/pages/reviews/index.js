import React,{useState, useEffect} from "react";
import AllReviews from "@/components/review/AllReviews";
import Header from "@/components/navbar/Header";


export default function(){
    const [data, setData] = useState()
    const [errorMessage, setErrorMessage] = useState("")
    const [isThereError, setIsThereError] = useState(false); 
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            try{
                const res = await fetch(`api/review/allReviews`,{
                    method:"GET",
                    headers:{
                        "Content-Type":"application/json"
                    }
                })
                if(!res.ok){
                         setIsThereError(true);
                        setErrorMessage(data.message);
                        setIsLoading(false)
                }
                const data = await res.json()
                setData(data);
                console.log(data)
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
                    <AllReviews reviews={data} />
                    </>
            )}
            </section>
        </main>
    </>
    )

}