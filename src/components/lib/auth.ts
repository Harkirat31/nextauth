import { prisma } from "@/app/api/users/route";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { randomBytes, randomUUID } from "crypto";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { JWT } from "next-auth/jwt";

export const authOption: NextAuthOptions = {
    pages: {
        signIn: '/api/auth/login'
    },
    adapter: PrismaAdapter(prisma),

    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",

        maxAge: 10, // 30 days


        // Seconds - Throttle how frequently to write to database to extend a session.
        // Use it to limit write operations. Set to 0 to always update the database.
        // Note: This option is ignored if using JSON Web Tokens
        updateAge: 24 * 60 * 60, // 24 hours

        // The session token is usually either a random UUID or string, however if you
        // need a more customized session token string, you can define your own generate function.
        generateSessionToken: () => {
            return randomUUID?.() ?? randomBytes(32).toString("hex")
        }
    },
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "email", type: "text", placeholder: "jsmith" },
                password: { label: "password", type: "password" }
            },
            async authorize(credentials, req) {
                console.log("Hello")
                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                // You can also use the `req` object to obtain additional parameters
                // (i.e., the request IP address)
                // const res = await fetch("/your/endpoint", {
                //     method: 'POST',
                //     body: JSON.stringify(credentials),
                //     headers: { "Content-Type": "application/json" }
                // })
                // const user = await res.json()

                // // If no error and we have user data, return it
                // if (res.ok && user) {
                //     return user
                // }
                // Return null if user data could not be retrieved
                return { id: "id123", name: "HArkirat", username: "harkriat" }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user, account, trigger }) {
            console.log(token)
            //console.log(new Date(token.exp as number))
            if (user) {
                return { ...token, x: user.id, }
            }

            return { ...token, id: "Hello", }
        },
        async session({ session, user, token }) {
            console.log("in session")
            return { ...session, user: { ...session.user, c: token.id } }
        },
    }
}
