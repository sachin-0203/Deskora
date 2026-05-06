import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import MemberList from "../components/MemberList";

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [email, setEmail] = useState("");
  const [members, setMembers] = useState([]);

  //  Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await API.get(`/tasks/project/${id}`);
      setTasks(res.data);
    } catch (err) {
      alert("Failed to fetch tasks");
    }
  };

  //  Fetch members
  const fetchMembers = async () => {
    try {
      const res = await API.get(`/projects/${id}/members`);
      setMembers(res.data);
    } catch (err) {
      alert("Failed to fetch members");
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchMembers();
  }, [id]);

  //  Create task
  const handleCreateTask = async (taskData) => {
    try {
      await API.post("/tasks/", {
        project_id: id,
        ...taskData,
        description: "",
        due_date: "2026-05-10",
        assigned_to: 1,
      });

      fetchTasks();
    } catch (err) {
      alert("Failed to create task");
    }
  };

  // Update status
  const updateStatus = async (taskId, status) => {
    try {
      await API.put(`/tasks/${taskId}`, { status });
      fetchTasks();
    } catch (err) {
      alert("Failed to update task");
    }
  };

  const handleDeleteProject = async () => {
    if (!window.confirm("Delete this project?")) return;

    try {
      await API.delete(`/projects/${id}`);
      navigate("/projects");
    } catch (err) {
      alert("Failed to delete project");
    }
  };

  //  Add member
  const handleAddMember = async (e) => {
    e.preventDefault();

    if (!email) return alert("Email required");

    try {
      await API.post(`/projects/${id}/add-member`, { email });
      setEmail("");
      fetchMembers();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to add member");
    }
  };

  // Remove Member
  const handleRemoveMember = async (memberId) => {
    try {
      await API.delete(`/projects/${id}/remove-member/${memberId}`);
      fetchMembers();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to remove member");
    }
  };

  // Remove Task
  const deleteTask = async (taskId) => {
    try {
      await API.delete(`/tasks/${taskId}`);
      fetchTasks();
    } catch (err) {
      alert("Failed to delete task");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        {/* <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Project Details</h1>

          <button
            onClick={() => navigate(`/dashboard/${id}`)}
            className="text-blue-500 text-sm hover:underline"
          >
            Dashboard →
          </button>
        </div> */}
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Project Details</h1>

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(`/dashboard/${id}`)}
              className="cursor-pointer text-black hover:bg-green-300 border border-green-500 p-2 rounded-md bg-green-200 duration-300 "
            >
              Dashboard →
            </button>

            <button
              onClick={handleDeleteProject}
              className="cursor-pointer text-black hover:bg-red-300 border border-red-500 p-2 rounded-md bg-red-200 duration-300 "
            >
              Delete Project
            </button>
          </div>
        </div>

        {/* 👥 MEMBERS SECTION (70% - 30% layout) */}
        <div className="flex gap-6 mb-6">
          {/* LEFT: Add Member (70%) */}
          <div className="w-[70%]">
            <div className="bg-white p-4 rounded-lg border shadow-sm">
              <h2 className="font-semibold mb-3">Add Member</h2>

              <form onSubmit={handleAddMember} className="flex gap-3">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="User email"
                  className="flex-1 p-3 border rounded-md text-sm"
                />
                <button className="bg-blue-500 text-white px-4 rounded-md text-sm">
                  Add
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT: Member List (30%) */}
          <div className="w-[30%]">
            <MemberList members={members} onRemove={handleRemoveMember} />
          </div>
        </div>

        {/* ➕ TASK FORM */}
        <div className="mb-6">
          <TaskForm onCreate={handleCreateTask} />
        </div>

        {/* 📋 TASK LIST */}
        <div className="space-y-3">
          {tasks.length === 0 ? (
            <p className="text-center text-gray-500 py-10">No tasks yet</p>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onStatusChange={updateStatus}
                onDelete={deleteTask}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
