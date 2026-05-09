import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { toast } from "sonner";
import {
  Loader2,
  ArrowLeft,
  CheckCircle2,
  Clock3,
  AlertTriangle,
  ListTodo,
} from "lucide-react";

export default function Dashboard() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Protect Route
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  // Fetch Dashboard Data
  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const res = await API.get(`/dashboard/${id}`);

      setData(res.data);

    } catch (err) {
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 flex items-center justify-center">
        <Loader2
          className="animate-spin text-indigo-600"
          size={42}
        />
      </div>
    );
  }

  // Empty State
  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        No dashboard data available
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 p-4 sm:p-6">

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Project Dashboard
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Track task progress and project insights
            </p>
          </div>

          <button
            onClick={() => navigate(`/project/${id}`)}
            className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200 hover:bg-indigo-100 transition-all duration-200 cursor-pointer"
          >
            <ArrowLeft size={16} />
            Back to Project
          </button>

        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

          {/* Total Tasks */}
          <div className="bg-white/90 backdrop-blur-md border border-indigo-100 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all">

            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-gray-500">
                Total Tasks
              </p>

              <div className="w-11 h-11 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center">
                <ListTodo
                  className="text-indigo-600"
                  size={20}
                />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-800">
              {data.total_tasks}
            </h2>

          </div>

          {/* Overdue */}
          <div className="bg-white/90 backdrop-blur-md border border-red-100 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all">

            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-gray-500">
                Overdue
              </p>

              <div className="w-11 h-11 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center">
                <AlertTriangle
                  className="text-red-500"
                  size={20}
                />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-red-500">
              {data.overdue_tasks}
            </h2>

          </div>

          {/* In Progress */}
          <div className="bg-white/90 backdrop-blur-md border border-yellow-100 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all">

            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-gray-500">
                In Progress
              </p>

              <div className="w-11 h-11 rounded-xl bg-yellow-50 border border-yellow-200 flex items-center justify-center">
                <Clock3
                  className="text-yellow-600"
                  size={20}
                />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-yellow-600">
              {data.tasks_by_status?.["In Progress"] || 0}
            </h2>

          </div>

          {/* Completed */}
          <div className="bg-white/90 backdrop-blur-md border border-green-100 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all">

            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-gray-500">
                Completed
              </p>

              <div className="w-11 h-11 rounded-xl bg-green-50 border border-green-200 flex items-center justify-center">
                <CheckCircle2
                  className="text-green-600"
                  size={20}
                />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-green-600">
              {data.tasks_by_status?.["Done"] || 0}
            </h2>

          </div>

        </div>

        {/* Tables */}
        <div className="grid lg:grid-cols-2 gap-6">

          {/* Tasks by Status */}
          <div className="bg-white/90 backdrop-blur-md border border-indigo-100 rounded-2xl p-5 shadow-sm">

            <h2 className="text-lg font-semibold text-gray-800 mb-5">
              Tasks by Status
            </h2>

            <div className="space-y-3">

              {Object.entries(data.tasks_by_status || {}).map(
                ([status, count]) => (
                  <div
                    key={status}
                    className="flex items-center justify-between rounded-xl border border-gray-100 px-4 py-3 bg-gray-50"
                  >
                    <span className="text-sm font-medium text-gray-700">
                      {status}
                    </span>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        status === "Done"
                          ? "bg-green-100 text-green-600"
                          : status === "In Progress"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {count}
                    </span>
                  </div>
                )
              )}

            </div>

          </div>

          {/* Tasks per User */}
          <div className="bg-white/90 backdrop-blur-md border border-indigo-100 rounded-2xl p-5 shadow-sm">

            <h2 className="text-lg font-semibold text-gray-800 mb-5">
              Tasks per User
            </h2>

            <div className="space-y-3">

              {Object.entries(data.tasks_per_user || {}).map(
                ([user, count]) => (
                  <div
                    key={user}
                    className="flex items-center justify-between rounded-xl border border-gray-100 px-4 py-3 bg-gray-50"
                  >
                    <span className="text-sm font-medium text-gray-700">
                      {user}
                    </span>

                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-600">
                      {count} Tasks
                    </span>
                  </div>
                )
              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}