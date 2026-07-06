import { Link, useLocation, useNavigate } from "react-router-dom";
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
  FiLogOut,
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const Layout = ({ children }: any) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Dashboard", path: "/", icon: <FiGrid /> },
    { name: "Projects", path: "/projects", icon: <FiFolder /> },
    { name: "Tasks", path: "/tasks", icon: <FiCheckSquare /> },
    { name: "Team", path: "/team", icon: <FiUsers /> },
    { name: "Settings", path: "/settings", icon: <FiSettings /> },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const SidebarLinks = () => (
    <div className="space-y-3">
      {links.map((link) => {
        const active = location.pathname === link.path;

        return (
          <Link
            key={link.name}
            to={link.path}
            onClick={() => setMenuOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition ${
              active
                ? `bg-gradient-to-r ${theme.gradient} ${theme.accentText} font-bold`
                : `${theme.muted} hover:${theme.inner} hover:${theme.accent}`
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
    <div className={`h-screen ${theme.bg} ${theme.text} flex overflow-hidden`}>
      <aside
        className={`w-72 h-screen ${theme.sidebar} border-r ${theme.border} p-6 hidden lg:flex flex-col justify-between shrink-0`}
      >
        <div>
          <h1 className={`text-3xl font-bold mb-10 ${theme.accent}`}>
            TaskFlow
          </h1>

          <SidebarLinks />
        </div>

        <div className={`${theme.inner} border ${theme.border} rounded-3xl p-5`}>
          <h3 className={`${theme.accent} font-bold mb-2`}>
            Premium Workspace
          </h3>
          <p className={`${theme.muted} text-sm`}>
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
        className={`fixed top-0 left-0 h-screen w-80 max-w-[85%] ${theme.sidebar} border-r ${theme.border} p-6 z-[60] transition-transform duration-300 lg:hidden ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between mb-10">
          <h1 className={`text-3xl font-bold ${theme.accent}`}>TaskFlow</h1>

          <button
            onClick={() => setMenuOpen(false)}
            className={`${theme.inner} border ${theme.border} w-10 h-10 rounded-xl flex items-center justify-center`}
          >
            <FiX />
          </button>
        </div>

        <SidebarLinks />
      </aside>

      <main className="flex-1 min-w-0 h-screen flex flex-col overflow-hidden">
        <nav
          className={`h-20 ${theme.bg}/95 backdrop-blur-xl border-b ${theme.border} px-4 md:px-6 flex items-center justify-between shrink-0`}
        >
          <div className="flex items-center gap-5">
            <button
              onClick={() => setMenuOpen(true)}
              className={`lg:hidden ${theme.accent}`}
            >
              <FiMenu size={26} />
            </button>

            <h2 className="text-lg md:text-xl font-bold">
              {links.find((link) => link.path === location.pathname)?.name ||
                "TaskFlow"}
            </h2>
          </div>

          <div className="hidden md:block relative w-full max-w-md">
            <FiSearch className={`absolute left-4 top-1/2 -translate-y-1/2 ${theme.muted}`} />

            <input
              type="text"
              placeholder="Search anything..."
              className={`w-full ${theme.card} border ${theme.border} rounded-2xl py-3 pl-12 pr-4 outline-none`}
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <FiBell size={24} className={theme.accent} />
              <span
                className={`absolute -top-2 -right-2 bg-gradient-to-r ${theme.gradient} ${theme.accentText} text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold`}
              >
                3
              </span>
            </div>

            <div className="hidden sm:block text-right">
              <p className="text-sm font-bold">{user?.name || "User"}</p>
              <p className={`text-xs ${theme.muted} max-w-[160px] truncate`}>
                {user?.email}
              </p>
            </div>

            <div
              className={`w-11 h-11 rounded-full bg-gradient-to-br ${theme.gradient} ${theme.accentText} flex items-center justify-center font-bold`}
            >
              {(user?.name || user?.email || "U").charAt(0).toUpperCase()}
            </div>

            <button
              onClick={handleLogout}
              className={`${theme.card} border ${theme.border} w-11 h-11 rounded-full flex items-center justify-center`}
            >
              <FiLogOut className={theme.accent} />
            </button>
          </div>
        </nav>

        <div className="flex-1 overflow-y-auto p-4 md:p-6">{children}</div>
      </main>
    </div>
  );
};

export default Layout;