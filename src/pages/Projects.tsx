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

    setFormData({
      title: "",
      status: "Planning",
      dueDate: "",
      members: "",
    });

    setOpenModal(false);
    toast.success("Project created successfully");
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">
        <div>
          <p className="text-slate-400 uppercase tracking-[4px]">Projects</p>
          <h1 className="text-5xl font-bold mt-3">Manage Projects</h1>
          <p className="text-slate-400 mt-3">
            Track all active and completed projects.
          </p>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="bg-white text-black px-6 py-4 rounded-2xl font-bold flex items-center gap-2"
        >
          <FiPlus />
          New Project
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.title}
            className="bg-[#0f172a] border border-slate-800 rounded-3xl p-6 hover:border-slate-600 transition"
          >
            <span className="text-xs bg-white text-black px-3 py-1 rounded-full font-semibold">
              {project.status}
            </span>

            <h2 className="text-2xl font-bold mt-5">{project.title}</h2>

            <div className="mt-6 space-y-3 text-slate-400">
              <p className="flex items-center gap-2">
                <FiCalendar />
                {project.dueDate}
              </p>

              <p className="flex items-center gap-2">
                <FiUsers />
                {project.members} Members
              </p>
            </div>
          </div>
        ))}
      </div>

      {openModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-6">
          <div className="bg-[#0f172a] border border-slate-800 rounded-3xl p-8 w-full max-w-lg">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Create Project</h2>

              <button
                onClick={() => setOpenModal(false)}
                className="w-10 h-10 bg-[#020617] rounded-xl flex items-center justify-center"
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
                className="w-full bg-[#020617] border border-slate-700 p-4 rounded-xl outline-none focus:border-white"
              />

              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="w-full bg-[#020617] border border-slate-700 p-4 rounded-xl outline-none focus:border-white"
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
                className="w-full bg-[#020617] border border-slate-700 p-4 rounded-xl outline-none focus:border-white"
              />

              <input
                type="number"
                placeholder="Team Members"
                value={formData.members}
                onChange={(e) =>
                  setFormData({ ...formData, members: e.target.value })
                }
                className="w-full bg-[#020617] border border-slate-700 p-4 rounded-xl outline-none focus:border-white"
              />

              <button
                onClick={addProject}
                className="w-full bg-white text-black py-4 rounded-xl font-bold hover:bg-slate-200 transition"
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