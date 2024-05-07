import { NextResponse } from "next/server";
import { db } from "../../lib/db";
import {hash} from 'bcrypt'

export async function POST (req:Request) {
    const {email,username,password} = await req.json();

    const hashPassword = await hash(password,10)

    const result = await db.user.create({
        data: {
            username,
            email,
            password:hashPassword
        }
    })
    return NextResponse.json(result)
}