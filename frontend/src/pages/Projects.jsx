import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  FolderKanban,
  Plus,
  Loader2,
  LogOut,
  ArrowRight,
} from "lucide-react";

export default function Projects() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  //  Protect Route
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  //  Fetch Projects
  const fetchProjects = async () => {
    try {
      setPageLoading(true);

      const res = await API.get("/projects/");

      setProjects(res.data);

    } catch (err) {
      toast.error("Failed to fetch projects");
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  //  Create Project
  const handleCreate = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.warning("Project name is required");
      return;
    }

    try {
      setLoading(true);

      await API.post("/projects/", { name });

      toast.success("Project created successfully");

      setName("");

      fetchProjects();

    } catch (err) {
      toast.error("Failed to create project");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 p-4 sm:p-6">

      {/* Header */}
      <div className="max-w-5xl mx-auto mb-8 ">

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Your Projects
          </h1>

          <p className="text-gray-500 mt-1 text-sm">
            Manage and organize your team workspace
          </p>
        </div>

      </div>

      {/* Create Project */}
      <div className="max-w-5xl mx-auto bg-white/90 backdrop-blur-md border border-indigo-100 shadow-lg rounded-2xl p-5 mb-8">

        <form
          onSubmit={handleCreate}
          className="flex flex-col sm:flex-row gap-4"
        >

          <div className="relative flex-1">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter project name..."
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200 hover:bg-indigo-100 transition-all duration-200 font-semibold disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Creating...
              </>
            ) : (
              <>
                <Plus size={18} />
                Create Project
              </>
            )}
          </button>

        </form>

      </div>

      {/* Projects */}
      <div className="max-w-5xl mx-auto">

        {pageLoading ? (

          <div className="flex items-center justify-center py-20">
            <Loader2
              className="animate-spin text-indigo-600"
              size={40}
            />
          </div>

        ) : projects.length === 0 ? (

          <div className="bg-white/80 border border-dashed border-indigo-200 rounded-2xl p-10 text-center shadow-sm">

            <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center mb-4">
              <FolderKanban className="text-indigo-600" size={30} />
            </div>

            <h3 className="text-lg font-semibold text-gray-700">
              No Projects Yet
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Create your first project to start collaborating
            </p>

          </div>

        ) : (

          <div className="grid gap-4">

            {projects.map((p) => (
              <div
                key={p.id}
                className="bg-white/90 backdrop-blur-md border border-indigo-100 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              >

                <div className="flex items-start gap-4">

                  <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center">
                    <FolderKanban
                      className="text-indigo-600"
                      size={22}
                    />
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">
                      {p.name}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Role: {p.role}
                    </p>
                  </div>

                </div>

                <button
                  onClick={() => navigate(`/project/${p.id}`)}
                  className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200 hover:bg-indigo-100 transition-all duration-200 cursor-pointer"
                >
                  Open Project
                  <ArrowRight size={16} />
                </button>

              </div>
            ))}

          </div>

        )}

      </div>

    </div>
  );
}