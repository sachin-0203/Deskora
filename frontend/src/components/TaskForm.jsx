import { useState } from "react";

export default function TaskForm({ onCreate }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    onCreate({
      title,
      priority,
    });

    setTitle("");
    setPriority("Medium");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-lg border shadow-sm flex flex-col md:flex-row gap-3"
    >
      {/* Title */}
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task title..."
        className="flex-1 p-3 border rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-200"
      />

      {/* Priority */}
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="p-3 border rounded-md text-sm"
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      {/* Button */}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm transition"
      >
        Add Task
      </button>
    </form>
  );
}