import React,{useState, useEffect} from "react";
import Header from "@/components/navbar/Header";
import useBetterMediaQuery from "@/components/util/useBetterMediaQuery";
import UserAllGames from "@/components/user/UserAllGames";

export const getServerSideProps = async ({query}) =>{
    const {id} = query;    
    
    try{
        const res = await fetch(`https://gadget-box.vercel.app/api/user/${id}/games`,{
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


export default function Games({data,errorMessage}){

   
    const [isThereError, setIsThereError] = useState(false); 
    const [isLoading, setIsLoading] = useState(true);

    const isMobile = useBetterMediaQuery("(max-width: 899px)");

    useEffect(() => {
        setIsThereError(!data);
        setIsLoading(false);
      }, [data]);



    return(
        <>
            <Header />
           
                {isLoading ? (
        <p>Loading...</p>
            ) : isThereError ? (
            <p>{errorMessage}</p>
            ) : isMobile ? (
                <main className="w-[90%] mx-auto">
                <section>
                <UserAllGames data={data} />
                </section>
                </main>
        ):
        (
            <main className="w-[60%] mx-auto">
                <section>
                <UserAllGames data={data} />
                </section>
                </main>
        )}
                    
                
        </>
    )
}