import {
  Sparkles, Code2, Server,
  Database, Layers, Target, Heart
} from "lucide-react";

const techStack = [
  {
    color: "bg-indigo-100 text-indigo-600",
    border: "border-indigo-200",
    icon: <Code2 size={18} />,
    label: "Frontend",
    items: ["React", "Tailwind CSS", "React Router", "Axios", "Lucide Icons"],
  },
  {
    color: "bg-purple-100 text-purple-600",
    border: "border-purple-200",
    icon: <Server size={18} />,
    label: "Backend",
    items: ["Python", "Flask", "Flask-JWT-Extended", "Flask-CORS", "Bcrypt"],
  },
  {
    color: "bg-violet-100 text-violet-600",
    border: "border-violet-200",
    icon: <Database size={18} />,
    label: "Database",
    items: ["PostgreSQL", "SQLAlchemy"],
  },
  {
    color: "bg-fuchsia-100 text-fuchsia-600",
    border: "border-fuchsia-200",
    icon: <Layers size={18} />,
    label: "Deployment",
    items: ["Railway (Backend)", "Netlify (Frontend)", "Gunicorn"],
  },
];

const features = [
  { color: "bg-indigo-100 text-indigo-600", label: "JWT Authentication", desc: "Secure login and session management using JSON Web Tokens." },
  { color: "bg-purple-100 text-purple-600", label: "Role Based Access", desc: "Admin and Member roles with different permissions per project." },
  { color: "bg-violet-100 text-violet-600", label: "Project Management", desc: "Create projects, invite team members, and track progress together." },
  { color: "bg-blue-100 text-blue-600", label: "Task Tracking", desc: "Create tasks, update their status, and monitor completion in real time." },
  { color: "bg-fuchsia-100 text-fuchsia-600", label: "Live Dashboard", desc: "Visual summary of task status with stats and progress indicators." },
];

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Hero ── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center mx-auto mb-5">
            <Sparkles size={28} className="text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-3">About Deskora</h1>
          <p className="text-gray-400 text-sm leading-relaxed max-w-lg mx-auto">
            Deskora is a full-stack project and task management platform built to help teams collaborate, assign work, and track progress — all in one place.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {[
              { label: "Full Stack", color: "bg-indigo-50 text-indigo-600 border-indigo-200" },
              { label: "REST API", color: "bg-purple-50 text-purple-600 border-purple-200" },
              { label: "Role Based", color: "bg-violet-50 text-violet-600 border-violet-200" },
              { label: "Team Ready", color: "bg-fuchsia-50 text-fuchsia-600 border-fuchsia-200" },
            ].map((p) => (
              <span key={p.label} className={`text-xs font-medium px-3 py-1 rounded-full border ${p.color}`}>
                {p.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-8">

        {/* ── Mission ── */}
        <div className="bg-white rounded-2xl border border-indigo-200 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center">
              <Target size={18} className="text-indigo-600" />
            </div>
            <h2 className="font-semibold text-gray-800">Mission</h2>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed">
            Deskora was built to make project collaboration simple and transparent. Whether you're a solo developer or part of a growing team, Deskora gives you the tools to stay organized, delegate effectively, and ship faster — without the overhead of complex tools.
          </p>
        </div>

        {/* ── Features ── */}
        <div>
          <h2 className="font-semibold text-gray-800 mb-3">Key Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {features.map((f, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex gap-3 items-start">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${f.color}`}>
                  <Sparkles size={15} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700">{f.label}</p>
                  <p className="text-xs text-gray-400 leading-relaxed mt-0.5">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Tech Stack ── */}
        <div>
          <h2 className="font-semibold text-gray-800 mb-3">Tech Stack</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {techStack.map((t, i) => (
              <div key={i} className={`bg-white rounded-xl border ${t.border} shadow-sm p-4`}>
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${t.color}`}>
                    {t.icon}
                  </div>
                  <p className="text-sm font-semibold text-gray-700">{t.label}</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {t.items.map((item) => (
                    <span key={item} className={`text-xs font-medium px-2.5 py-1 rounded-full border ${t.border} ${t.color}`}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Developer ── */}
        <div className="bg-white rounded-2xl border border-purple-200 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl bg-purple-100 flex items-center justify-center">
              <Heart size={18} className="text-purple-600" />
            </div>
            <h2 className="font-semibold text-gray-800">Built by</h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center text-xl font-bold text-indigo-600 shrink-0 border-2 border-indigo-200">
              SKG
            </div>
            <div>
              <p className="font-semibold text-gray-800">Sachin Kumar Gola</p>
              <p className="text-xs text-gray-400 mt-0.5">Full Stack Developer</p>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Passionate about building clean, production-ready web applications with modern technologies.
              </p>
            </div>
          </div>
        </div>

        {/* ── Footer note ── */}
        <div className="flex items-start gap-3 bg-indigo-50 border border-indigo-200 rounded-xl px-5 py-4">
          <Sparkles size={18} className="text-indigo-500 shrink-0 mt-0.5" />
          <p className="text-sm text-indigo-600">
            <span className="font-semibold">Deskora</span> — built with care to demonstrate full-stack development skills including REST API design, JWT auth, role-based access control, and responsive UI.
          </p>
        </div>

      </div>
    </div>
  );
}