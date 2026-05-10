import { useState } from "react";
import {
  BookOpen, LogIn, FolderPlus, Users, CheckSquare,
  LayoutDashboard, ChevronDown, ChevronUp, Sparkles,
  UserPlus, ClipboardList, BarChart2, Shield, Trash2
} from "lucide-react";

const sections = [
  {
    icon: <LogIn size={20} />,
    color: "bg-indigo-100 text-indigo-600",
    border: "border-indigo-200",
    accent: "text-indigo-600",
    title: "Getting Started",
    subtitle: "Create your account and log in",
    steps: [
      { label: "Register", desc: "Go to the app and click Sign Up. Enter your name, email, and password to create your account." },
      { label: "Login", desc: "Use your email and password to log in. Your session is saved securely using a JWT token." },
      { label: "Auto Redirect", desc: "After login you'll be redirected to your Projects dashboard automatically." },
    ],
  },
  {
    icon: <FolderPlus size={20} />,
    color: "bg-purple-100 text-purple-600",
    border: "border-purple-200",
    accent: "text-purple-600",
    title: "Managing Projects",
    subtitle: "Create and organize your projects",
    steps: [
      { label: "Create Project", desc: "Click 'New Project' on the Projects page. Give it a name and you'll be set as the admin automatically." },
      { label: "View Projects", desc: "All projects you are a member of appear on your Projects page with your role shown." },
      { label: "Delete Project", desc: "Only admins can delete a project. Open the project and click Delete — a confirmation popup will appear." },
    ],
  },
  {
    icon: <UserPlus size={20} />,
    color: "bg-violet-100 text-violet-600",
    border: "border-violet-200",
    accent: "text-violet-600",
    title: "Team Members",
    subtitle: "Invite and manage your team",
    steps: [
      { label: "Add Member", desc: "Inside a project, enter a member's registered email in the Add Member box and click Add." },
      { label: "View Members", desc: "Member avatars appear under the project heading. Click any avatar to see their name, email, and role." },
      { label: "Remove Member", desc: "Click a member's avatar and press Remove from Project. Admins cannot be removed this way." },
      { label: "Roles", desc: "There are two roles — Admin (full control) and Member (can view and update tasks)." },
    ],
  },
  {
    icon: <ClipboardList size={20} />,
    color: "bg-blue-100 text-blue-600",
    border: "border-blue-200",
    accent: "text-blue-600",
    title: "Tasks",
    subtitle: "Create, assign, and track tasks",
    steps: [
      { label: "Create Task", desc: "Use the Add Task form inside a project. Give the task a title and it will be added to the list." },
      { label: "Update Status", desc: "Each task has a status selector — Todo, In Progress, or Done. Change it anytime to reflect progress." },
      { label: "Delete Task", desc: "Click the delete icon on any task card to remove it from the project permanently." },
      { label: "Task Count", desc: "The task count badge updates automatically as you add or remove tasks." },
    ],
  },
  {
    icon: <LayoutDashboard size={20} />,
    color: "bg-fuchsia-100 text-fuchsia-600",
    border: "border-fuchsia-200",
    accent: "text-fuchsia-600",
    title: "Dashboard",
    subtitle: "Visual overview of your project",
    steps: [
      { label: "Open Dashboard", desc: "Click the Dashboard button inside any project to see a visual summary of that project's progress." },
      { label: "Task Stats", desc: "The dashboard shows total tasks, completed tasks, in-progress tasks, and pending ones at a glance." },
      { label: "Charts", desc: "A visual chart breaks down task status so you can quickly identify bottlenecks." },
    ],
  },
  {
    icon: <Shield size={20} />,
    color: "bg-indigo-100 text-indigo-600",
    border: "border-indigo-200",
    accent: "text-indigo-600",
    title: "Roles & Permissions",
    subtitle: "What each role can do",
    steps: [
      { label: "Admin", desc: "Can create tasks, add/remove members, delete the project, and view the dashboard." },
      { label: "Member", desc: "Can view tasks, update task status, and view the dashboard. Cannot add members or delete the project." },
      { label: "Security", desc: "All routes are protected. You must be logged in and a member of the project to access it." },
    ],
  },
];

function Section({ section, index }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <div className={`bg-white rounded-2xl border ${section.border} shadow-sm overflow-hidden transition-all duration-300`}>
      {/* Header */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-all duration-200 cursor-pointer"
      >
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${section.color}`}>
            {section.icon}
          </div>
          <div className="text-left">
            <p className="font-semibold text-gray-800 text-sm sm:text-base">{section.title}</p>
            <p className="text-xs text-gray-400">{section.subtitle}</p>
          </div>
        </div>
        {open
          ? <ChevronUp size={18} className="text-gray-400 shrink-0" />
          : <ChevronDown size={18} className="text-gray-400 shrink-0" />
        }
      </button>

      {/* Steps */}
      {open && (
        <div className="px-6 pb-5 pt-1 space-y-3 border-t border-gray-100">
          {section.steps.map((step, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${section.color}`}>
                {i + 1}
              </div>
              <div>
                <p className={`text-sm font-semibold ${section.accent}`}>{step.label}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Guide() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 text-center">
          <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center mx-auto mb-4">
            <BookOpen size={26} className="text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">User Guide</h1>
          <p className="text-gray-400 text-sm max-w-md mx-auto">
            Everything you need to know to get started with Deskora — from creating your account to managing your team and tasks.
          </p>

          {/* Quick stat pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {[
              { color: "bg-indigo-50 text-indigo-600 border-indigo-200", label: "6 Sections" },
              { color: "bg-purple-50 text-purple-600 border-purple-200", label: "Role Based Access" },
              { color: "bg-violet-50 text-violet-600 border-violet-200", label: "Team Collaboration" },
              { color: "bg-fuchsia-50 text-fuchsia-600 border-fuchsia-200", label: "Task Tracking" },
            ].map((pill) => (
              <span key={pill.label} className={`text-xs font-medium px-3 py-1 rounded-full border ${pill.color}`}>
                {pill.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-4">
        {sections.map((section, i) => (
          <Section key={i} section={section} index={i} />
        ))}

        {/* Footer note */}
        <div className="flex items-start gap-3 bg-indigo-50 border border-indigo-200 rounded-xl px-5 py-4 mt-2">
          <Sparkles size={18} className="text-indigo-500 shrink-0 mt-0.5" />
          <p className="text-sm text-indigo-600">
            <span className="font-semibold">Tip:</span> You can be a member of multiple projects at once. Switch between them anytime from the Projects page.
          </p>
        </div>
      </div>
    </div>
  );
}