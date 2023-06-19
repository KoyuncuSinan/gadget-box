import React,{useState, useEffect} from "react";
import Link from 'next/link';
import Image from 'next/image'
import Head from "next/head";
import background from "../../public/red-dead-redemption-2.jpg"
import logo from "../../public/icon.png"
import useBetterMediaQuery from '@/components/util/useBetterMediaQuery';
import Header from '@/components/navbar/Header';
import Footer from '@/components/util/Footer';
import MaybeInterestedIn from '@/components/homepage/MaybeInterestedIn';
import JustReviewed from "@/components/homepage/JustReviewed";

export const getServerSideProps = async () => {
  try{
    const res = await fetch("http://localhost:3000/api/games/filteredgames",{
      method: "GET",
      headers:{
        "Content-Type": "application/json"
      }
    });
    const data = await res.json();
    return{
      props:{
        data
      },
    };
  }catch(err){
    console.error(err);
    return {
      props: {
        data: null,
        errorMessage: "An error occurred while retrieving data."
      },
    };
  }
}


export default function Index({data, errorMessage}){

    const [isThereError, setIsThereError] = useState(!data); 

    const isMobile = useBetterMediaQuery('(max-width: 899px)');

    useEffect(() => {
      setIsThereError(!data);
    },[data])

    return (
        <div className='flex flex-col min-h-screen'>
        <Header />
        {isThereError ? <span>{errorMessage}</span> : isMobile ?
        (
          /* Mobile Display */
          <main className="mx-auto umd:w-[50%]">
              <>
              <section key="mobile-section">
                <div className="image-container">
                  <div className="fade-out-image">
                  
                    <Image src={background} width={800} height={800} sizes="(max-width: 899px) 100vw"  priority alt="Red Dead Redemption 2 Background" className="object-cover h-auto w-full"/>

                  </div>
                <div className="flex flex-row justify-center items-center text-white font-extrabold absolute left-0 right-0 bottom-2 mx-auto">
                  <Image src={logo} width={200} height={200} alt="Gadget Box logo" className="w-[4rem] mr-2" />
                  <h1 className="text-3xl">Gadget Box</h1>
                </div>
                </div>
                <h2 className="w-[80%] mx-auto font-normal text-white text-xl text-center mt-4">
                  {`Track games you've played.`}
                  <br />
                  Save those you want to try.
                  <br />
                  {`Tell your followers what's good.`}
                </h2>
                <div className='w-full text-center'>
                <Link href={"/auth/register"}>
                <button className='px-3 py-1 bg-orange-800 mt-8 mx-auto text-white rounded-sm w-[65%]'> {`GET STARTED - IT'S FREE`}</button>
                </Link>
                </div>
                <h3 className='text-center mt-5 text-gray-500 font-light'>The social network for gamers.</h3>
              </section>
              <section className='w-[90%] mx-auto text-gray-400 mt-5'>
              <MaybeInterestedIn games={data.random6Games} />
            </section>
            <section className='w-[90%] mx-auto text-gray-400 mt-5'>
              <JustReviewed games={data.recentlyReviewed10Games} />
            </section>
              </>
             </main>
             )
            : 
            /* Desktop Display */
            (
            <main className="mx-auto flex-grow">
                <div className="image-container">
                  <div className="fade-out-image">
                    <Image src={background} width={1920} height={1080} priority alt="Red Dead Redemption 2 Background" className='object-cover h-auto w-[80%] xl:w-[65%] mx-auto z-0'/>
                  </div>
                </div>
              <section key="desktop-section" className='umd:w-[60%] mx-auto absolute top-[30rem] right-0 bottom-0 left-0'>
                <h2 className="mx-auto text-white text-2xl text-center leading-9
                xl:text-3xl font-light">
                   {`Track games you've played.`}
                  <br />
                  Save those you want to try.
                  <br />
                  {`Tell your followers what's good.`}
                </h2>
                <div className='w-full text-center'>
                <Link href={"/auth/register"}>
                <button className='px-3 py-1 bg-orange-800 mt-8 mx-auto text-white rounded-sm w-[65%] hover:brightness-125'> {`GET STARTED - IT'S FREE`}</button>

                </Link>
                </div>
                <h3 className='text-center mt-5 text-gray-500 font-light'>The social network for gamers.</h3>
              <section className='w-full mx-auto text-gray-400 mt-5'>
              <MaybeInterestedIn games={data.random6Games} />
            </section>
            <section className='w-full mx-auto text-gray-400 mt-5 mb-5'>
              <JustReviewed games={data.recentlyReviewed10Games} />
            </section>
            </section> 
            </main>
            )
          }
        </div>
      );
    
}

