import { useNavigate } from "react-router-dom";
import { ArrowRight, ShieldCheck, FolderKanban } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-indigo-100 flex items-center justify-center px-4">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-10 items-center">
        {/* Left Content */}
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-600 text-sm font-medium mb-6 mt-5">
            <ShieldCheck size={16} />
            Smart Team Collaboration Platform
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 leading-tight">
            Manage Projects &
            <span className="text-indigo-600"> Teams Efficiently</span>
          </h1>

          <p className="text-gray-600 mt-6 text-base sm:text-lg leading-relaxed max-w-xl">
            Deskora helps teams organize projects, assign tasks, track progress,
            and collaborate seamlessly in one modern workspace.
          </p>

          {/* Features */}
          <div className="flex flex-wrap gap-4 mt-8 justify-center lg:justify-start">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 shadow-sm">
              <FolderKanban size={18} className="text-indigo-600" />
              <span className="text-sm font-medium text-gray-700">
                Project Management
              </span>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 shadow-sm">
              <ShieldCheck size={18} className="text-indigo-600" />
              <span className="text-sm font-medium text-gray-700">
                Secure Workspace
              </span>
            </div>
          </div>

        </div>

        {/* Right Card */}
        <div className="bg-white/90 backdrop-blur-md border border-indigo-100 shadow-2xl rounded-3xl p-8 sm:p-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center mb-4">
              <FolderKanban className="text-indigo-600" size={30} />
            </div>

            <h2 className="text-3xl font-bold text-gray-800">DESKORA</h2>

            <p className="text-gray-500 mt-2">Team Task Manager App</p>
          </div>

          {/* Buttons */}
          <div className="space-y-4">
            <button
              onClick={() => navigate("/login")}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200 hover:bg-indigo-100 transition-all duration-200 py-3 font-semibold cursor-pointer"
            >
              Login
              <ArrowRight size={18} />
            </button>

            <button
              onClick={() => navigate("/signup")}
              className="w-full rounded-xl border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-all duration-200 py-3 font-semibold cursor-pointer"
            >
              Create Account
            </button>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-gray-400 mt-8">
            Simplify teamwork. Boost productivity.
          </p>
        </div>
      </div>
    </div>
  );
}
