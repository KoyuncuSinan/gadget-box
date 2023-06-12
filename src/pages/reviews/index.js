import React,{useState, useEffect} from "react";
import AllReviews from "@/components/review/AllReviews";
import Header from "@/components/navbar/Header";

export const getServerSideProps = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/review/allReviews", {
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


export default function({data, errorMessage}){

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
                    <AllReviews reviews={data} />
                    </>
            )}
            </section>
        </main>
    </>
    )

}