"use client"
import PersonIcon from '@mui/icons-material/Person'
import GamesIcon from '@mui/icons-material/Games';
import ReviewsIcon from '@mui/icons-material/Reviews';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useSession } from 'next-auth/react';
import { useState,useEffect } from 'react';
export default function MobileMenu(){
    
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const {data: session, status} = useSession()
    useEffect(() => {
        if(status === "authenticated"){
            setIsLoggedIn(true);
        }
    },[status])
    
    return(
        <ul className='bg-stone-900 text-gray-400 font-bold drop-shadow-2xl'>
            <li className='flex flex-row justify-start w-[90%] mx-auto mb-2'>
                <PersonIcon />
                <span className='ml-3'>CREATE ACCOUNT</span>
            </li>
            <hr className='w-[90%] mx-auto mb-2'></hr>
            <li className='flex flex-row justify-start w-[90%] mx-auto mb-2'>
                <GamesIcon />
                <span className='ml-3'>GAMES</span>
            </li>
            <hr className='w-[90%] mx-auto mb-2 '></hr>
            <li className='flex flex-row justify-start w-[90%] mx-auto mb-2'>
                <ReviewsIcon />
                <span className='ml-3'>REVIEWS</span>
            </li>
            {isLoggedIn && 
            <>
            <hr className='w-[90%] mx-auto mb-2'></hr>
            <li className='flex flex-row justify-start w-[90%] mx-auto mb-2'>
                <AccountBoxIcon />
                <span className='mb-2 ml-3'>YOUR PROFILE</span>
            </li>

            </>
            }
        </ul>

    )
}