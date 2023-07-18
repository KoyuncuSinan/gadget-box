import React,{useState,useEffect} from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LoginIcon from '@mui/icons-material/Login';
import SearchIcon from '@mui/icons-material/Search';
import NavLogin from "../auth/NavLogin";
import MobileMenu from "./MobileMenu";
import Logo from "../../../public/icon.png"
import Link from "next/link";
import useBetterMediaQuery from "../util/useBetterMediaQuery";
import Searchbar from "../util/Searchbar";
import YourProfile from "../util/YourProfile";
import {signOut} from "next-auth/react"



export default function Header(){
    const [isMounted, setIsMounted] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMenuClicked , setIsMenuClicked] = useState(false);
    const [isLoginMenuClicked, setIsLoginMenuClicked] = useState(false);
    const [isSearchClicked, setIsSearchClicked] = useState(false);

    const handleClick = (e) => {
        setIsMenuClicked(false);
        setIsLoginMenuClicked(false);
        setIsSearchClicked(false);
    
        switch (e.target.id) {
            case "menu":
                setIsMenuClicked(true);
                break;
            case "login":
                setIsLoginMenuClicked(true);
                break;
            case "search":
                setIsSearchClicked(true);
                break;
            default:
                break;
        }
    };


    const {data: session, status} = useSession()

    const isMobile = useBetterMediaQuery('(max-width: 899px)');

    
    useEffect(() => {
        if(status === "authenticated"){
            setIsLoggedIn(true);
        }
    },[status])

    return(
        <header className="">
            {isMobile && 
            <>
            <nav className="flex flex-box justify-end items-center bg-stone-950 h-[3rem] text-gray-400 relative">
            <Link href={"/"} className="absolute left-3 w-[3rem] h-[3rem] object-cover">
                <Image src={Logo} width={500} height ={500} alt="Website's logo" className="object-cover" ></Image>
            </Link>
                {isLoginMenuClicked ? <CloseIcon onClick= {() => setIsLoginMenuClicked(false)} className="mr-2" /> : <LoginIcon id="login" onClick={handleClick} className="mr-2"/>}
                {isMenuClicked ? <CloseIcon onClick= {() => setIsMenuClicked(false)} className="mr-2"/> : <MenuIcon id="menu" onClick={handleClick} className="mr-2"/>}
                {isSearchClicked ? <CloseIcon onClick= {() => setIsSearchClicked(false)} className="mr-2"/> : <SearchIcon id="search" onClick={handleClick} className="mr-2"/>}
            </nav>
            <div>
                {isLoginMenuClicked && <span className="font-bold drop-shadow-2xl"><NavLogin /></span>}
                {isMenuClicked && <MobileMenu /> }
                {isSearchClicked && <Searchbar />}
            </div>
            </>
            }

            {isMobile === false &&<>
                <nav className="w-[80%] lg:w-[70%] 2xl:w-[70%] grid grid-cols-3 mx-auto relative text-white items-center
                ">
                <Link href={"/"} className="w-[3rem] h-[3rem] object-cover col-span-1 flex flex-row items-center">
                    <Image src={Logo} width={500} height ={500} alt="Website's logo" ></Image>
                    <div className="text-base font-bold">
                    <span className="ml-1">Gadget</span>
                    <span className="ml-1">Box</span>
                    </div>
                </Link>
                <ul className="flex flex-row col-span-2 ml-5 font-normal text-xs text-gray-300
                xl:text-sm
                items-center
                justify-end
                ">
                    {status === "authenticated" ? 
                    <li className="mr-[6px] xl:mr-3 2xl:mr-5 hover:text-white"><button onClick={() => signOut()} >SIGN OUT</button></li>
                    :
                    <li className="mr-[6px] xl:mr-3 2xl:mr-5 hover:text-white"><Link href={"/auth/login"} >SIGN IN</Link></li>
                    }
                    <li className="mr-[6px] xl:mr-3 2xl:mr-5 hover:text-white"><Link href={"/auth/register"}>CREATE ACCOUNT</Link></li>
                    <li className="mr-[6px] xl:mr-3 2xl:mr-5 hover:text-white"><Link href={"/games"}>GAMES</Link></li>
                    <li className="mr-[6px] xl:mr-3 2xl:mr-5 hover:text-white"><Link href={"/reviews"}>REVIEWS</Link></li>
                    {status === "authenticated" && <span className="mr-[6px] xl:mr-3 2xl:mr-5 hover:text-white"><YourProfile /></span>}
                    {status === "unauthenticated" && <Link className="mr-[6px] xl:mr-3 2xl:mr-5 hover:text-white" href={"/auth/login"}>YOUR PROFILE</Link>}
                    <div className=" w-[20%] "><Searchbar /></div>
                </ul>
                </nav>

            </>}
    
        </header>
    )
}