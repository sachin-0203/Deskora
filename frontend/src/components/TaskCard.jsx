import { useState } from "react";

export default function TaskCard({ task, onStatusChange, onDelete }) {
  const [status, setStatus] = useState(task.status);

  const handleChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);

    // call parent function
    onStatusChange(task.id, newStatus);
  };

  return (
    <div className="relative bg-white p-4 rounded-lg border shadow-sm">

      {/*  TITLE */}
      <h2 className="text-lg font-semibold">
        {task.title || "No Title"}
      </h2>

      {/*  DESCRIPTION */}
      {task.description && (
        <p className="text-gray-600 text-sm mt-1">
          {task.description}
        </p>
      )}

      {/*  META */}
      <div className="text-sm text-gray-500 mt-2 space-y-1">
        <p><strong>Priority:</strong> {task.priority || "N/A"}</p>
        <p>
          <strong>Due:</strong>{" "}
          {task.due_date
            ? new Date(task.due_date).toLocaleDateString()
            : "No date"}
        </p>
      </div>

      {/* ✅ STATUS DROPDOWN */}
      <div className="mt-3">
        <select
          value={status}
          onChange={handleChange}
          className="border p-2 rounded text-sm"
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>

      <button
        onClick={() => {
          if (window.confirm("Delete this task?")) {
            onDelete(task.id);
          }
        }}
        className="absolute top-0 right-3 cursor-pointer mt-3 bg-red-300 text-white px-3 py-1 rounded text-sm hover:bg-red-500 duration-300 active:scale-95"
      >
        Delete
      </button>

    </div>
  );
}