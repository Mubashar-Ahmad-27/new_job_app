"use client";
import { useState } from "react";
import Header from "@/app/components/Header/Page";
import JobApplicationForm from "../JobApplicationForm/page";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaArrowRight, FaDollarSign, FaCity } from "react-icons/fa";

interface Job {
  id: number;
  title: string;
  description: string;
  salary: number;
  city: string;
}

const fetchJobs = async (): Promise<Job[]> => {
  const { data } = await axios.get("/api/jobs");
  return data;
};

const GetData: React.FC = () => {
  const { data: jobs, isLoading, isError, error } = useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
  });

  const [selectedJob, setSelectedJob] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState({ title: "", city: "" })

  const filteredJobs = jobs?.filter(
    (job) =>
      job.title.toLowerCase().includes(searchQuery.title.toLowerCase()) &&
      job.city.toLowerCase().includes(searchQuery.city.toLowerCase())
  );

  if (isLoading)
    return <p className="text-center font-bold mt-2 text-3xl">Loading...</p>
  if (isError)
    return <p className="text-center text-red-500">Error: {error.message}</p>

  return (
    <div>
      <Header onSearch={setSearchQuery} />

      <h2 className="font-bold text-black text-5xl text-center mt-6">
        JOB LISTING
      </h2>

      {filteredJobs?.length === 0 && (searchQuery.title || searchQuery.city) !== "" && alert("No jobs found")}

      <div className="mt-10 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {filteredJobs?.map((job) => (
          <div key={job.id} className="bg-teal-600 text-white p-6 border border-teal-700 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105">
            <h3 className="text-2xl font-semibold mb-3 text-center">
              {job.title}
            </h3>

            <div className="flex items-center justify-center gap-2 my-2">
              <FaDollarSign className="text-xl" />
              <p className="text-lg font-semibold">
                Salary: <span>${job.salary}</span>
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 my-2">
              <FaCity className="text-xl" />
              <p className="text-lg font-semibold">
                City: <span>{job.city}</span>
              </p>
            </div>

            <div className="flex justify-center mt-4">
              <button onClick={() => setSelectedJob(job.title)} className="w-64 flex items-center justify-center bg-white text-indigo-600 font-bold py-3 rounded-lg hover:bg-gray-200 transition-all duration-300 shadow-md">
                Apply Now <FaArrowRight className="ml-2" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedJob && (
        <JobApplicationForm
          jobTitle={selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </div>
  );
};

export default GetData;
