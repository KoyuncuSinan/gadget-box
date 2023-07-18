import { useState,useRef,useEffect } from "react";
import Header from "@/components/navbar/Header";
import { useRouter } from "next/router";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Register(){
    const [userForm, setUserForm] = useState({
        firstname: "",
        lastname: "",
        username: "",
        email:"",
        password:"",
    })
    const [profilePicture, setProfilePicture] = useState(null)
    const [isLoading ,setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isThereError, setIsThereError] = useState(false);
    const router = useRouter();

    




    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
        const formData = new FormData();
        Object.entries(userForm).forEach(([key, value]) => {
            formData.append(key,value);
        });
         formData.append("profilePicture", profilePicture)
        console.log(Array.from(formData.entries()));
          const res = await fetch("/api/register", {
            method: "POST",
            body: formData,
          });
          const data = await res.json();
          console.log(data.message)
          if (!res.ok) {
            console.log(data.message);
            setIsThereError(true);
            setErrorMessage(data.message);
          } else {
            console.log(data.msg);
            router.push("/auth/login")
          }
        } catch (err) {
          console.log(err);
          setIsThereError(true);
          setErrorMessage(err);
          return err;
        }finally{
            setIsLoading(false);
        }
      };

      const handleInputChange = (e) => {
        const {name, value, files} = e.target;
        if(name === "profilePicture"){
            setProfilePicture(files[0]);
        }else{
            setUserForm((prevUserForm) => ({
                ...prevUserForm,
                [name]: value,
            }))
        }
      };

    return(
        <>
        <Header />
        <h3 className="flex justify-center font-medium text-lg text-white mt-10">Register</h3>
        {
            isThereError ? <p className="text-white font-bold text-xl text-center my-2 p-1 bg-red-600 w-[40%] umd:w-[20%] mx-auto rounded-md">{errorMessage}</p> : null}
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="w-[80%] relative mx-auto sm:w-[75%] md:w-[70%] umd:w-[20%] mt-5 text-gray-400">
            <div className="flex flex-col mb-2">
                <label htmlFor="firstname">Firstname</label>
                <input
                    type="text"
                    required 
                    value={userForm.firstname}
                    name="firstname"
                    id="firstname"
                    className="h-[2rem] rounded-md"
                    onChange={handleInputChange}
                />
            </div>
            <div className="flex flex-col mb-2">
                <label htmlFor="lastname">Lastname</label>
                <input
                    type="text"
                    required 
                    value={userForm.lastname}
                    name="lastname"
                    className="h-[2rem] rounded-md"
                    id="lastname"
                    onChange={handleInputChange}
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
                    className="h-[2rem] rounded-md"
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
                    className="h-[2rem] rounded-md"
                    id="email"
                    onChange={handleInputChange}
                />
            </div>
            <div className="flex flex-col mb-2">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    className="h-[2rem] rounded-md"
                    required 
                    value={userForm.password}
                    name="password"
                    id="password"
                    onChange={handleInputChange}
                />
            </div>
            <div className="flex flex-col mb-2">
                <label htmlFor="profilePicture">Image</label>
                <input
                    type="file"
                    required 
                    className="h-[2rem] text-gray-400 rounded-md"
                    name="profilePicture"
                    id="profilePicture"
                    onChange={handleInputChange}
                />
            </div>
            <button type="submit" className="bg-orange-700 p-2 rounded-md text-white shadow-2xl hover:text-white hover:bg-black absolute right-2 mt-3">Register</button>
            {isLoading && <Box sx={{ display: "flex"}} className="mt-10 mx-auto items-center justify-center text-white"> 
          <CircularProgress />
            </Box> }
        </form>
        </>
    )
}