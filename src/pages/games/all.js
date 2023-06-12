import React,{useState, useEffect} from "react";
import Header from "@/components/navbar/Header";
import AllGames from "@/components/games/AllGames";


export const getServerSideProps = async () => {
    try {
        const res = await fetch("http://localhost:3000/api/games/allGames", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        return {
          props: {
            data,
          },
        };
      } catch (err) {
        console.error(err);
        return {
          props: {
            data: null,
            errorMessage: "An error occurred while retrieving data.",
          },
        };
      }
    };


export default function({data,errorMessage}){

    const [isThereError, setIsThereError] = useState(false); 
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
    setIsThereError(!data);
    setIsLoading(false);
  }, [data]);

    return(
        <>
        <Header />
        <main className="w-[90%] umd:w-[60%] mx-auto">
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