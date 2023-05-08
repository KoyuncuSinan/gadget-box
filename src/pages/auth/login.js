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
    <form onSubmit={submitHandler}>
        <label htmlFor="email">Email</label>
        <input 
        type="text"
        name = "email"
        id="email"
        value={email}
        onChange = {(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input 
        type="password"
        name = "password"
        id="password"
        value={password}
        onChange = {(e) => setPassword(e.target.value)}
        />
        <button>Login</button>
        <button onClick={() => signOut()}>Logout</button>
    </form>
)
}


