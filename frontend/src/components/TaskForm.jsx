import { useState } from "react";
import { toast } from "sonner";

export default function TaskForm({ onCreate }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [loading, setLoading] = useState(false);

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.warning("Task title is required");
      return;
    }

    try {
      setLoading(true);

      await onCreate({
        title,
        priority,
      });

      toast.success("Task created successfully");

      setTitle("");
      setPriority("Medium");

    } catch (err) {
      toast.error("Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/90 backdrop-blur-md border border-indigo-100 shadow-sm rounded-2xl p-4 flex flex-col md:flex-row gap-3"
    >

      {/* Title */}
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task title..."
        className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
      />

      {/* Priority */}
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className={`rounded-xl px-4 py-3 text-sm font-medium outline-none transition-all cursor-pointer border
        ${
          priority === "High"
            ? "bg-red-50 text-red-600 border-red-200 focus:ring-4 focus:ring-red-100"
            : priority === "Medium"
            ? "bg-yellow-50 text-yellow-700 border-yellow-200 focus:ring-4 focus:ring-yellow-100"
            : "bg-green-50 text-green-600 border-green-200 focus:ring-4 focus:ring-green-100"
        }`}
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      {/* Button */}
      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200 hover:bg-indigo-100 transition-all duration-200 px-5 py-3 text-sm font-semibold disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
      >
        {loading ? "Adding..." : "Add Task"}
      </button>

    </form>
  );
}