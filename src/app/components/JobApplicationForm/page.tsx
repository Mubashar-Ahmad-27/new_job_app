'use client'
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";

interface JobApplicationFormProps {
  jobTitle: string;
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  coverLetter: string;
  resume: FileList;
}

const JobApplicationForm: React.FC<JobApplicationFormProps> = ({ jobTitle, onClose }) => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [fileName, setFileName] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onSubmit = async (data: FormData) => {
    console.log("Resume Data:", selectedFile);

    if (!selectedFile) {
      alert("Please select a resume file before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("coverLetter", data.coverLetter);
    formData.append("resume", selectedFile); 

    console.log("Submitting FormData:", Array.from(formData.entries()));

    try {
      const response = await axios.post("/api/apply", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201) {
        alert("Application submitted successfully!");
        resetForm(); 
      } else {
        alert(`Error: ${response.data.error}`);
      }
    } catch (error: any) {
      console.error("Application submission error:", error.response?.data || error.message);
      alert(error.response?.data?.error || "Something went wrong. Please try again.");
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
    } else {
      setSelectedFile(null);
      setFileName(null);
    }
  };

  const resetForm = () => {
    reset();
    setSelectedFile(null);
    setFileName(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
    <div className="bg-teal-600 p-8 rounded-lg shadow-2xl w-[90%] max-w-lg">
      <h2 className="text-3xl font-bold text-center mb-6 text-indigo-800">
        Apply for {jobTitle}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <input type="text"  placeholder="Your Name" {...register("name", { required: true })}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"/>
       
        <input  type="email" placeholder="Your Email" {...register("email", { required: true })}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"/>
        <textarea {...register("coverLetter", { required: true })}
          placeholder="Cover Letter" className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"/>
        
        <div>
          <input type="file" accept=".pdf,.doc,.docx" className="hidden" id="resume-upload"
            onChange={handleFileChange}/>
          <label
            htmlFor="resume-upload" className="cursor-pointer bg-gray-200 px-4 py-2 rounded-lg text-center hover:bg-gray-300 transition block">
            {fileName ? `File: ${fileName}` : "Upload Resume"}
          </label>
        </div>
  
        <div className="flex justify-between">
          <button type="submit" className="bg-indigo-600 px-6 py-3 text-white rounded-lg hover:bg-indigo-700 transition">
            Submit
          </button>
          <button type="button" onClick={resetForm} className=" bg-red-600 rounded-md p-2 text-white font-semibold ">
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
  
  );
};

export default JobApplicationForm;
