'use client'
import React, { useState } from "react";

interface Job {
  id: number;
  title: string;
  description: string;
  salary: string;
  city: string;
}

interface Props {
  job: Job;
  onEdit: (updatedJob: Job) => void;
  onClose: () => void;
}

const EditJobForm: React.FC<Props> = ({ job, onEdit, onClose }) => {
  const [updatedJob, setUpdatedJob] = useState<Job>(job);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEdit(updatedJob);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Edit Job</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Title" className="w-full p-2 mb-3 border rounded" value={updatedJob.title} onChange={(e) => setUpdatedJob({ ...updatedJob, title: e.target.value })} />
          <input type="text" placeholder="Description" className="w-full p-2 mb-3 border rounded" value={updatedJob.description} onChange={(e) => setUpdatedJob({ ...updatedJob, description: e.target.value })} />
          <input type="text" placeholder="Salary" className="w-full p-2 mb-3 border rounded" value={updatedJob.salary} onChange={(e) => setUpdatedJob({ ...updatedJob, salary: e.target.value })} />
          <input type="text" placeholder="City" className="w-full p-2 mb-3 border rounded" value={updatedJob.city} onChange={(e) => setUpdatedJob({ ...updatedJob, city: e.target.value })} />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Update</button>
          <button type="button" onClick={onClose} className="ml-3 text-gray-700">Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default EditJobForm;
