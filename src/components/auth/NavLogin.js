import Link from "next/link";
import {signIn, signOut} from "next-auth/react"
import React, {useState} from "react";
import { useSession } from "next-auth/react";
import Header from "@/components/navbar/Header";

export default function NavLogin(){
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");

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
        } catch(err){
            console.error(err)
            console.log(err)
        }
    }

return(
    <>
    <form onSubmit={submitHandler} className="flex flex-col text-gray-400 bg-stone-900 my-2">
        <label htmlFor="email" className="w-[80%] mx-auto mb-1">Email</label>
        <input 
        type="text"
        name = "email"
        className="w-[80%] mx-auto mb-1"
        id="email"
        value={email}
        onChange = {(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password" className="w-[80%] mx-auto mb-1">Password</label>
        <input 
        type="password"
        name = "password"
        className="w-[80%] mx-auto mb-1"
        id="password"
        value={password}
        onChange = {(e) => setPassword(e.target.value)}
        />
        <div className="text-end mx-auto w-[80%] my-2">
        {session.status === "authenticated" ?  
        <button onClick={() => signOut()} >Logout</button> 
        :  
        <button>Login</button>}
       

        </div>
       
    </form>

    </>
)
}


