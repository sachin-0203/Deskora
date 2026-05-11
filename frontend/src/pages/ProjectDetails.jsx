import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";

import {
  LayoutDashboard,
  Trash2,
  UserPlus,
  ClipboardList,
  X,
  Mail,
  Shield,
} from "lucide-react";

import { toast } from "sonner";

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [email, setEmail] = useState("");
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingMember, setAddingMember] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  // ── Get Current User Role ──
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const currentUserRole = members.find(
    (m) => m.id === currentUser?.id
  )?.role;

  const isAdmin = currentUserRole === "admin";

  // ── Fetch Tasks ──
  const fetchTasks = async () => {
    try {
      const res = await API.get(`/tasks/project/${id}`);
      setTasks(res.data);
    } catch (err) {
      toast.error("Failed to fetch tasks");
    }
  };

  // ── Fetch Members ──
  const fetchMembers = async () => {
    try {
      const res = await API.get(`/projects/${id}/members`);
      setMembers(res.data);
    } catch (err) {
      toast.error("Failed to fetch members");
    }
  };

  // ── Initial Load ──
  useEffect(() => {
    const init = async () => {
      setLoading(true);

      await Promise.all([
        fetchTasks(),
        fetchMembers(),
      ]);

      setLoading(false);
    };

    init();
  }, [id]);

  // ── Create Task ──
  const handleCreateTask = async (taskData) => {
    try {
      await API.post("/tasks/", {
        project_id: id,
        ...taskData,
        description: "",
        due_date: "2026-05-10",
        assigned_to: 1,
      });

      await fetchTasks();

      toast.success("Task created successfully");
    } catch (err) {
      toast.error("Failed to create task");
    }
  };

  // ── Update Task Status ──
  const updateStatus = async (taskId, status) => {
    try {
      await API.put(`/tasks/${taskId}`, {
        status,
      });

      await fetchTasks();

      toast.success("Task status updated");
    } catch (err) {
      toast.error("Failed to update task");
      throw err;
    }
  };

  // ── Delete Project ──
  const handleDeleteProject = async () => {
    if (!isAdmin) {
      setShowDeleteConfirm(false);

      toast.error(
        "You are a member and not allowed to delete this project"
      );

      return;
    }

    try {
      await API.delete(`/projects/${id}`);

      toast.success("Project deleted");

      navigate("/projects");
    } catch (err) {
      toast.error("Failed to delete project");
    }
  };

  // ── Add Member ──
  const handleAddMember = async (e) => {
    e.preventDefault();

    if (!email) return;

    if (!isAdmin) {
      toast.error(
        "You are a member and not allowed to add members"
      );

      return;
    }

    setAddingMember(true);

    try {
      await API.post(
        `/projects/${id}/add-member`,
        { email }
      );

      setEmail("");

      await fetchMembers();

      toast.success("Member added successfully");
    } catch (err) {
      toast.error(
        err.response?.data?.error ||
          "Failed to add member"
      );
    } finally {
      setAddingMember(false);
    }
  };

  // ── Remove Member ──
  const handleRemoveMember = async (memberId) => {
    if (!isAdmin) {
      setSelectedMember(null);

      toast.error(
        "You are a member and not allowed to remove members"
      );

      return;
    }

    try {
      await API.delete(
        `/projects/${id}/remove-member/${memberId}`
      );

      await fetchMembers();

      setSelectedMember(null);

      toast.success("Member removed");
    } catch (err) {
      toast.error(
        err.response?.data?.error ||
          "Failed to remove member"
      );
    }
  };

  // ── Delete Task ──
  const deleteTask = async (taskId) => {
    if (!isAdmin) {
      toast.error(
        "You are a member and not allowed to delete tasks"
      );

      return;
    }

    try {
      await API.delete(`/tasks/${taskId}`);

      await fetchTasks();

      toast.success("Task deleted");
    } catch (err) {
      toast.error("Failed to delete task");
      throw err;
    }
  };

  // ── Helpers ──
  const getInitials = (name) =>
    name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "?";

  const avatarColors = [
    "bg-indigo-100 text-indigo-600",
    "bg-purple-100 text-purple-600",
    "bg-violet-100 text-violet-600",
    "bg-blue-100 text-blue-600",
    "bg-fuchsia-100 text-fuchsia-600",
  ];

  // ── Loading Screen ──
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />

          <p className="text-sm text-gray-500">
            Loading project...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Header ── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-5">

          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">

            <div>

              <div className="flex items-center gap-2 mb-1">

                <p className="text-xs font-medium text-indigo-500 uppercase tracking-widest">
                  Project
                </p>

                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full border
                  ${
                    isAdmin
                      ? "bg-indigo-50 text-indigo-600 border-indigo-200"
                      : "bg-gray-100 text-gray-500 border-gray-200"
                  }`}
                >
                  {isAdmin
                    ? "👑 Admin"
                    : "👤 Member"}
                </span>
              </div>

              <h1 className="text-2xl font-bold text-gray-800">
                Project Details
              </h1>

              {/* Members */}
              <div className="flex items-center gap-2 mt-3">

                <div className="flex -space-x-2">

                  {members
                    .slice(0, 6)
                    .map((m, i) => (
                      <button
                        key={m.id}
                        onClick={() =>
                          setSelectedMember(m)
                        }
                        title={m.name}
                        className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-semibold cursor-pointer hover:scale-110 hover:z-10 transition-transform duration-200
                        ${
                          avatarColors[
                            i % avatarColors.length
                          ]
                        }`}
                      >
                        {getInitials(m.name)}
                      </button>
                    ))}

                  {members.length > 6 && (
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-500">
                      +{members.length - 6}
                    </div>
                  )}
                </div>

                <span className="text-xs text-gray-400">
                  {members.length} member
                  {members.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-2 shrink-0">

              <button
                onClick={() =>
                  navigate(`/dashboard/${id}`)
                }
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-indigo-50 text-indigo-600 border border-indigo-200 hover:bg-indigo-100 transition-all duration-200 cursor-pointer"
              >
                <LayoutDashboard size={15} />
                Dashboard
              </button>

              <button
                onClick={() =>
                  isAdmin
                    ? setShowDeleteConfirm(true)
                    : toast.error(
                        "You are a member and not allowed to delete this project"
                      )
                }
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md border transition-all duration-200 cursor-pointer
                  ${
                    isAdmin
                      ? "bg-red-50 text-red-500 border-red-200 hover:bg-red-100"
                      : "bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed"
                  }`}
              >
                <Trash2 size={15} />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-5">

        <div className="flex flex-col md:flex-row gap-4">

          {/* Add Task */}
          <div className="w-full md:w-[70%] bg-white rounded-xl border border-gray-200 shadow-sm p-5">

            <div className="flex items-center gap-2 mb-4">

              <div className="w-8 h-8 rounded-md bg-indigo-50 flex items-center justify-center">
                <ClipboardList
                  size={16}
                  className="text-indigo-600"
                />
              </div>

              <h2 className="font-semibold text-gray-800">
                Add Task
              </h2>
            </div>

            <TaskForm onCreate={handleCreateTask} isAdmin={isAdmin} />

          </div>

          {/* Add Member */}
          <div className="w-full md:w-[30%] bg-white rounded-xl border border-gray-200 shadow-sm p-5">

            <div className="flex items-center gap-2 mb-4">

              <div className="w-8 h-8 rounded-md bg-indigo-50 flex items-center justify-center">
                <UserPlus
                  size={16}
                  className="text-indigo-600"
                />
              </div>

              <h2 className="font-semibold text-gray-800">
                Add Member
              </h2>
            </div>

            <form
              onSubmit={handleAddMember}
              className="flex flex-col gap-2"
            >

              <input
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="Member's email"
                type="email"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all"
              />

              <button
                type="submit"
                disabled={addingMember}
                className="w-full py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-all duration-200 disabled:opacity-60 cursor-pointer"
              >
                {addingMember
                  ? "Adding..."
                  : "Add Member"}
              </button>
            </form>
          </div>

        </div>

        {/* ── Task List ── */}
        <div>

          <div className="flex items-center gap-2 mb-3">

            <h2 className="font-semibold text-gray-800">
              Tasks
            </h2>

            <span className="text-xs font-medium bg-indigo-50 text-indigo-600 border border-indigo-200 px-2 py-0.5 rounded-full">
              {tasks.length}
            </span>
          </div>

          {tasks.length === 0 ? (
            <div className="bg-white rounded-xl border border-dashed border-gray-200 py-16 flex flex-col items-center gap-2">

              <ClipboardList
                size={32}
                className="text-gray-300"
              />

              <p className="text-sm text-gray-400 font-medium">
                No tasks yet
              </p>

              <p className="text-xs text-gray-300">
                Create your first task above
              </p>
            </div>
          ) : (
            <div className="space-y-3">

              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onStatusChange={updateStatus}
                  onDelete={deleteTask}
                  isAdmin={isAdmin}
                />
              ))}
            </div>
          )}
        </div>

      </div>

      {/* ── Member Popup ── */}
      {selectedMember && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4"
          onClick={() =>
            setSelectedMember(null)
          }
        >

          <div
            className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="flex justify-end mb-2">
              <button
                onClick={() =>
                  setSelectedMember(null)
                }
                className="p-1.5 rounded-md text-gray-400 hover:bg-gray-100 transition-all"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex flex-col items-center gap-2 mb-5">

              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold border-4 border-white shadow-md
                ${
                  avatarColors[
                    members.findIndex(
                      (m) =>
                        m.id === selectedMember.id
                    ) % avatarColors.length
                  ]
                }`}
              >
                {getInitials(selectedMember.name)}
              </div>

              <h3 className="text-lg font-semibold text-gray-800">
                {selectedMember.name}
              </h3>

              <span
                className={`text-xs font-medium px-3 py-1 rounded-full
                ${
                  selectedMember.role === "admin"
                    ? "bg-indigo-50 text-indigo-600 border border-indigo-200"
                    : "bg-gray-100 text-gray-500 border border-gray-200"
                }`}
              >
                {selectedMember.role === "admin"
                  ? "👑 Admin"
                  : "Member"}
              </span>
            </div>

            <div className="space-y-3 mb-6">

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                <Mail
                  size={16}
                  className="text-indigo-400 shrink-0"
                />

                <span className="text-sm text-gray-600 truncate">
                  {selectedMember.email}
                </span>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                <Shield
                  size={16}
                  className="text-indigo-400 shrink-0"
                />

                <span className="text-sm text-gray-600 capitalize">
                  {selectedMember.role}
                </span>
              </div>
            </div>

            {selectedMember.role !==
              "admin" && (
              <button
                onClick={() =>
                  handleRemoveMember(
                    selectedMember.id
                  )
                }
                className="w-full py-2.5 text-sm font-medium rounded-lg bg-red-50 text-red-500 border border-red-200 hover:bg-red-100 transition-all cursor-pointer"
              >
                Remove from Project
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── Delete Confirm Modal ── */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">

          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm">

            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
              <Trash2
                size={22}
                className="text-red-500"
              />
            </div>

            <h3 className="text-center font-semibold text-gray-800 mb-1">
              Delete Project?
            </h3>

            <p className="text-center text-sm text-gray-400 mb-6">
              This will permanently delete the
              project and all its tasks. This
              cannot be undone.
            </p>

            <div className="flex gap-3">

              <button
                onClick={() =>
                  setShowDeleteConfirm(false)
                }
                className="flex-1 py-2.5 text-sm font-medium rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteProject}
                className="flex-1 py-2.5 text-sm font-medium rounded-md bg-red-500 text-white hover:bg-red-600 transition-all cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}