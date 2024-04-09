'use client'
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

const page = () => {
    const router = useRouter()
    return (

        <div>

            <label>
                Email:
                <input id="email" type="email" required />
            </label>
            <br />
            <label>
                Password:
                <input id="password" type="password" required />
            </label>
            <br />
            <button onClick={async () => {
                const signInData = await signIn('credentials', {
                    email: "harkiratsingh.tu@gmail.com",
                    password: "password",
                    redirect: false
                })
                console.log("Hello All")
                console.log(signInData)
                router.push('/home')

            }}>Sign In</button>


        </div>
    )
}

export default page
