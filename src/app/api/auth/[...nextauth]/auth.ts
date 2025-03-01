import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/libs/prismadb";
import { compare } from "bcryptjs";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
        error: "/login",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Enter Email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                console.log("Credential Received: ", credentials);

                if (!credentials?.email || !credentials?.password) {
                    console.log("Missing Email or Password");
                    throw new Error("Missing Email or Password");
                }

                const existingUser = await db.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!existingUser) {
                    console.log("User not found");
                    throw new Error("User Not Found");
                }

                const passwordMatch = await compare(credentials.password, existingUser.password);

                if (!passwordMatch) {
                    console.log("Password Not Matched");
                    throw new Error("Password Not Matched");
                }

                console.log("Successfully Logged In:", existingUser.email);

                return {
                    id: `${existingUser.id}`,
                    email: existingUser.email,
                    role: existingUser.role || "user",
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role; 
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.role = token.role as string; 
            }
            return session;
        },
    
        async redirect({ url, baseUrl }) {
            if (url === "/login") return baseUrl; 

            return url.startsWith(baseUrl) ? url : baseUrl;
        },
    },
};
