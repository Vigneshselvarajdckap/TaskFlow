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
  const [openModal, setOpenModal] = useState(false);
  const [draggedTaskId, setDraggedTaskId] = useState<number | null>(null);
  const [editId, setEditId] = useState<number | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<Priority | "All">("All");
  const [statusFilter, setStatusFilter] = useState<Status | "All">("All");

  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("taskflow_tasks");
    return savedTasks ? JSON.parse(savedTasks) : defaultTasks;
  });

  useEffect(() => {
    localStorage.setItem("taskflow_tasks", JSON.stringify(tasks));
  }, [tasks]);

  const [formData, setFormData] = useState({
    title: "",
    project: "",
    priority: "Medium" as Priority,
    status: "Todo" as Status,
    dueDate: "",
    assignee: "",
  });

  const columns: Status[] = ["Todo", "In Progress", "Completed"];

  const priorityStyle = {
    Low: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30",
    Medium: "bg-[#f5c45e]/10 text-[#f5c45e] border border-[#f5c45e]/30",
    High: "bg-red-500/10 text-red-400 border border-red-500/30",
  };

  const columnStyle = {
    Todo: "border-[#2f2412]",
    "In Progress": "border-[#5c3d0f]",
    Completed: "border-[#3f3218]",
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

  const handleDrop = (status: Status) => {
    if (!draggedTaskId) return;

    setTasks((prev) =>
      prev.map((task) =>
        task.id === draggedTaskId ? { ...task, status } : task
      )
    );

    setDraggedTaskId(null);
    toast.success("Task moved");
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
          <p className="text-[#f5c45e] uppercase tracking-[5px] text-sm">
            Luxury Workflow
          </p>
          <h1 className="text-5xl font-bold mt-3">Kanban Board</h1>
          <p className="text-zinc-400 mt-3">
            Manage tasks with a premium drag & drop experience.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="bg-gradient-to-r from-[#8a5a13] to-[#f5c45e] text-black px-6 py-4 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition shadow-lg shadow-yellow-500/10"
        >
          <FiPlus />
          New Task
        </button>
      </div>

      <div className="bg-[#111113] border border-[#2f2412] rounded-3xl p-5 mb-8 shadow-xl shadow-black/30">
        <div className="grid lg:grid-cols-4 gap-4">
          <div className="relative lg:col-span-2">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Search by task, project or assignee..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#09090b] border border-[#2f2412] pl-12 p-4 rounded-2xl outline-none focus:border-[#f5c45e] transition"
            />
          </div>

          <select
            value={priorityFilter}
            onChange={(e) =>
              setPriorityFilter(e.target.value as Priority | "All")
            }
            className="bg-[#09090b] border border-[#2f2412] p-4 rounded-2xl outline-none focus:border-[#f5c45e] transition"
          >
            <option value="All">All Priorities</option>
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as Status | "All")}
            className="bg-[#09090b] border border-[#2f2412] p-4 rounded-2xl outline-none focus:border-[#f5c45e] transition"
          >
            <option value="All">All Status</option>
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="flex items-center justify-between mt-5 text-sm text-zinc-400">
          <p className="flex items-center gap-2">
            <FiFilter className="text-[#f5c45e]" />
            Showing {filteredTasks.length} of {tasks.length} tasks
          </p>

          <button onClick={clearFilters} className="hover:text-[#f5c45e]">
            Clear Filters
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {columns.map((column) => (
          <div
            key={column}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(column)}
            className={`bg-[#111113] border ${
              columnStyle[column]
            } rounded-3xl p-5 min-h-[500px] shadow-xl shadow-black/30`}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">{column}</h2>

              <span className="bg-[#09090b] border border-[#2f2412] text-[#f5c45e] px-3 py-1 rounded-full text-sm font-bold">
                {filteredTasks.filter((task) => task.status === column).length}
              </span>
            </div>

            <div className="space-y-4">
              {filteredTasks
                .filter((task) => task.status === column)
                .map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={() => setDraggedTaskId(task.id)}
                    className="bg-gradient-to-br from-[#151515] to-[#0b0b0d] border border-[#2f2412] rounded-2xl p-5 hover:border-[#f5c45e]/70 transition cursor-grab active:cursor-grabbing"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-semibold ${
                          priorityStyle[task.priority]
                        }`}
                      >
                        {task.priority}
                      </span>

                      <FiFlag className="text-[#f5c45e]" />
                    </div>

                    <h3 className="text-xl font-bold">{task.title}</h3>
                    <p className="text-zinc-400 mt-2">{task.project}</p>

                    <div className="mt-5 space-y-2 text-sm text-zinc-400">
                      <p className="flex items-center gap-2">
                        <FiCalendar className="text-[#f5c45e]" />
                        Due: {task.dueDate}
                      </p>

                      <p className="flex items-center gap-2">
                        <FiUser className="text-[#f5c45e]" />
                        Assignee: {task.assignee}
                      </p>

                      <p className="flex items-center gap-2">
                        <FiClock className="text-[#f5c45e]" />
                        Status: {task.status}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-5">
                      <button
                        onClick={() => startEdit(task)}
                        className="bg-[#f5c45e] text-black py-2 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#ffd978] transition"
                      >
                        <FiEdit />
                        Edit
                      </button>

                      <button
                        onClick={() => deleteTask(task.id)}
                        className="bg-red-500/10 border border-red-500/40 text-red-400 py-2 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-500 hover:text-white transition"
                      >
                        <FiTrash2 />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}

              {filteredTasks.filter((task) => task.status === column).length ===
                0 && (
                <div className="border border-dashed border-[#2f2412] rounded-2xl p-6 text-center text-zinc-500">
                  No tasks found
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {openModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 px-6">
          <div className="bg-[#111113] border border-[#2f2412] rounded-3xl p-8 w-full max-w-lg shadow-2xl shadow-black">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">
                {editId ? "Edit Task" : "Create Task"}
              </h2>

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
                placeholder="Task Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full bg-[#09090b] border border-[#2f2412] p-4 rounded-2xl outline-none focus:border-[#f5c45e] transition"
              />

              <input
                type="text"
                placeholder="Project Name"
                value={formData.project}
                onChange={(e) =>
                  setFormData({ ...formData, project: e.target.value })
                }
                className="w-full bg-[#09090b] border border-[#2f2412] p-4 rounded-2xl outline-none focus:border-[#f5c45e] transition"
              />

              <input
                type="text"
                placeholder="Assignee Name"
                value={formData.assignee}
                onChange={(e) =>
                  setFormData({ ...formData, assignee: e.target.value })
                }
                className="w-full bg-[#09090b] border border-[#2f2412] p-4 rounded-2xl outline-none focus:border-[#f5c45e] transition"
              />

              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) =>
                  setFormData({ ...formData, dueDate: e.target.value })
                }
                className="w-full bg-[#09090b] border border-[#2f2412] p-4 rounded-2xl outline-none focus:border-[#f5c45e] transition"
              />

              <select
                value={formData.priority}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    priority: e.target.value as Priority,
                  })
                }
                className="w-full bg-[#09090b] border border-[#2f2412] p-4 rounded-2xl outline-none focus:border-[#f5c45e] transition"
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
                className="w-full bg-[#09090b] border border-[#2f2412] p-4 rounded-2xl outline-none focus:border-[#f5c45e] transition"
              >
                <option>Todo</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>

              <button
                onClick={editId ? updateTask : addTask}
                className="w-full bg-gradient-to-r from-[#8a5a13] to-[#f5c45e] text-black py-4 rounded-2xl font-bold hover:scale-[1.02] transition"
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