import Image from 'next/image'
import { Inter } from 'next/font/google'
import MaybeInterestedIn from '@/components/games/MaybeInterestedIn';
import React,{useState, useEffect} from "react";
import JustReviewed from "@/components/games/JustReviewed";
import background from "../../public/red-dead-redemption-2.jpg"
import Header from '@/components/navbar/Header';
import { useMediaQuery } from "react-responsive";
import logo from "../../public/icon.png"



export default function index(){
    const [randomGames, setRandomGames] = useState("");
    const [recentlyReviewsGames, setRecentlyReviewsGames] = useState("");
    const [errorMessage, setErrorMessage] = useState("")
    const [isThereError, setIsThereError] = useState(false); 

    const isMobile = useMediaQuery({query:"(max-width:899px"})


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

    return (
        <>
          <Header isMobile={isMobile} />
          <main className="mx-auto">
            {isMobile && (
              <section>
                <div className="image-container">
                  <div className="fade-out-image">
                    <Image src={background} width={1920} height={1080} className="object-cover h-auto w-full" />
                  </div>
                <div className="flex flex-row justify-center items-center text-white font-extrabold absolute left-0 right-0 bottom-2 mx-auto">
                  <Image src={logo} width={200} height={200} className="w-[4rem] mr-2" />
                  <h1 className="text-3xl">Gadget Box</h1>
                </div>
                </div>
                <h2 className="w-[80%] mx-auto font-normal text-white text-xl text-center mt-4">
                  Track games you've played.
                  <br />
                  Save those you want to try.
                  <br />
                  Tell your followers what's good.
                </h2>
              </section>
            )}
    
            <section>
              <MaybeInterestedIn games={randomGames} />
            </section>
            <section>
              <JustReviewed games={recentlyReviewsGames} />
            </section>
          </main>
        </>
      );
    

}
