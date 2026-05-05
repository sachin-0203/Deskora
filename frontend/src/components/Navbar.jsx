import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">

        {/* Logo */}
        <h1
          onClick={() => navigate("/projects")}
          className="font-bold text-lg cursor-pointer text-gray-800"
        >
          TaskManager
        </h1>

        {/* Right side */}
        <div className="flex items-center gap-4">

          <span className="text-sm text-gray-600">
            {user?.name || "User"}
          </span>

          <button
            onClick={handleLogout}
            className="text-sm text-red-500 hover:text-red-600 transition"
          >
            Logout
          </button>

        </div>

      </div>
    </header>
  );
}