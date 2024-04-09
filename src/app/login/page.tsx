import Show from "@/components/show"

import { User } from '@prisma/client'

export const login = () => {
    let u: User = { id: 1, email: "Harkirat", name: "HArkriat", password: "password" }
    console.log(process.env.DATABASE_URL)
    console.log("Hello")
    console.log(u.email)
    return (
        <div><Show></Show></div>

    )
}
export default login

