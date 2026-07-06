import Layout from "../components/Layout";
import { useState } from "react";
import { FiPlus, FiCalendar, FiUsers, FiX } from "react-icons/fi";
import toast from "react-hot-toast";

type Project = {
  title: string;
  status: string;
  dueDate: string;
  members: number;
};

const Projects = () => {
  const [openModal, setOpenModal] = useState(false);

  const [projects, setProjects] = useState<Project[]>([
    {
      title: "Website Redesign",
      status: "In Progress",
      dueDate: "12 July 2026",
      members: 4,
    },
    {
      title: "Mobile App UI",
      status: "Planning",
      dueDate: "20 July 2026",
      members: 3,
    },
    {
      title: "Marketing Dashboard",
      status: "Completed",
      dueDate: "02 July 2026",
      members: 5,
    },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    status: "Planning",
    dueDate: "",
    members: "",
  });

  const statusStyle: Record<string, string> = {
    Planning: "bg-[#f5c45e]/10 text-[#f5c45e] border border-[#f5c45e]/30",
    "In Progress": "bg-blue-500/10 text-blue-400 border border-blue-500/30",
    Completed: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30",
  };

  const resetForm = () => {
    setFormData({
      title: "",
      status: "Planning",
      dueDate: "",
      members: "",
    });
  };

  const addProject = () => {
    if (!formData.title || !formData.dueDate || !formData.members) {
      toast.error("Please fill all fields");
      return;
    }

    const newProject = {
      title: formData.title,
      status: formData.status,
      dueDate: formData.dueDate,
      members: Number(formData.members),
    };

    setProjects([newProject, ...projects]);
    resetForm();
    setOpenModal(false);
    toast.success("Project created successfully");
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">
        <div>
          <p className="text-[#f5c45e] uppercase tracking-[5px] text-sm">
            Luxury Projects
          </p>

          <h1 className="text-5xl font-bold mt-3">Manage Projects</h1>

          <p className="text-zinc-400 mt-3">
            Track active, planned and completed projects in style.
          </p>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="bg-gradient-to-r from-[#8a5a13] to-[#f5c45e] text-black px-6 py-4 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition shadow-lg shadow-yellow-500/10"
        >
          <FiPlus />
          New Project
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.title}
            className="bg-gradient-to-br from-[#151515] to-[#0b0b0d] border border-[#2f2412] rounded-3xl p-6 hover:border-[#f5c45e]/70 transition shadow-xl shadow-black/30"
          >
            <span
              className={`text-xs px-3 py-1 rounded-full font-semibold ${
                statusStyle[project.status]
              }`}
            >
              {project.status}
            </span>

            <h2 className="text-2xl font-bold mt-5">{project.title}</h2>

            <div className="mt-6 space-y-3 text-zinc-400">
              <p className="flex items-center gap-2">
                <FiCalendar className="text-[#f5c45e]" />
                {project.dueDate}
              </p>

              <p className="flex items-center gap-2">
                <FiUsers className="text-[#f5c45e]" />
                {project.members} Members
              </p>
            </div>
          </div>
        ))}
      </div>

      {openModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 px-6">
          <div className="bg-[#111113] border border-[#2f2412] rounded-3xl p-8 w-full max-w-lg shadow-2xl shadow-black">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Create Project</h2>

              <button
                onClick={() => {
                  setOpenModal(false);
                  resetForm();
                }}
                className="w-10 h-10 bg-[#09090b] border border-[#2f2412] rounded-xl flex items-center justify-center hover:border-[#f5c45e] transition"
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
                className="w-full bg-[#09090b] border border-[#2f2412] p-4 rounded-2xl outline-none focus:border-[#f5c45e] transition"
              />

              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="w-full bg-[#09090b] border border-[#2f2412] p-4 rounded-2xl outline-none focus:border-[#f5c45e] transition"
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
                className="w-full bg-[#09090b] border border-[#2f2412] p-4 rounded-2xl outline-none focus:border-[#f5c45e] transition"
              />

              <input
                type="number"
                placeholder="Team Members"
                value={formData.members}
                onChange={(e) =>
                  setFormData({ ...formData, members: e.target.value })
                }
                className="w-full bg-[#09090b] border border-[#2f2412] p-4 rounded-2xl outline-none focus:border-[#f5c45e] transition"
              />

              <button
                onClick={addProject}
                className="w-full bg-gradient-to-r from-[#8a5a13] to-[#f5c45e] text-black py-4 rounded-2xl font-bold hover:scale-[1.02] transition"
              >
                Create Project
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Projects;