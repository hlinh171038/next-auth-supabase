import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import {PrismaAdapter} from '@next-auth/prisma-adapter'
import { db } from "./db";
import {compare} from 'bcrypt'

export const authOptions:NextAuthOptions = {
    // redirect to signIn page
  pages: {
    signIn: '/signIn'
  },
  session: {
    strategy: 'jwt'
  },
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    
    CredentialsProvider({
     
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
    
        // CHECK EMPTY CREDENTIAL
        if(!credentials?.email || !credentials?.password) {
            return null;
        }
    
        //check password, check email
        const existingUser = await db.user.findUnique({
            where: {email:credentials?.email}
        })

        if(!existingUser) {
            return null
        }
       
        const matchPassword = await compare(credentials?.password, existingUser?.password as string)
     
        if(!matchPassword) {
            return null
        }
     
        // finally
        return {
            id: `${existingUser?.id}`,
            email: existingUser?.email,
            username: existingUser?.username as string
        }
    }
    })
  ],
  
  callbacks:{
    async jwt({ token, user}) {
        if(user) {
            return  {
                ...token,
                username: user.username
            }
        }
        return token
      },
      async session({ session, user, token }) {
        return {
            ...session,
            user: {
                ...session.user,
                username: token.username
            }
        }
      },
  }
     
}
