import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import {
  FiPlus,
  FiClock,
  FiFlag,
  FiX,
  FiEdit,
  FiTrash2,
  FiUser,
  FiCalendar,
  FiSearch,
  FiFilter,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { useTheme } from "../context/ThemeContext";

type Status = "Todo" | "In Progress" | "Completed";
type Priority = "Low" | "Medium" | "High";

type Task = {
  id: number;
  title: string;
  project: string;
  priority: Priority;
  status: Status;
  dueDate: string;
  assignee: string;
};

const defaultTasks: Task[] = [
  {
    id: 1,
    title: "Design landing page",
    project: "Website Redesign",
    priority: "High",
    status: "Todo",
    dueDate: "2026-07-10",
    assignee: "Vignesh",
  },
  {
    id: 2,
    title: "Create mobile wireframe",
    project: "Mobile App UI",
    priority: "Medium",
    status: "In Progress",
    dueDate: "2026-07-12",
    assignee: "Pugal",
  },
  {
    id: 3,
    title: "Setup analytics chart",
    project: "Marketing Dashboard",
    priority: "Low",
    status: "Completed",
    dueDate: "2026-07-15",
    assignee: "Vignesh",
  },
];

const Tasks = () => {
  const { theme, themeName } = useTheme();

  const [openModal, setOpenModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<Priority | "All">("All");
  const [statusFilter, setStatusFilter] = useState<Status | "All">("All");

  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("taskflow_tasks");
    return savedTasks ? JSON.parse(savedTasks) : defaultTasks;
  });

  const [formData, setFormData] = useState({
    title: "",
    project: "",
    priority: "Medium" as Priority,
    status: "Todo" as Status,
    dueDate: "",
    assignee: "",
  });

  useEffect(() => {
    localStorage.setItem("taskflow_tasks", JSON.stringify(tasks));
  }, [tasks]);

  const getPriorityStyle = (priority: Priority) => {
    if (priority === "Low") {
      if (themeName === "emerald")
        return "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30";
      if (themeName === "royal")
        return "bg-violet-500/15 text-violet-300 border border-violet-500/30";
      if (themeName === "silver")
        return "bg-zinc-500/15 text-zinc-200 border border-zinc-500/30";
      return "bg-green-500/15 text-green-300 border border-green-500/30";
    }

    if (priority === "Medium") {
      return `bg-gradient-to-r ${theme.gradient} ${theme.accentText}`;
    }

    return "bg-red-500/15 text-red-300 border border-red-500/30";
  };

  const getStatusStyle = (status: Status) => {
    if (status === "Todo") {
      return `bg-gradient-to-r ${theme.gradient} ${theme.accentText}`;
    }

    if (status === "In Progress") {
      if (themeName === "emerald")
        return "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30";
      if (themeName === "royal")
        return "bg-purple-500/15 text-purple-300 border border-purple-500/30";
      if (themeName === "silver")
        return "bg-zinc-500/15 text-zinc-200 border border-zinc-500/30";
      return "bg-blue-500/15 text-blue-300 border border-blue-500/30";
    }

    if (themeName === "emerald")
      return "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30";
    if (themeName === "royal")
      return "bg-violet-500/15 text-violet-300 border border-violet-500/30";
    if (themeName === "silver")
      return "bg-zinc-400/15 text-zinc-200 border border-zinc-400/30";

    return "bg-green-500/15 text-green-300 border border-green-500/30";
  };

  const filteredTasks = tasks.filter((task) => {
    const searchMatch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.assignee.toLowerCase().includes(searchTerm.toLowerCase());

    const priorityMatch =
      priorityFilter === "All" || task.priority === priorityFilter;

    const statusMatch = statusFilter === "All" || task.status === statusFilter;

    return searchMatch && priorityMatch && statusMatch;
  });

  const resetForm = () => {
    setFormData({
      title: "",
      project: "",
      priority: "Medium",
      status: "Todo",
      dueDate: "",
      assignee: "",
    });
    setEditId(null);
  };

  const openCreateModal = () => {
    resetForm();
    setOpenModal(true);
  };

  const addTask = () => {
    if (
      !formData.title ||
      !formData.project ||
      !formData.dueDate ||
      !formData.assignee
    ) {
      toast.error("Please fill all fields");
      return;
    }

    const newTask: Task = {
      id: Date.now(),
      title: formData.title,
      project: formData.project,
      priority: formData.priority,
      status: formData.status,
      dueDate: formData.dueDate,
      assignee: formData.assignee,
    };

    setTasks((prev) => [newTask, ...prev]);
    resetForm();
    setOpenModal(false);
    toast.success("Task created");
  };

  const startEdit = (task: Task) => {
    setEditId(task.id);
    setFormData({
      title: task.title,
      project: task.project,
      priority: task.priority,
      status: task.status,
      dueDate: task.dueDate,
      assignee: task.assignee,
    });
    setOpenModal(true);
  };

  const updateTask = () => {
    if (!editId) return;

    if (
      !formData.title ||
      !formData.project ||
      !formData.dueDate ||
      !formData.assignee
    ) {
      toast.error("Please fill all fields");
      return;
    }

    setTasks((prev) =>
      prev.map((task) =>
        task.id === editId
          ? {
              ...task,
              title: formData.title,
              project: formData.project,
              priority: formData.priority,
              status: formData.status,
              dueDate: formData.dueDate,
              assignee: formData.assignee,
            }
          : task
      )
    );

    resetForm();
    setOpenModal(false);
    toast.success("Task updated");
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    toast.success("Task deleted");
  };

  const updateStatus = (id: number, status: Status) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, status } : task))
    );
    toast.success("Status updated");
  };

  const clearFilters = () => {
    setSearchTerm("");
    setPriorityFilter("All");
    setStatusFilter("All");
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
        <div>
          <p className={`${theme.accent} uppercase tracking-[5px] text-sm`}>
            Premium Tasks
          </p>
          <h1 className="text-5xl font-bold mt-3">Manage Tasks</h1>
          <p className={`${theme.muted} mt-3`}>
            Create, edit, filter and track your workspace tasks.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className={`bg-gradient-to-r ${theme.gradient} ${theme.accentText} px-6 py-4 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition`}
        >
          <FiPlus />
          New Task
        </button>
      </div>

      <div
        className={`${theme.card} border ${theme.border} rounded-3xl p-5 mb-8 shadow-xl shadow-black/20`}
      >
        <div className="grid lg:grid-cols-4 gap-4">
          <div className="relative lg:col-span-2">
            <FiSearch
              className={`absolute left-4 top-1/2 -translate-y-1/2 ${theme.muted}`}
            />
            <input
              type="text"
              placeholder="Search by task, project or assignee..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full ${theme.inner} border ${theme.border} pl-12 p-4 rounded-2xl outline-none`}
            />
          </div>

          <select
            value={priorityFilter}
            onChange={(e) =>
              setPriorityFilter(e.target.value as Priority | "All")
            }
            className={`${theme.inner} border ${theme.border} p-4 rounded-2xl outline-none`}
          >
            <option value="All">All Priorities</option>
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as Status | "All")}
            className={`${theme.inner} border ${theme.border} p-4 rounded-2xl outline-none`}
          >
            <option value="All">All Status</option>
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className={`flex items-center justify-between mt-5 text-sm ${theme.muted}`}>
          <p className="flex items-center gap-2">
            <FiFilter className={theme.accent} />
            Showing {filteredTasks.length} of {tasks.length} tasks
          </p>

          <button onClick={clearFilters} className={theme.accent}>
            Clear Filters
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className={`${theme.card} border ${theme.border} rounded-3xl p-6 shadow-xl shadow-black/20`}
          >
            <div className="flex items-center justify-between mb-5">
              <span
                className={`text-xs px-3 py-1 rounded-full font-semibold ${getPriorityStyle(
                  task.priority
                )}`}
              >
                {task.priority}
              </span>

              <FiFlag className={theme.accent} />
            </div>

            <h2 className="text-2xl font-bold">{task.title}</h2>
            <p className={`${theme.muted} mt-2`}>{task.project}</p>

            <div className={`mt-5 space-y-3 text-sm ${theme.muted}`}>
              <p className="flex items-center gap-2">
                <FiCalendar className={theme.accent} />
                Due: {task.dueDate}
              </p>

              <p className="flex items-center gap-2">
                <FiUser className={theme.accent} />
                Assignee: {task.assignee}
              </p>

              <p className="flex items-center gap-2 flex-wrap">
                <FiClock className={theme.accent} />
                Status:
                <span
                  className={`text-xs px-3 py-1 rounded-full font-semibold ${getStatusStyle(
                    task.status
                  )}`}
                >
                  {task.status}
                </span>
              </p>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-2">
              <button
                onClick={() => updateStatus(task.id, "Todo")}
                className={`${theme.inner} border ${theme.border} py-2 rounded-xl text-xs hover:opacity-80 transition`}
              >
                Todo
              </button>

              <button
                onClick={() => updateStatus(task.id, "In Progress")}
                className={`${theme.inner} border ${theme.border} py-2 rounded-xl text-xs hover:opacity-80 transition`}
              >
                Progress
              </button>

              <button
                onClick={() => updateStatus(task.id, "Completed")}
                className={`${theme.inner} border ${theme.border} py-2 rounded-xl text-xs hover:opacity-80 transition`}
              >
                Done
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-5">
              <button
                onClick={() => startEdit(task)}
                className={`bg-gradient-to-r ${theme.gradient} ${theme.accentText} py-3 rounded-xl font-bold flex items-center justify-center gap-2`}
              >
                <FiEdit />
                Edit
              </button>

              <button
                onClick={() => deleteTask(task.id)}
                className="bg-red-500/10 border border-red-500/40 text-red-400 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-500 hover:text-white transition"
              >
                <FiTrash2 />
                Delete
              </button>
            </div>
          </div>
        ))}

        {filteredTasks.length === 0 && (
          <div
            className={`md:col-span-2 xl:col-span-3 border border-dashed ${theme.border} rounded-3xl p-10 text-center ${theme.muted}`}
          >
            No tasks found
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
                {editId ? "Edit Task" : "Create Task"}
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
                placeholder="Task Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className={`w-full ${theme.inner} border ${theme.border} p-4 rounded-2xl outline-none`}
              />

              <input
                type="text"
                placeholder="Project Name"
                value={formData.project}
                onChange={(e) =>
                  setFormData({ ...formData, project: e.target.value })
                }
                className={`w-full ${theme.inner} border ${theme.border} p-4 rounded-2xl outline-none`}
              />

              <input
                type="text"
                placeholder="Assignee Name"
                value={formData.assignee}
                onChange={(e) =>
                  setFormData({ ...formData, assignee: e.target.value })
                }
                className={`w-full ${theme.inner} border ${theme.border} p-4 rounded-2xl outline-none`}
              />

              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) =>
                  setFormData({ ...formData, dueDate: e.target.value })
                }
                className={`w-full ${theme.inner} border ${theme.border} p-4 rounded-2xl outline-none`}
              />

              <select
                value={formData.priority}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    priority: e.target.value as Priority,
                  })
                }
                className={`w-full ${theme.inner} border ${theme.border} p-4 rounded-2xl outline-none`}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>

              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as Status,
                  })
                }
                className={`w-full ${theme.inner} border ${theme.border} p-4 rounded-2xl outline-none`}
              >
                <option>Todo</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>

              <button
                onClick={editId ? updateTask : addTask}
                className={`w-full bg-gradient-to-r ${theme.gradient} ${theme.accentText} py-4 rounded-2xl font-bold hover:scale-[1.02] transition`}
              >
                {editId ? "Update Task" : "Create Task"}
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Tasks;