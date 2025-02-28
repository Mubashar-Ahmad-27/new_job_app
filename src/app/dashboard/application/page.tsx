"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Application {
  id: string;
  name: string;
  email: string;
  coverLetter: string;
  resumeUrl: string;
  createdAt: string;
}

const ApplicationsPage: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/apply")
        console.log("Applications Data:", response.data)
        setApplications(response.data.applications)
      } catch (error) {
        console.error("Error fetching applications:", error.response?.data || error)
        alert("Failed to fetch applications. Check the console for details.")
      }
    }

    fetchApplications()
  }, [])

  const deleteApplication = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this application?")) return

    try {
      await axios.delete("http://localhost:3000/api/apply", { data: { id } })
      setApplications(applications.filter((app) => app.id !== id))
      alert("Application deleted successfully")
    } catch (error) {
      console.error("Error deleting application:", error.response?.data || error)
      alert("Failed to delete application.")
    }
  }

  return (
    <div className="bg-teal-700 min-h-screen p-6">
    
      <div className="w-full bg-white p-6 shadow-lg flex justify-between items-center rounded-lg">
        <h1 className="font-bold text-2xl">Job Applications</h1>
        <button className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md   hover:bg-red-600        transition" onClick={() => router.push("/dashboard")}>
          Back to Dashboard
        </button>
      </div>

      
      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
        {applications.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((app) => (
              <div key={app.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200">
                <div className="flex flex-col gap-3">
                  <p className="text-lg text-gray-800">
                    <span className="font-bold">Name:</span> {app.name}
                  </p>
                  <p className="text-lg text-gray-800">
                    <span className="font-bold">Email:</span> {app.email}
                  </p>
                  <p className="text-lg text-gray-800">
                    <span className="font-bold">Cover Letter:</span> {app.coverLetter}
                  </p>
                  <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer"          className="text-indigo-600 font-semibold hover:underline">
                    View Resume
                  </a>
                  <p className="text-sm text-gray-500">
                    Applied on: {new Date(app.createdAt).toLocaleString()}
                  </p>
                </div>

                <button onClick={() => deleteApplication(app.id)} className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300 w-full">
                  Delete
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No applications found.</p>
        )}
      </div>
    </div>
  );
};

export default ApplicationsPage;
