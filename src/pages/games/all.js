import React,{useState, useEffect} from "react";
import Header from "@/components/navbar/Header";
import AllGames from "@/components/games/AllGames";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


export const getServerSideProps = async () => {
    try {
        const res = await fetch("https://gadget-box.vercel.app/api/games/allGames", {
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


export default function GamesAll({data,errorMessage}){

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
              <Box sx={{ display: "flex"}} className="mt-10 mx-auto items-center justify-center text-white"> 
          <CircularProgress />
            </Box>
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