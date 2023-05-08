import { useState,useRef,useEffect } from "react";

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
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div>
                <label htmlFor="firstname">Firstname</label>
                <input
                    type="text"
                    required 
                    value={userForm.firstname}
                    name="firstname"
                    id="firstname"
                    onChange={(e) => setUserForm({...userForm, firstname: e.target.value})}
                />
            </div>
            <div>
                <label htmlFor="lastname">Lastname</label>
                <input
                    type="text"
                    required 
                    value={userForm.lastname}
                    name="lastname"
                    id="lastname"
                    onChange={(e) => setUserForm({...userForm, lastname: e.target.value})}
                />
            </div>
            <div>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    required 
                    value={userForm.username}
                    name="username"
                    id="username"
                    onChange={(e) => setUserForm({...userForm, username: e.target.value})}
                />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    required 
                    value={userForm.email}
                    name="email"
                    id="email"
                    onChange={(e) => setUserForm({...userForm, email: e.target.value})}
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    required 
                    value={userForm.password}
                    name="password"
                    id="password"
                    onChange={(e) => setUserForm({...userForm, password: e.target.value})}
                />
            </div>
            <div>
                <label htmlFor="profilePicture">Image</label>
                <input
                    type="file"
                    required 
                    name="profilePicture"
                    id="profilePicture"
                    onChange={(e) => setProfilePicture(e.target.files[0])}
                />
            </div>
            <button type="submit">Register</button>
        </form>
    )
}