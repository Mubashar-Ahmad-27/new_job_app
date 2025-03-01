"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters").max(12, "Password cannot exceed 12 characters"),
});

const LoginPage: React.FC = () => {

  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState<boolean>(false); 

  useEffect(() => {
    if (status === "authenticated") {
      console.log("Redirecting based on role:", session?.user?.role)
  
      if (session?.user?.role === "admin") {
        router.replace("/dashboard")
      } else {
        router.replace("/jobPage")
      }
    }
  }, [status, session, router])
  

  // useEffect(() => {
  //   console.log("Session data:", session);
  // }, [session]);
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    setLoading(true);
    const signInData = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false, 
    });
  
    if (signInData?.error) {
      alert("Authentication failed: " + signInData.error);
    } else {
      
      const sessionResponse = await fetch("/api/auth/session");
      const sessionData = await sessionResponse.json();
  
      if (sessionData?.user?.role === "admin") {
        router.replace("/dashboard")
      } else {
        router.replace("/jobPage")
      }
    }
  
    setLoading(false);
  };
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-cyan-700">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-96">
        <h1 className="text-center font-medium text-2xl text-white">LOGIN</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
          <div>
            <input type="email" placeholder="Enter Email" {...register("email")}
     className="w-full p-3 text-white bg-gray-700 border border-gray-600 rounded focus:ring-2 focus:ring-teal-400 outline-none"/>
       {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <input type="password" placeholder="Enter Password" {...register("password")}
      className="w-full p-3 text-white bg-gray-700 border border-gray-600 rounded focus:ring-2 focus:ring-teal-400 outline-none"/>
     {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>
          <button type="submit" 
       className="w-full p-3 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded transition disabled:bg-gray-500" disabled={loading} >
            {loading ? "Logging in..." : "Login"} 
          </button>
        </form>
        
        <p className="text-gray-400 text-sm text-center mt-3"> Don&apos;t have an account?
     <Link href="/signup" className="text-teal-400 text-base hover:underline"> Sign up </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
