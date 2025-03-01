import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET, raw: true });

  console.log("Token in Middleware:", token)

  const isProtectedRoute =
    req.nextUrl.pathname.startsWith("/dashboard") ||
    req.nextUrl.pathname.startsWith("/jobPage");

  if (!token && isProtectedRoute) {
    console.log("Unauthorized access. Redirecting to login.");
    return NextResponse.redirect(new URL("/login", req.url));
  }


  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/jobPage"],
};

