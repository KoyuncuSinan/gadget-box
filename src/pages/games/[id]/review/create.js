import React,{ useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Select from "react-select"
import Link from "next/link";

const options = [
    {value: 1, label:"1"},
    {value: 2, label: "2"},
    {value: 3, label: "3"},
    {value: 4, label: "4"},
    {value: 5, label: "5"},
    {value: 6, label: "6"},
    {value: 7, label: "7"},
    {value: 8, label: "8"},
    {value: 9, label: "9"},
    {value: 10, label: "10"}
]


export default function CreateReview(){

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")
    const [form, setForm] = useState({
        review:"",
        rating:""
    })

    const { data: session, status } = useSession()

    const router = useRouter();
    const {id} = router.query;
    
    const userEmailRef = useRef("")

    useEffect(() => {
        if(status === "authenticated"){
            setIsLoggedIn(true);
            userEmailRef.current = session.user.email
        }
    }, [status, session])
    console.log(userEmailRef.current)

    const handleSubmit = async () => {
        const userEmail = userEmailRef.current;
        try{
            const res = await fetch("/api/review/create",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({gameId: id, rating: form.rating, review: form.review, userEmail: userEmail })
            })
            const data = await res.json();
            if(!res.ok){
                setIsError(true);
                setErrorMessage(data.message);
                console.log(data.message)
                return;
            }else{
                console.log(data.message)
                router.push(`/games/${id}`)
            }


        }catch(err){
            console.error("Error while; fetching",err)
            return err;
        }
    }

    return(
    <>
        {isLoggedIn ? <form onSubmit={handleSubmit}>
            <label htmlFor="review">Your Review</label>
            <textarea 
                name="review"
                id="review"
                required
                className="text-black"
                value={form.review}
                onChange = {(e) => setForm({...form, review: e.target.value})}
            />
            <label>Your Rating</label>
            <Select options={options} 
                onChange={(selectedOption) => setForm({ ...form, rating: selectedOption.value })}
                defaultValue = {form.rating}
                className="text-black"
            />
                <button type="submit">Submit</button>
        </form>:
        <div>You need to login to see this page</div>}
    </>
        
    )
}