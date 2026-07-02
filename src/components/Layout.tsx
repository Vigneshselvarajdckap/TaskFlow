import { Link } from "react-router-dom";
import {
  FiGrid,
  FiFolder,
  FiCheckSquare,
  FiUsers,
  FiSettings,
  FiSearch,
  FiBell,
} from "react-icons/fi";

const Layout = ({ children }: any) => {
  const links = [
    { name: "Dashboard", path: "/", icon: <FiGrid /> },
    { name: "Projects", path: "/projects", icon: <FiFolder /> },
    { name: "Tasks", path: "/tasks", icon: <FiCheckSquare /> },
    { name: "Team", path: "/team", icon: <FiUsers /> },
    { name: "Settings", path: "/settings", icon: <FiSettings /> },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white flex">
      <aside className="w-72 bg-[#0f172a] border-r border-slate-800 p-6 hidden lg:block">
        <h1 className="text-3xl font-bold mb-10">TaskFlow</h1>

        <div className="space-y-3">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition"
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
        </div>
      </aside>

      <main className="flex-1">
        <nav className="h-20 bg-[#020617] border-b border-slate-800 px-6 flex items-center justify-between">
          <div className="relative w-full max-w-md">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search projects or tasks..."
              className="w-full bg-[#0f172a] border border-slate-800 rounded-xl py-3 pl-12 pr-4 outline-none"
            />
          </div>

          <div className="flex items-center gap-5">
            <FiBell size={24} />
            <div className="w-11 h-11 rounded-full bg-white text-black flex items-center justify-center font-bold">
              V
            </div>
          </div>
        </nav>

        <div className="p-6">{children}</div>
      </main>
    </div>
  );
};

export default Layout;