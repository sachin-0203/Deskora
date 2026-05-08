import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
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
