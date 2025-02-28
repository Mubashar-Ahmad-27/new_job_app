import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET, raw: true });

  console.log("Token in Middleware:", token);

  const isProtectedRoute =
    req.nextUrl.pathname.startsWith("/dashboard") ||
    req.nextUrl.pathname.startsWith("/jobPage");

  // If no token, redirect to login page
  // if (!token && isProtectedRoute) {
  //   console.log("Unauthorized access. Redirecting to login.");
  //   return NextResponse.redirect(new URL("/login", req.url));
  // }

  // Restrict non-admin users from accessing the dashboard
  // if (req.nextUrl.pathname.startsWith("/dashboard") && token?.role == "user") {
  //   console.log("Non-admin trying to access dashboard. Redirecting.");
  //   return NextResponse.redirect(new URL("/", req.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/jobPage"], 
};
