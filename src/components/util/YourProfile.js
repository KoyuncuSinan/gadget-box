import { useEffect, useState } from "react"
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Link from "next/link";

export default function YourProfile(){
    const [userId, setUserId] = useState(null);
    
    useEffect(() => {
        
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/user/getYourProfile`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if (!res.ok) {
                    console.log("Error:", res.status);
                    return;
                }
                const data = await res.json();
                console.log(data);
                setUserId(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, [userId])
    console.log(userId)
    const profileLink = userId ? `/user/${userId}` : "#"; // Set the correct link based on userId

    return(
        <>
    {userId !== null ? (
      <li className='flex flex-row justify-start w-[90%] mx-auto mb-2'>
        <AccountBoxIcon />
        <Link href={`/user/${userId}`} className='mb-2 ml-3'>YOUR PROFILE</Link>
      </li>
    ) : (
      <span></span>
    )}
  </>
        
    )

}