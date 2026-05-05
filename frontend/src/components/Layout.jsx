import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      {/* <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <h1
          className="font-bold text-lg tracking-wide cursor-pointer"
          onClick={() => navigate("/projects")}
        >
          DESKORA
        </h1>

        <button
          onClick={() => {
            localStorage.clear();
            navigate("/");
          }}
          className="text-sm text-red-500 hover:text-red-600 transition"
        >
          Logout
        </button>
      </header> */}
      <Navbar/>

      {/* Page Content */}
      <main className="p-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-500 p-4">
        Deskora : A Team Task Manager Website
      </footer>
    </div>
  );
}
