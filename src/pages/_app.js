import '@/styles/globals.css'
import {SessionProvider} from "next-auth/react"
import { Mulish } from 'next/font/google'
import Footer from '@/components/util/Footer';

const mulish = Mulish({
  subsets:["latin"],
  variable: "--font-mulish",
});

export default function App({ Component, pageProps: {session,...pageProps}, 
}) {
  return (
    <SessionProvider session={session}>
    <div className='flex flex-col min-h-screen'>
      <main className={`${mulish.variable} font-sans flex-grow`}>
        <Component {...pageProps} />
      </main>   
        <Footer />
      </div>
    </SessionProvider>
  )
}
