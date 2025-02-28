import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";

interface Job {
  id: number;
  title: string;
  description: string;
  salary: string;
  city: string;
}

interface JobTableProps {
  jobs: Job[];
  onDelete: (id: number) => void;
  onEdit: (job: Job) => void;
}

const JobTable: React.FC<JobTableProps> = ({ jobs, onDelete, onEdit }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mt-10 mx-6">
      <h2 className="text-xl font-medium mb-4">Job Listings</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 min-w-[600px]">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-3">Title</th>
              <th className="border border-gray-300 p-3">Description</th>
              <th className="border border-gray-300 p-3">Salary</th>
              <th className="border border-gray-300 p-3">City</th>
              <th className="border border-gray-300 p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id} className="hover:bg-gray-50 transition">
                <td className="border border-gray-300 p-2">{job.title}</td>
                <td className="border border-gray-300 p-2">{job.description}</td>
                <td className="border border-gray-300 p-2">{job.salary}</td>
                <td className="border border-gray-300 p-2">{job.city}</td>
                <td className="border border-gray-300 p-2 text-center flex justify-center gap-2">
                  <button onClick={() => onEdit(job)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
                    <MdEdit />
                  </button>
                  <button onClick={() => onDelete(job.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobTable
