import PopularThisWeek from "@/components/games/PopularThisWeek";
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
                setRandomGames(data.random20Games)

            }catch(err){
                console.error(err);
            }
        }
        getData()
    },[])

    return(
        <main>
        <section>
            <PopularThisWeek games= {randomGames} />
        </section>
        <section>
            <JustReviewed games = {recentlyReviewsGames}/>
        </section>
        </main>
    )

}
