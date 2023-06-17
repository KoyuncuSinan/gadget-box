import { useEffect, useState } from "react"
import { useSession } from 'next-auth/react';
import useBetterMediaQuery from "./useBetterMediaQuery";

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Link from "next/link";

    export default function YourProfile(){

        const { data: session, status } = useSession();
        const [userId, setUserId] = useState(null);
      
        const isMobile = useBetterMediaQuery("(max-width: 899px)");


        useEffect(() => {
          const fetchUserId = async () => {
            try {
              const res = await fetch('/api/user/yourProfile', {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              });
              const data = await res.json();
              setUserId(data.userId);
            } catch (err) {
              console.error(err);
            }
          };
      
          if (status === 'authenticated' && session) {
            fetchUserId();
          }
        }, [session, status]);
      
        if (status === 'loading') {
          return <span>Loading...</span>;
        }
      
        if (status === 'authenticated' && userId) {
          return (
            <>
            {isMobile ?
            <li className='flex flex-row justify-start w-[90%] mx-auto mb-2'>
            <AccountBoxIcon />
            <Link href={`/user/${userId}`} className='mb-2 ml-3'>
              YOUR PROFILE
            </Link>
          </li> 
          :
          <li className="list-none">
            <Link href={`/user/${userId}`}>
              YOUR PROFILE
            </Link>
          </li> 
          }

            </>
          );
        }
      
        return null;
      }