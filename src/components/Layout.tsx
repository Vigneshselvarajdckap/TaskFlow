import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  FiGrid,
  FiFolder,
  FiCheckSquare,
  FiUsers,
  FiSettings,
  FiSearch,
  FiBell,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { FiLogOut } from "react-icons/fi";

const Layout = ({ children }: any) => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const links = [
    { name: "Dashboard", path: "/", icon: <FiGrid /> },
    { name: "Projects", path: "/projects", icon: <FiFolder /> },
    { name: "Tasks", path: "/tasks", icon: <FiCheckSquare /> },
    { name: "Team", path: "/team", icon: <FiUsers /> },
    { name: "Settings", path: "/settings", icon: <FiSettings /> },
  ];

  const SidebarLinks = () => (
    <div className="space-y-3">
      {links.map((link) => {
        const active = location.pathname === link.path;

        return (
          <Link
            key={link.name}
            to={link.path}
            onClick={() => setMenuOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition ${active
                ? "bg-gradient-to-r from-[#8a5a13] to-[#f5c45e] text-black font-bold shadow-lg shadow-yellow-500/10"
                : "text-zinc-400 hover:bg-[#151515] hover:text-[#f5c45e]"
              }`}
          >
            {link.icon}
            {link.name}
          </Link>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#09090b] text-white flex">
      <aside className="w-72 bg-[#0c0c0f] border-r border-[#2f2412] p-6 hidden lg:flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-10 text-[#f5c45e]">
            TaskFlow
          </h1>

          <SidebarLinks />
        </div>

        <div className="bg-[#151515] border border-[#3a2a12] rounded-3xl p-5">
          <h3 className="text-[#f5c45e] font-bold mb-2">Premium Workspace</h3>
          <p className="text-zinc-400 text-sm">
            Manage projects with luxury productivity experience.
          </p>
        </div>
      </aside>

      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-screen w-80 max-w-[85%] bg-[#0c0c0f] border-r border-[#2f2412] p-6 z-[60] transition-transform duration-300 lg:hidden ${menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl font-bold text-[#f5c45e]">TaskFlow</h1>

          <button
            onClick={() => setMenuOpen(false)}
            className="w-10 h-10 bg-[#151515] border border-[#2f2412] rounded-xl flex items-center justify-center"
          >
            <FiX />
          </button>
        </div>

        <SidebarLinks />

        <div className="bg-[#151515] border border-[#3a2a12] rounded-3xl p-5 mt-10">
          <h3 className="text-[#f5c45e] font-bold mb-2">Premium Workspace</h3>
          <p className="text-zinc-400 text-sm">
            Manage projects with luxury productivity experience.
          </p>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        <nav className="h-20 bg-[#09090b]/95 backdrop-blur-xl border-b border-[#2f2412] px-4 md:px-6 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-5">
            <button
              onClick={() => setMenuOpen(true)}
              className="lg:hidden text-[#f5c45e]"
            >
              <FiMenu size={26} />
            </button>

            <h2 className="text-lg md:text-xl font-bold">Dashboard</h2>
          </div>

          <div className="hidden md:block relative w-full max-w-md">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />

            <input
              type="text"
              placeholder="Search anything..."
              className="w-full bg-[#111113] border border-[#2f2412] rounded-2xl py-3 pl-12 pr-4 outline-none focus:border-[#f5c45e] transition"
            />
          </div>

          <div className="flex items-center gap-5">
            <div className="relative">
              <FiBell size={24} className="text-[#f5c45e]" />
              <span className="absolute -top-2 -right-2 bg-[#f5c45e] text-black text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                3
              </span>
            </div>

            <div className="hidden sm:block text-right">
              <p className="text-sm font-bold">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-zinc-400">
                {user?.email}
              </p>
            </div>

            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#8a5a13] to-[#f5c45e] text-black flex items-center justify-center font-bold">
              {(user?.name || user?.email || "U").charAt(0).toUpperCase()}
            </div>

            <button
              onClick={logout}
              className="w-11 h-11 bg-[#111113] border border-[#2f2412] rounded-full flex items-center justify-center hover:border-[#f5c45e] transition"
            >
              <FiLogOut className="text-[#f5c45e]" />
            </button>
          </div>
        </nav>

        <div className="p-4 md:p-6">{children}</div>
      </main>
    </div>
  );
};

export default Layout;