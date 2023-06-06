import '@/styles/globals.css'
import {SessionProvider} from "next-auth/react"
import { Mulish } from 'next/font/google'

const mulish = Mulish({
  subsets:["latin"],
  variable: "--font-mulish",
});

export default function App({ Component, pageProps: {session,...pageProps}, 
}) {
  return (
    <SessionProvider session={session}>
    <main className={`${mulish.variable} font-sans`}>
      <Component {...pageProps} />

    </main>
    </SessionProvider>
  )
}
