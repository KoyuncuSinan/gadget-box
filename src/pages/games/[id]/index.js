import React,{useState,useEffect} from "react";
import SingleGamePage from "@/components/SingleGamePage";
import { useRouter } from "next/router";
import Header from "@/components/navbar/Header";
import useBetterMediaQuery from "@/components/util/useBetterMediaQuery";

export const getServerSideProps = async ({query}) => {
    const {id} = query;    
    
    try{
        const res = await fetch(`http://localhost:3000/api/games//${id}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        });
        const data = await res.json();
        return{
            props:{
                data
            },
        };
    }catch(err){
        console.error(err);
        return{
            props:{
                data: null,
                errorMessage: "An error occurred while retrieving data."
            },
        };
    }
}

export default function GameSingle({data, errorMessage}){
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true)
  
    const isMobile = useBetterMediaQuery("(max-width: 899px)");

    useEffect(() => {
        setIsError(!data);
        setIsLoading(false);
      }, [data]);

    return(
        <>
            <Header />
        {isLoading ? (<p>Loading...</p>) : isError ? (<p>{errorMessage}</p>) : isMobile ? (
            <>
                <SingleGamePage game={data}/>
            </> 
        ) : <>
            <SingleGamePage game={data}/>
            </>}

        </>
    )

}

