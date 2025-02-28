"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";

const signUpSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid Email"),
  password: z.string().min(6, "Password must be at least 6 characters").max(12, "Password cannot exceed 12 characters"),
});

const SignUpPage: React.FC = () => {

  const router = useRouter()
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: any) => {
    setLoading(true);
    setErrorMessage(null);
    console.log("Sign Up Data:", data);

    try {
      const response = await axios.post("/api/register", data, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Registered Successfully!");
      reset();
      router.push('/login')


    } catch (error: any) {
      console.error("Signup Error:", error);
      
      if (error.response) {
        setErrorMessage(error.response.data.message || "Signup failed");
      } else {
        setErrorMessage("Something went wrong, please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-cyan-600">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-96">
        <h1 className="text-center font-medium text-2xl text-white">Sign Up</h1>

        {errorMessage && <p className="text-red-500 text-center mt-2">{errorMessage}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
          <div>
            <input type="text" placeholder="Enter Name" {...register("name")}
      className="w-full p-2 text-white bg-gray-700 border border-gray-600 rounded outline-none focus:ring-2 focus:ring-teal-400"/>
           {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <input type="email" placeholder="Enter Email" {...register("email")}
         className="w-full p-2 text-white bg-gray-700 border border-gray-600 rounded outline-none focus:ring-2 focus:ring-teal-400"/>
      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <input type="password" placeholder="Enter Password" {...register("password")}
         className="w-full p-2 bg-gray-700 border border-gray-600 rounded outline-none focus:ring-2 focus:ring-teal-400"/>
     {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <button type="submit" disabled={loading}
   className="w-full p-2 mt-4 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded transition">
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-gray-400 text-sm text-center mt-3">
          Already have an account?
          <Link href="/login" className="text-teal-400 text-base hover:underline"> Login </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
