import '@/styles/globals.css'
import {SessionProvider} from "next-auth/react"
import { Mulish } from 'next/font/google'
import Footer from '@/components/util/Footer';
import { useRouter } from 'next/router';

const mulish = Mulish({
  subsets:["latin"],
  variable: "--font-mulish",
});

export default function App({ Component, pageProps: {session,...pageProps}, 
}) {
  const router = useRouter();
  const showFooter = router.pathname !== "/";
  return (
    <SessionProvider session={session}>
    <div className='flex flex-col min-h-screen'>
      <main className={`${mulish.variable} font-sans`}>
        <Component {...pageProps} />
      </main>   
       {showFooter && <Footer />}
      </div>
    </SessionProvider>
  )
}
