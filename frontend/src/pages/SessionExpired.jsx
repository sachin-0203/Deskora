import { useNavigate } from "react-router-dom";
import { LogIn, ShieldOff } from "lucide-react";

export default function SessionExpired() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl border border-indigo-200 shadow-sm p-8 w-full max-w-sm text-center">

        {/* Icon */}
        <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center mx-auto mb-5">
          <ShieldOff size={28} className="text-indigo-400" />
        </div>

        {/* Text */}
        <h1 className="text-xl font-bold text-gray-800 mb-2">Session Expired</h1>
        <p className="text-sm text-gray-400 leading-relaxed mb-6">
          You've been logged out due to inactivity or an expired session. Please log in again to continue.
        </p>

        {/* Button */}
        <button
          onClick={() => navigate("/login")}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-all duration-200 cursor-pointer"
        >
          <LogIn size={16} /> Log in again
        </button>

      </div>
    </div>
  );
}