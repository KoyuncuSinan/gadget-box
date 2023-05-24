import Link from "next/link";
import {signIn, signOut} from "next-auth/react"
import React, {useState} from "react";
import { useSession } from "next-auth/react";

export default function Login(){
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");

    const session = useSession()
    console.log(session)
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
    <form onSubmit={submitHandler} className="flex flex-col text-gray-400 bg-stone-900">
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
        <button className="text-end mx-auto w-[80%]">Login</button>
        <button onClick={() => signOut()} className="mb-3">Logout</button>
    </form>
)
}


