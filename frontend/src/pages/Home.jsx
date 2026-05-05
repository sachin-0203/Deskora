import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-md text-center w-full max-w-md">

        <h1 className="text-3xl font-bold mb-2">
          DESKORA
        </h1>

        <h1 className="text-lxl  mb-2">
          Team Task Manager App
        </h1>

        <p className="text-gray-500 mb-6 text-sm">
          Manage projects, tasks, and teams efficiently
        </p>

        <div className="space-y-3">

          <button
            onClick={() => navigate("/login")}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="w-full border border-blue-500 text-blue-500 py-2 rounded hover:bg-blue-50"
          >
            Signup
          </button>

        </div>

      </div>

    </div>
  );
}