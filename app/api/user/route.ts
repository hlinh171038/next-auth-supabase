import { NextResponse } from "next/server";
import { db } from "../../lib/db";

export async function POST (req:Request) {
    const {email,username,password} = await req.json();

    const result = await db.user.create({
        data: {
            username,
            email,
            password
        }
    })
    return NextResponse.json(result)
}