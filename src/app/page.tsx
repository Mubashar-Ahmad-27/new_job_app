
import * as React from "react";
import Link from "next/link";

export default function Home() {

  const jobData = [
    {
      title: "Frontend Developer",
      company: "Tech Innovators",
      description: "Build modern web applications using React and Next.js.",
    },
    {
      title: "UI/UX Designer",
      company: "Creative Minds",
      description: "Design user-friendly interfaces with Figma & Tailwind CSS.",
    },
    {
      title: "Full Stack Developer",
      company: "Code Masters",
      description: "Work on both frontend and backend using MERN stack.",
    },
    {
      title: "Full Stack Developer",
      company: "Code Masters",
      description: "Work on both frontend and backend using MERN stack.",
    },
    {
      title: "UI/UX Designer",
      company: "Creative Minds",
      description: "Design user-friendly interfaces with Figma & Tailwind CSS.",
    },
    {
      title: "Frontend Developer",
      company: "Tech Innovators",
      description: "Build modern web applications using React and Next.js.",
    },
  ]

  return (
       <>
           <div className='header-image flex flex-col justify-center items-center text-white'>
                  <h1 className='font-bold text-4xl '>WELCOME TO OUR WEB</h1>
             </div>

            <div className="mt-10 mb-10 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-5 max-w-7xl mx-auto">
                {jobData.map((job, index) => (
                  <div key={index} className="bg-teal-600 text-white p-6 rounded-2xl shadow-2xl transition-transform duration-300 hover:scale-105">
                    <h2 className="text-2xl font-semibold mb-2">{job.title}</h2>
                    <p className="mb-1 italic">{job.company}</p>
                    <p className="mb-5">{job.description}</p>
                    <Link  href="/login" className="inline-block bg-white text-blue-500 font-bold px-4 py-2 rounded-lg hover:bg-gray-200 transition">
                      Explore Now
                    </Link>
                  </div>
                ))}
           </div>
   </>
  );
};
