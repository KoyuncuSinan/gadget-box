import Image from 'next/image'
import { Inter } from 'next/font/google'
import MaybeInterestedIn from '@/components/games/MaybeInterestedIn';
import React,{useState, useEffect} from "react";
import JustReviewed from "@/components/games/JustReviewed";

export default function index(){
    const [randomGames, setRandomGames] = useState("");
    const [recentlyReviewsGames, setRecentlyReviewsGames] = useState("");
    const [errorMessage, setErrorMessage] = useState("")
    const [isThereError, setIsThereError] = useState(false); 

    useEffect(() => {
        const getData = async () => {
            try{
                const res = await fetch("/api/games/filteredgames",{
                    method:"GET",
                    headers:{
                        "Content-Type":"application/json"
                    }
                })
                const data = await res.json();
                if(!data){
                    setIsThereError(true);
                    setErrorMessage(data.message);
                }
                console.log(data.recentlyReviewed10Games)
                setRecentlyReviewsGames(data.recentlyReviewed10Games)
                setRandomGames(data.random6Games)

            }catch(err){
                console.error(err);
            }
        }
        getData()
    },[])

    return(
        <main>
        <section>
            <MaybeInterestedIn games= {randomGames} />
        </section>
        <section>
            <JustReviewed games = {recentlyReviewsGames}/>
        </section>
        </main>
    )

}
