import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { connectDB} from "../lib/db";
import User from "@/models/User";
import bcrypt from "bcrypt";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NextAuth_SECRET,
  providers: [
    CredentialsProvider({
      async authorize(credentials,req){
        connectDB();
        const {email, password} = credentials;
        console.log(email, password)

        const user = await User.findOne({email})
        if(!user){
          throw new Error("Invalid Email or Password")
        };

        const isPasswordMatched = await bcrypt.compare(password, user.password)
        if(!isPasswordMatched){
          throw new Error("Invalid Email or Password")
        };
        return user;
      }
    })
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      return session;
    },
  },
};

export default NextAuth(authOptions);
