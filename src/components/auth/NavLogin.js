import Link from "next/link";
import {signIn, signOut} from "next-auth/react"
import React, {useState} from "react";
import { useSession } from "next-auth/react";
import Header from "@/components/navbar/Header";
import { data } from "autoprefixer";

export default function NavLogin(){
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {data: session, status} = useSession()
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
    {status === "authenticated" ? 
    <div className="w-[90%] flex justify-between mx-auto text-white h-[3rem] items-center">
        <span className="font-light">Logged in as <span className="font-bold">{session.user.email}</span> </span>
        <button onClick={() => signOut()} className="px-2 py-1 bg-orange-700 rounded-md">Logout</button> 
    </div>
    :
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
         <button>Login</button>
        </div>
    </form>
}
    </>
)
}


