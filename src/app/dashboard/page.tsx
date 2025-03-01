"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CreatePostForm from "../components/CreatePostForm/CreatePostForm";
import JobTable from "../components/JobTable/JobTable";
import EditJobForm from "../components/EditJobForm/EditJobForm";

interface Job {
  id: number;
  title: string;
  description: string;
  salary: string;
  city: string;
}

const DashboardPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editJob, setEditJob] = useState<Job | null>(null);

  const router = useRouter();

  const fetchJobs = async () => {
    try {
      const response = await fetch('/api/jobs')
      if (!response.ok) {
        throw new Error("Failed to fetch jobs")
      }
      const data = await response.json()
      return Array.isArray(data) ? data : []
    } catch (error) {
      console.error("Error fetching jobs:", error)
      return []
    }
  };
  
  useEffect(() => {
    const loadJobs = async () => {
      const jobsData = await fetchJobs();
      setJobs(jobsData)
    };
  
    loadJobs();
  }, []);
  
  const handleCreateJob = async (job: Omit<Job, "id">) => {
    try {
      const res = await axios.post("/api/jobs", job)
      setJobs([...jobs, res.data])
      setShowForm(false);
    } catch (error) {
      console.error("Error creating job:", error)
    }
  };

  const handleEditJob = async (updatedJob: Job) => {
    try {
      const res = await axios.put(`/api/jobs/${updatedJob.id}`, updatedJob)
      setJobs(jobs.map((job) => (job.id === updatedJob.id ? res.data : job)))
      setEditJob(null)
    } catch (error) {
      console.error("Error updating job:", error)
    }
  }

  const handleDeleteJob = async (id: number) => { 
    try {
      await axios.delete(`/api/jobs/${id}`);
      setJobs(jobs.filter((job) => job.id !== id));
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };
  

  return (
    <div className="bg-teal-800 min-h-screen p-6">
      <div className="relative">
        <div className="w-full bg-white p-6 shadow-lg rounded-md">
          <h1 className="text-center font-bold text-2xl">ADMIN DASHBOARD</h1>
        </div>

        <button className="absolute top-5 right-5 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition" onClick={() => setShowForm(true)}> Create Post
        </button>

        <button className="absolute top-5 left-5 bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition" onClick={() => router.push("/dashboard/application")}        >
          View Applications
        </button>

      {showForm && (<CreatePostForm onCreate={handleCreateJob} onClose={() => setShowForm(false)} />)}
      {editJob && (
  <EditJobForm  job={{ ...editJob, id: Number(editJob.id) }}  onEdit={handleEditJob} onClose={() => setEditJob(null)} />
)}

      </div>

      <div className="mt-16">
        <JobTable jobs={jobs} onDelete={handleDeleteJob} onEdit={setEditJob} />
      </div>
    </div>
  );
};

export default DashboardPage;
