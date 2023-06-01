import { useState,useEffect, useRef } from "react";
import Header from "@/components/navbar/Header";
import PopularGamesThisWeek from "@/components/games/PopularGamesThisWeek";
import RecentlyReviewed from "@/components/games/RecentlyReviewed";
import PopularReviewsThisWeek from "@/components/games/PopularReviewsThisWeek";
import PopularReviewers from "@/components/games/PopularReviewers";


export default function index(){
    
    const [data, setData] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [isThereError, setIsThereError] = useState(false); 
    const [isLoading, setIsLoading] = useState(true);
   

    useEffect(() => {
        const getData = async () => {
            try{
                const res = await fetch("/api/games/gamesPage",{
                    method: "GET",
                    headers:{
                        "Content-Type":"application/json"
                    }
                })
                const data = await res.json();
                if(!data){
                    setIsThereError(true);
                    setErrorMessage(data.message);
                }
                console.log(data)
                setData(data)
                setIsLoading(false);


            }catch(err){
                console.error(err)
                setIsLoading(false);
                setIsThereError(true);
                setErrorMessage("An error occurred while retrieving data.");
            }
        }
        getData()
    }, [])

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
                    <PopularGamesThisWeek games={data.popular16Games} />
                    <RecentlyReviewed  games={data.justReviewed12Games}/>
                    <PopularReviewsThisWeek reviews={data.getReviews}/>
                    <PopularReviewers reviewers={data.popularReviewers}/>

                        </>
                )}
                </section>
            </main>
        </>
    )



}