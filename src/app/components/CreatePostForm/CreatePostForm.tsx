"use client";
import { useState } from "react";

interface Job {
  title: string;
  description: string;
  salary: string;
  city: string;
}

interface Props {
  onCreate: (job: Job) => void;
  onClose: () => void;
}

const CreatePostForm: React.FC<Props> = ({ onCreate, onClose }) => {
  const [job, setJob] = useState<Job>({ title: "", description: "", salary: "", city: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!job.title || !job.description || !job.salary || !job.city) {
      alert("All fields are required!");
      return;
    }

    onCreate(job);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-teal-600 p-8 rounded-lg shadow-2xl w-1/2">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Create Job</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={job.title}
            onChange={(e) => setJob({ ...job, title: e.target.value })}
            className="w-full p-3 bg-white text-gray-800 border border-teal-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
          />

          <input
            type="text"
            placeholder="Description"
            value={job.description}
            onChange={(e) => setJob({ ...job, description: e.target.value })}
            className="w-full p-3 bg-white text-gray-800 border border-teal-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
          />

          <input
            type="text"
            placeholder="Salary"
            value={job.salary}
            onChange={(e) => setJob({ ...job, salary: e.target.value })}
            className="w-full p-3 bg-white text-gray-800 border border-teal-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
          />

          <input
            type="text"
            placeholder="City"
            value={job.city}
            onChange={(e) => setJob({ ...job, city: e.target.value })}
            className="w-full p-3 bg-white text-gray-800 border border-teal-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
          />

          <div className="flex justify-between mt-6">
            <button type="submit" className="bg-white text-teal-600 px-6 py-3 font-medium rounded-lg hover:bg-teal-100 transition">
              Create
            </button>
            <button type="button" onClick={onClose} className="text-white font-semibold bg-red-600 p-2 rounded">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostForm;
