import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import {
  FiPlus,
  FiCalendar,
  FiUsers,
  FiX,
  FiSearch,
  FiFilter,
  FiEdit,
  FiTrash2,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { useTheme } from "../context/ThemeContext";

type Project = {
  id: number;
  title: string;
  status: "Planning" | "In Progress" | "Completed";
  dueDate: string;
  members: number;
};

const defaultProjects: Project[] = [
  {
    id: 1,
    title: "Website Redesign",
    status: "In Progress",
    dueDate: "2026-07-12",
    members: 4,
  },
  {
    id: 2,
    title: "Mobile App UI",
    status: "Planning",
    dueDate: "2026-07-20",
    members: 3,
  },
  {
    id: 3,
    title: "Marketing Dashboard",
    status: "Completed",
    dueDate: "2026-07-02",
    members: 5,
  },
];

const Projects = () => {
  const { theme, themeName } = useTheme();

  const [openModal, setOpenModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<Project["status"] | "All">(
    "All"
  );

  const [projects, setProjects] = useState<Project[]>(() => {
    const savedProjects = localStorage.getItem("taskflow_projects");
    return savedProjects ? JSON.parse(savedProjects) : defaultProjects;
  });

  const [formData, setFormData] = useState({
    title: "",
    status: "Planning" as Project["status"],
    dueDate: "",
    members: "",
  });

  useEffect(() => {
    localStorage.setItem("taskflow_projects", JSON.stringify(projects));
  }, [projects]);

  const getStatusStyle = (status: Project["status"]) => {
    if (status === "Planning") {
      return `bg-gradient-to-r ${theme.gradient} ${theme.accentText}`;
    }

    if (status === "In Progress") {
      if (themeName === "emerald") {
        return "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30";
      }
      if (themeName === "royal") {
        return "bg-purple-500/15 text-purple-300 border border-purple-500/30";
      }
      if (themeName === "silver") {
        return "bg-zinc-500/15 text-zinc-200 border border-zinc-500/30";
      }
      return "bg-blue-500/15 text-blue-300 border border-blue-500/30";
    }

    if (themeName === "emerald") {
      return "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30";
    }
    if (themeName === "royal") {
      return "bg-violet-500/15 text-violet-300 border border-violet-500/30";
    }
    if (themeName === "silver") {
      return "bg-zinc-400/15 text-zinc-200 border border-zinc-400/30";
    }

    return "bg-green-500/15 text-green-300 border border-green-500/30";
  };

  const filteredProjects = projects.filter((project) => {
    const searchMatch = project.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const statusMatch =
      statusFilter === "All" || project.status === statusFilter;

    return searchMatch && statusMatch;
  });

  const resetForm = () => {
    setFormData({
      title: "",
      status: "Planning",
      dueDate: "",
      members: "",
    });
    setEditId(null);
  };

  const openCreateModal = () => {
    resetForm();
    setOpenModal(true);
  };

  const addProject = () => {
    if (!formData.title || !formData.dueDate || !formData.members) {
      toast.error("Please fill all fields");
      return;
    }

    const newProject: Project = {
      id: Date.now(),
      title: formData.title,
      status: formData.status,
      dueDate: formData.dueDate,
      members: Number(formData.members),
    };

    setProjects((prev) => [newProject, ...prev]);
    resetForm();
    setOpenModal(false);
    toast.success("Project created");
  };

  const startEdit = (project: Project) => {
    setEditId(project.id);
    setFormData({
      title: project.title,
      status: project.status,
      dueDate: project.dueDate,
      members: String(project.members),
    });
    setOpenModal(true);
  };

  const updateProject = () => {
    if (!editId) return;

    if (!formData.title || !formData.dueDate || !formData.members) {
      toast.error("Please fill all fields");
      return;
    }

    setProjects((prev) =>
      prev.map((project) =>
        project.id === editId
          ? {
              ...project,
              title: formData.title,
              status: formData.status,
              dueDate: formData.dueDate,
              members: Number(formData.members),
            }
          : project
      )
    );

    resetForm();
    setOpenModal(false);
    toast.success("Project updated");
  };

  const deleteProject = (id: number) => {
    setProjects((prev) => prev.filter((project) => project.id !== id));
    toast.success("Project deleted");
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("All");
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
        <div>
          <p className={`${theme.accent} uppercase tracking-[5px] text-sm`}>
            Premium Projects
          </p>

          <h1 className="text-5xl font-bold mt-3">Manage Projects</h1>

          <p className={`${theme.muted} mt-3`}>
            Create, edit, filter and track your workspace projects.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className={`bg-gradient-to-r ${theme.gradient} ${theme.accentText} px-6 py-4 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition`}
        >
          <FiPlus />
          New Project
        </button>
      </div>

      <div
        className={`${theme.card} border ${theme.border} rounded-3xl p-5 mb-8 shadow-xl shadow-black/20`}
      >
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="relative lg:col-span-2">
            <FiSearch
              className={`absolute left-4 top-1/2 -translate-y-1/2 ${theme.muted}`}
            />

            <input
              type="text"
              placeholder="Search project..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full ${theme.inner} border ${theme.border} pl-12 p-4 rounded-2xl outline-none`}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as Project["status"] | "All")
            }
            className={`${theme.inner} border ${theme.border} p-4 rounded-2xl outline-none`}
          >
            <option value="All">All Status</option>
            <option value="Planning">Planning</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className={`flex items-center justify-between mt-5 text-sm ${theme.muted}`}>
          <p className="flex items-center gap-2">
            <FiFilter className={theme.accent} />
            Showing {filteredProjects.length} of {projects.length} projects
          </p>

          <button onClick={clearFilters} className={theme.accent}>
            Clear Filters
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className={`${theme.card} border ${theme.border} rounded-3xl p-6 shadow-xl shadow-black/20`}
          >
            <span
              className={`text-xs px-3 py-1 rounded-full font-semibold ${getStatusStyle(
                project.status
              )}`}
            >
              {project.status}
            </span>

            <h2 className="text-2xl font-bold mt-5">{project.title}</h2>

            <div className={`mt-6 space-y-3 ${theme.muted}`}>
              <p className="flex items-center gap-2">
                <FiCalendar className={theme.accent} />
                {project.dueDate}
              </p>

              <p className="flex items-center gap-2">
                <FiUsers className={theme.accent} />
                {project.members} Members
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <button
                onClick={() => startEdit(project)}
                className={`bg-gradient-to-r ${theme.gradient} ${theme.accentText} py-3 rounded-xl font-bold flex items-center justify-center gap-2`}
              >
                <FiEdit />
                Edit
              </button>

              <button
                onClick={() => deleteProject(project.id)}
                className="bg-red-500/10 border border-red-500/40 text-red-400 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-500 hover:text-white transition"
              >
                <FiTrash2 />
                Delete
              </button>
            </div>
          </div>
        ))}

        {filteredProjects.length === 0 && (
          <div
            className={`md:col-span-3 border border-dashed ${theme.border} rounded-3xl p-10 text-center ${theme.muted}`}
          >
            No projects found
          </div>
        )}
      </div>

      {openModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 px-6">
          <div
            className={`${theme.card} border ${theme.border} rounded-3xl p-8 w-full max-w-lg shadow-2xl shadow-black`}
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">
                {editId ? "Edit Project" : "Create Project"}
              </h2>

              <button
                onClick={() => {
                  setOpenModal(false);
                  resetForm();
                }}
                className={`w-10 h-10 ${theme.inner} border ${theme.border} rounded-xl flex items-center justify-center`}
              >
                <FiX />
              </button>
            </div>

            <div className="space-y-5">
              <input
                type="text"
                placeholder="Project Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className={`w-full ${theme.inner} border ${theme.border} p-4 rounded-2xl outline-none`}
              />

              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as Project["status"],
                  })
                }
                className={`w-full ${theme.inner} border ${theme.border} p-4 rounded-2xl outline-none`}
              >
                <option>Planning</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>

              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) =>
                  setFormData({ ...formData, dueDate: e.target.value })
                }
                className={`w-full ${theme.inner} border ${theme.border} p-4 rounded-2xl outline-none`}
              />

              <input
                type="number"
                placeholder="Team Members"
                value={formData.members}
                onChange={(e) =>
                  setFormData({ ...formData, members: e.target.value })
                }
                className={`w-full ${theme.inner} border ${theme.border} p-4 rounded-2xl outline-none`}
              />

              <button
                onClick={editId ? updateProject : addProject}
                className={`w-full bg-gradient-to-r ${theme.gradient} ${theme.accentText} py-4 rounded-2xl font-bold hover:scale-[1.02] transition`}
              >
                {editId ? "Update Project" : "Create Project"}
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Projects;