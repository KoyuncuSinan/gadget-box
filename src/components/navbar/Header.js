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

    const isMobile = useMediaQuery({query:"(max-width:899px"})

    
    useEffect(() => {
        if(status === "authenticated"){
            setIsLoggedIn(true);
        }
    },[status])

    return(
        <header className="relative">
            {isMobile && 
            <>
            <nav className="flex flex-box justify-end items-center bg-stone-900 h-[3rem] text-gray-400 relative">
            <Link href={"/"} className="absolute left-3 w-[3rem] h-[3rem] object-cover">
                <Image src={Logo} width={800} height ={200} alt="Website's logo" ></Image>
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
        </header>
    )
}