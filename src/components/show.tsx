'use client'

import { useEffect, useState } from "react"

const Show = () => {
    useEffect(() => {
        setTimeout(() => {
            setX("y")
        }, 2000)
    }, [])
    const [x, setX] = useState("x")
    console.log(x)

    return <>
        <p>{x}</p>
    </>
}

export default Show