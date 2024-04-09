'use client'
import { authOption } from "@/components/lib/auth"
import { getServerSession } from "next-auth"
import { getToken } from "next-auth/jwt"
import { SessionProvider, getSession } from "next-auth/react"
import { Test } from "./test"



const page = async () => {
    //server side session
    //const session = await getServerSession(authOption)

    //client side session
    const session = await getSession()
    // console.log(session)
    return (
        <SessionProvider refetchOnWindowFocus={true}    ><Test></Test></SessionProvider>
    )
}

export default page


