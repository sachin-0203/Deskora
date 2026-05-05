import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Dashboard() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔐 Protect route
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  // 📊 Fetch dashboard data
  const fetchDashboard = async () => {
    try {
      const res = await API.get(`/dashboard/${id}`);
      setData(res.data);
    } catch (err) {
      alert("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!data) {
    return <p className="text-center mt-10">No data available</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Project Dashboard</h1>

          <button
            onClick={() => navigate(`/project/${id}`)}
            className="text-blue-500 text-sm hover:underline"
          >
            ← Back to Project
          </button>
        </div>

        {/* 🔢 Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

          <div className="bg-white p-4 rounded shadow text-center">
            <p className="text-sm text-gray-500">Total Tasks</p>
            <h2 className="text-xl font-bold">{data.total_tasks}</h2>
          </div>

          <div className="bg-white p-4 rounded shadow text-center">
            <p className="text-sm text-gray-500">Overdue</p>
            <h2 className="text-xl font-bold text-red-500">
              {data.overdue_tasks}
            </h2>
          </div>

          <div className="bg-white p-4 rounded shadow text-center">
            <p className="text-sm text-gray-500">In Progress</p>
            <h2 className="text-xl font-bold text-yellow-500">
              {data.tasks_by_status?.["In Progress"] || 0}
            </h2>
          </div>

          <div className="bg-white p-4 rounded shadow text-center">
            <p className="text-sm text-gray-500">Completed</p>
            <h2 className="text-xl font-bold text-green-500">
              {data.tasks_by_status?.["Done"] || 0}
            </h2>
          </div>

        </div>

        {/* 📊 Tasks by Status */}
        <div className="bg-white p-4 rounded shadow mb-6">
          <h2 className="font-semibold mb-3">Tasks by Status</h2>

          {Object.entries(data.tasks_by_status || {}).map(([status, count]) => (
            <div
              key={status}
              className="flex justify-between border-b py-2 text-sm"
            >
              <span>{status}</span>
              <span>{count}</span>
            </div>
          ))}
        </div>

        {/* 👤 Tasks per User */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-3">Tasks per User</h2>

          {Object.entries(data.tasks_per_user || {}).map(([user, count]) => (
            <div
              key={user}
              className="flex justify-between border-b py-2 text-sm"
            >
              <span>{user}</span>
              <span>{count}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}