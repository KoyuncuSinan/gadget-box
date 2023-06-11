import React,{useState,useEffect} from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import { useMediaQuery } from "react-responsive";
import Login from "@/pages/auth/login";
import MobileMenu from "./MobileMenu";
import Logo from "../../../public/icon.png"
import Link from "next/link";
import useBetterMediaQuery from "../util/useBetterMediaQuery";


export default function Header(){
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
                {isLoginMenuClicked && <span className="font-bold drop-shadow-2xl"><Login /></span>}
                {isMenuClicked && <MobileMenu /> }
                {isSearchClicked && <MobileSearchbar />}
            </div>
            </>
            }

            {isMobile === false && <>
                <nav className="w-[60%] grid grid-cols-4 mx-auto relative text-white items-center
                ">
                <Link href={"/"} className="w-[3rem] h-[3rem] object-cover col-span-1 flex flex-row items-center">
                    <Image src={Logo} width={500} height ={500} alt="Website's logo" ></Image>
                    <div className="text-xl font-bold">
                    <span className="ml-1">Gadget</span>
                    <span className="ml-1">Box</span>
                    </div>
                </Link>
                <div className="flex flex-row col-span-3 ml-5 justify-end font-normal text-xs text-gray-300
                xl:text-base

                ">
                    <Link href={"/auth/login"} className="mr-2 xl:mr-3 2xl:mr-5">SIGN IN</Link>
                    <Link href={"/auth/register"} className="mr-2 xl:mr-3 2xl:mr-5">CREATE ACCOUNT</Link>
                    <Link href={"/games"} className="mr-2 xl:mr-3 2xl:mr-5">GAMES</Link>
                    <Link href={"/reviews"} className="mr-2 xl:mr-3 2xl:mr-5">REVIEWS</Link>
                    {status === "authenticated" && <Link href={`/user/${userId}`} className="">YOUR PROFILE</Link>}
                    <div>Searchbar</div>
                </div>
                </nav>

            </>}
    
        </header>
    )
}