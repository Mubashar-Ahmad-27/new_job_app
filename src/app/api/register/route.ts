import { db } from "@/libs/prismadb";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body; 

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const existingEmail = await db.user.findUnique({
      where: { email },
    });

    if (existingEmail) {
      return NextResponse.json(
        { message: "User already exists with this email" },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 10);
    
    const isAdmin = email === "iamadmin123@gmail.com"; 

    const newUser = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: isAdmin ? "admin" : "user", 
      },
    });

    return NextResponse.json(
      { user: newUser, message: "User Created Successfully" },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error creating user:", error);
    
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
