import React,{ useState,useEffect } from "react";
import { useRouter } from "next/router";
import UserInformation from "@/components/user/UserInformation";
import Header from "@/components/navbar/Header";
import UserNumbers from "@/components/user/UserNumbers";
import UserRecentGames from "@/components/user/UserRecentGames";
import UserRecentReviews from "@/components/user/UserRecentReviews";
import UserPopularReviews from "@/components/user/UserPopularReviews";
import UserFollowings from "@/components/user/UserFollowings";
import FollowButton from "@/components/FollowButton";


export default  function Id(){
    const [data, setData] = useState("");
    const [errorMessage, setErrorMessage] = useState("")
    const [isThereError, setIsThereError] = useState(false); 
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const {id} = router.query;


    useEffect(() => {
        const getData = async () => {
            try{
                const res = await fetch(`/api/user/${id}`,{
                    method:"GET",
                    headers:{
                        "Content-Type":"application/json"
                    }
                })
                const data = await res.json();
                if(!data){
                    setIsThereError(true);
                    setErrorMessage(data.message);
                    setIsLoading(false)
                }else{

                    setData(data);
                    console.log(data);
                    setIsLoading(false);
                }

            }catch(err){
                console.error(err)
                setIsThereError(true);
                setErrorMessage("Internal server error");
            }finally{
                
                setIsLoading(false)
            }
        }
        if(id){
            getData()
        }
    },[id])

    
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