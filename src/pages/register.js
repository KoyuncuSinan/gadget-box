import { useState,useRef,useEffect } from "react";

export default function Register(){
    const [userForm, setUserForm] = useState({
        firstname: "",
        lastname: "",
        username: "",
        email:"",
        password:"",
    })
    const [profilePicture, setProfilePicture] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isThereError, setIsThereError] = useState(false);

    const addToFormData = (formData, inputs) => {
        for(const input in inputs){
            formData.append(`${input}`, inputs[input]);
        }
    }

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          addToFormData(inputData, userForm);
          inputData.append("profilePicture", profilePicture);
          console.log(inputData); // <-- add this line
          const res = await fetch("http://localhost:3000/api/register", {
            method: "POST",
            body: inputData,
          });
          const data = await res.json();
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
                    onChange={(e) => setUserForm({...userForm, [e.target.name]: e.target.value})}
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
                    onChange={(e) => setUserForm({...userForm, [e.target.name]: e.target.value})}
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
                    onChange={(e) => setUserForm({...userForm, [e.target.name]: e.target.value})}
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
                    onChange={(e) => setUserForm({...userForm, [e.target.name]: e.target.value})}
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
                    onChange={(e) => setUserForm({...userForm, [e.target.name]: e.target.value})}
                />
            </div>
            <div>
                <label htmlFor="profilePicture">Profile Picture</label>
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