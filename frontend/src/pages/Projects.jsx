import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔐 Protect route
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/";
    }
  }, []);

  // 📦 Fetch projects
  const fetchProjects = async () => {
    try {
      const res = await API.get("/projects/");
      setProjects(res.data);
    } catch (err) {
      alert("Failed to fetch projects");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // ➕ Create project
  const handleCreate = async (e) => {
    e.preventDefault();

    if (!name) {
      alert("Project name required");
      return;
    }

    setLoading(true);
    try {
      await API.post("/projects/", { name });
      setName("");
      fetchProjects();
    } catch (err) {
      alert("Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <div className="max-w-4xl mx-auto mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Your Projects</h1>

        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
          className="text-sm text-red-500 hover:underline"
        >
          Logout
        </button>
      </div>

      {/* Create Project */}
      <div className="max-w-4xl mx-auto bg-white p-4 rounded shadow mb-6">
        <form onSubmit={handleCreate} className="flex gap-3">

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter project name..."
            className="flex-1 p-2 border rounded outline-none focus:border-blue-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600"
          >
            {loading ? "Creating..." : "Create"}
          </button>

        </form>
      </div>

      {/* Projects List */}
      <div className="max-w-4xl mx-auto space-y-3">

        {projects.length === 0 ? (
          <p className="text-gray-500 text-center">No projects yet</p>
        ) : (
          projects.map((p) => (
            <div
              key={p.id}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold text-gray-800">{p.name}</h3>
                <p className="text-sm text-gray-500">Role: {p.role}</p>
              </div>

              <button
                onClick={() => (window.location.href = `/project/${p.id}`)}
                className="text-blue-500 text-sm hover:underline"
              >
                Open →
              </button>
            </div>
          ))
        )}

      </div>

    </div>
  );
}