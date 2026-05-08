import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { Sun, Moon, Menu, X, LogOut, Home, Info, BookOpen, User } from "lucide-react";

export default function Navbar({ theme, toggleTheme }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [menuOpen, setMenuOpen] = useState(false);

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navLinks = [
    { to: "/projects", label: "Home",     icon: <Home size={18} /> },
    { to: "/about",    label: "About Us", icon: <Info size={18} /> },
    { to: "/guide",    label: "Guide",    icon: <BookOpen size={18} /> },
  ];

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 text-sm px-4 py-2.5 rounded-md transition-all duration-200 font-medium
    ${isActive
      ? "bg-indigo-50 text-indigo-600 border border-indigo-200"
      : "text-gray-600 hover:text-indigo-600 hover:bg-gray-100"
    }`;

  return (
    <>
      {/* ── Top Bar ── */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-14">

            {/* Logo */}
            <h1
              onClick={() => navigate("/projects")}
              className="font-bold text-xl cursor-pointer text-indigo-600 tracking-tight select-none uppercase"
            >
              Deskora
            </h1>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map(({ to, label, icon }) => (
                <NavLink key={to} to={to} className={linkClass}>
                  {icon} {label}
                </NavLink>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2">

              {/* User + Logout — Desktop only */}
              <div className="hidden md:flex items-center gap-2 pl-2 border-l border-gray-200">
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-md px-3 py-1.5">
                  <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center">
                    <User size={13} className="text-indigo-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {user?.name || "User"}
                  </span>
                </div>
                <button
                  onClick={() => { localStorage.clear(); navigate("/"); }}
                  className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-md border border-red-200 text-red-500 bg-red-50 hover:bg-red-100 hover:text-red-600 transition-all duration-200 font-medium cursor-pointer"
                >
                  <LogOut size={14} /> Logout
                </button>
              </div>

              {/* Hamburger — Mobile only */}
              <button
                onClick={() => setMenuOpen(prev=>!prev)}
                className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-all"
              >
                <Menu size={22} />
              </button>

            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile Drawer ── */}

      {/* Backdrop */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden
          ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* Drawer Panel */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-white shadow-2xl flex flex-col
          transition-transform duration-300 ease-in-out md:hidden
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h1 className="font-bold text-xl text-indigo-600 tracking-tight">Deskora</h1>
          <button
            onClick={() => setMenuOpen(false)}
            className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* User Info */}
        <div className="px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
              <User size={18} className="text-indigo-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">{user?.name || "User"}</p>
              <p className="text-xs text-gray-400">{user?.email || ""}</p>
            </div>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col gap-1 px-3 py-4 flex-1">
          {navLinks.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={linkClass}
              onClick={() => setMenuOpen(false)}
            >
              {icon} {label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom: Theme + Logout */}
        <div className="px-3 py-4 border-t border-gray-100 flex flex-col gap-2">
          <button
            onClick={() => { localStorage.clear(); navigate("/"); }}
            className="flex items-center gap-3 text-sm px-4 py-2.5 rounded-md border border-red-200 text-red-500 bg-red-50 hover:bg-red-100 transition-all font-medium cursor-pointer"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>

      </div>
    </>
  );
}