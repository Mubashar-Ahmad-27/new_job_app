import { db } from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        const user = await db.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json({ message: "Invalid Credentials" }, { status: 401 });
        }

        const isPasswordMatch = await compare(password, user.password);

        if (!isPasswordMatch) {
            return NextResponse.json({ message: "Invalid Credentials" }, { status: 401 });
        }

        const token = sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET!,
            { expiresIn: "1h" }
        );

        const cookie = serialize("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
        });

        const response = new Response(JSON.stringify({ role: user.role, message: "Login successful" }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Set-Cookie": cookie,
            },
        });

        return response;
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
