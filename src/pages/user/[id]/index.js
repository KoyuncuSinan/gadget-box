import React,{ useState,useEffect } from "react";
import UserInformation from "@/components/user/UserInformation";
import Header from "@/components/navbar/Header";
import UserNumbers from "@/components/user/UserNumbers";
import UserRecentGames from "@/components/user/UserRecentGames";
import UserRecentReviews from "@/components/user/UserRecentReviews";
import UserPopularReviews from "@/components/user/UserPopularReviews";
import UserFollowings from "@/components/user/UserFollowings";
import FollowButton from "@/components/FollowButton";

export const getServerSideProps = async ({query}) => {
    const {id} = query;    
    
    try{
        const res = await fetch(`http://localhost:3000/api/user/${id}`,{
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



export default function Id({data, errorMessage}){
  
    const [isThereError, setIsThereError] = useState(false); 
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        setIsThereError(!data);
        setIsLoading(false);
      }, [data]);

    
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
                <div>
                    <UserInformation infos ={data.userInformation}/>
                    <FollowButton user = {data.userInformation} />
                </div>
                <UserNumbers data = {data}/>
                <UserRecentGames data={data}/>
                <UserRecentReviews data={data} />
                <UserPopularReviews data={data} />
                <UserFollowings data= {data} />

                </>
        )}
        </section>
    </main>
</>
)

}