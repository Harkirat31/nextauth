import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";


const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma =
    globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma


export async function GET(request: NextRequest) {
    try {
        let result = await prisma.user.create({
            data: {
                email: "harkiratsingh.tu6@gmail.com",
                name: "Harkirat Singh",
                password: "password"
            }
        })

        console.log(result)
    }
    catch (error) {
        console.log(error)
    }


    return NextResponse.json({ message: "Hello world" }, { status: 200 })
}