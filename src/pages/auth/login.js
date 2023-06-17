import Link from "next/link";
import {signIn, signOut} from "next-auth/react"
import React, {useState} from "react";
import { useSession } from "next-auth/react";
import Header from "@/components/navbar/Header";
import { useRouter } from "next/router";

export default function Login(){
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isThereError, setIsThereError] = useState(false);
    const router = useRouter();

    const session = useSession()
    console.log(session.status)
    const submitHandler = async(e) => {
        e.preventDefault()

        try {
            const data = await signIn("credentials", {
                redirect:false,
                email,
                password
            });
            console.log(data)
            if(data.error){
                setIsThereError(true)
                setErrorMessage(data.error)
            }
            router.push('/games');
        } catch(err){
            console.error(err)
            console.log(err)
            
        }
    }

return(
    <>
    <Header />
    <h3 className="flex justify-center font-medium text-lg text-white mt-10">Login</h3>
    {isThereError ? <p className="text-white font-bold text-xl text-center my-2 p-1 bg-red-600 w-[40%] umd:w-[20%] mx-auto rounded-md">{errorMessage}</p> : null}
    <form onSubmit={submitHandler} className="flex flex-col text-gray-400 bg-stone-900 mt-8 umd:w-[20%] mx-auto">
        <label htmlFor="email" className="w-[80%] mx-auto mb-1">Email</label>
        <input 
        type="text"
        name = "email"
        className="w-[80%] mx-auto mb-1 rounded-md px-2"
        id="email"
        value={email}
        onChange = {(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password" className="w-[80%] mx-auto mb-1">Password</label>
        <input 
        type="password"
        name = "password"
        className="w-[80%] mx-auto mb-1 rounded-md px-2"
        id="password"
        value={password}
        onChange = {(e) => setPassword(e.target.value)}
        />
        <div className="text-end mx-auto w-[80%] my-2">
        {session.status === "authenticated" ?  
        <button onClick={() => signOut()} >Logout</button> 
        :  
        <button className="bg-orange-700 text-white px-3 py-1 rounded-md">Login</button>}
        </div>
       
    </form>

    </>
)
}


