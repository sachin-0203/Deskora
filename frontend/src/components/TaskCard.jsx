import { useState } from "react";
import { toast } from "sonner";

export default function TaskCard({ task, onStatusChange, onDelete }) {
  const [status, setStatus] = useState(task.status);
  const [loading, setLoading] = useState(false);

  // Handle Status Change
  const handleChange = async (e) => {
    const newStatus = e.target.value;

    setStatus(newStatus);

    try {
      setLoading(true);

      await onStatusChange(task.id, newStatus);

      toast.success("Task status updated");
    } catch (err) {
      toast.error("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  // Handle Delete
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Delete this task?");

    if (!confirmDelete) return;

    try {
      setLoading(true);

      await onDelete(task.id);

      toast.success("Task deleted successfully");
    } catch (err) {
      toast.error("Failed to delete task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-white/90 backdrop-blur-md border border-indigo-100 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-300">
      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-800">
        {task.title || "No Title"}
      </h2>

      {/* Description */}
      {task.description && (
        <p className="text-gray-600 text-sm mt-2 leading-relaxed">
          {task.description}
        </p>
      )}

      {/* Meta */}
      <div className="mt-4 space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-gray-500 font-medium">Priority</span>

          <span
            className={`px-3 py-1 rounded-full text-xs font-medium
            ${
              task.priority === "High"
                ? "bg-red-100 text-red-600"
                : task.priority === "Medium"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-600"
            }`}
          >
            {task.priority || "N/A"}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-500 font-medium">Due Date</span>

          <span className="text-gray-700 text-sm">
            {task.due_date
              ? new Date(task.due_date).toLocaleDateString()
              : "No date"}
          </span>
        </div>
      </div>

      {/* Status Dropdown */}
      <div className="mt-5">
        <select
          value={status}
          onChange={handleChange}
          disabled={loading}
          className={`w-full rounded-xl px-4 py-2.5 text-sm font-medium outline-none transition-all cursor-pointer border
          ${
            status === "To Do"
              ? "bg-indigo-50 text-indigo-600 border-indigo-200 focus:ring-4 focus:ring-red-100"
              : status === "In Progress"
                ? "bg-yellow-50 text-yellow-700 border-yellow-200 focus:ring-4 focus:ring-yellow-100"
                : "bg-green-50 text-green-600 border-green-200 focus:ring-4 focus:ring-green-100"
          }`}
        >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

      {/* Delete Button */}
      <button
        onClick={handleDelete}
        disabled={loading}
        className="mt-4 w-full rounded-xl border border-red-200 bg-red-50 py-2.5 text-sm font-medium text-red-600 hover:bg-red-100 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
      >
        {loading ? "Processing..." : "Delete Task"}
      </button>
    </div>
  );
}
