import { useState,useRef,useEffect } from "react";
import Header from "@/components/navbar/Header";

export default function Register(){
    const [userForm, setUserForm] = useState({
        firstname: "",
        lastname: "",
        username: "",
        email:"",
        password:"",
    })
    const [profilePicture,setProfilePicture] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isThereError, setIsThereError] = useState(false);
    

    const inputData = new FormData();
    




    const handleSubmit = async (e) => {
        e.preventDefault();
        inputData.append("firstname",userForm.firstname)
        inputData.append("lastname",userForm.lastname)
        inputData.append("username",userForm.username)
        inputData.append("email",userForm.email)
        inputData.append("password",userForm.password)
        inputData.append("profilePicture",profilePicture)
        try {
        console.log(Array.from(inputData.entries()));
          const res = await fetch("/api/register", {
            method: "POST",
            body: inputData,
          });
          const data = await res.json();
          console.log(data)
          if (!res.ok) {
            console.log(data.msg);
            setIsThereError(true);
            setErrorMessage(data.msg);
          } else {
            console.log(data.msg);
          }
        } catch (err) {
          console.log(err);
          setIsThereError(true);
          setErrorMessage(err);
          return err;
        }
      };


    return(
        <>
        <Header />
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="w-[80%] relative mx-auto sm:w-[75%] md:w-[70%] umd:w-[20%] mt-5 text-gray-400">
            <div className="flex flex-col mb-2">
                <label htmlFor="firstname">Firstname</label>
                <input
                    type="text"
                    required 
                    value={userForm.firstname}
                    name="firstname"
                    id="firstname"
                    className="h-[2rem]"
                    onChange={(e) => setUserForm({...userForm, firstname: e.target.value})}
                />
            </div>
            <div className="flex flex-col mb-2">
                <label htmlFor="lastname">Lastname</label>
                <input
                    type="text"
                    required 
                    value={userForm.lastname}
                    name="lastname"
                    className="h-[2rem]"
                    id="lastname"
                    onChange={(e) => setUserForm({...userForm, lastname: e.target.value})}
                />
            </div>
            <div className="flex flex-col mb-2">
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    required 
                    value={userForm.username}
                    name="username"
                    id="username"
                    className="h-[2rem]"
                    onChange={(e) => setUserForm({...userForm, username: e.target.value})}
                />
            </div>
            <div className="flex flex-col mb-2">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    required 
                    value={userForm.email}
                    name="email"
                    className="h-[2rem]"
                    id="email"
                    onChange={(e) => setUserForm({...userForm, email: e.target.value})}
                />
            </div>
            <div className="flex flex-col mb-2">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    className="h-[2rem]"
                    required 
                    value={userForm.password}
                    name="password"
                    id="password"
                    onChange={(e) => setUserForm({...userForm, password: e.target.value})}
                />
            </div>
            <div className="flex flex-col mb-2">
                <label htmlFor="profilePicture">Image</label>
                <input
                    type="file"
                    required 
                    className="h-[2rem]"
                    name="profilePicture"
                    id="profilePicture"
                    onChange={(e) => setProfilePicture(e.target.files[0])}
                />
            </div>
            <button type="submit" className="bg-white p-2 rounded-md text-black shadow-2xl hover:text-white hover:bg-black absolute right-2 mt-3">Register</button>
        </form>
        </>
    )
}