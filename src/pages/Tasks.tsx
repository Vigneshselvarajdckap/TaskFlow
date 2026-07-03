import Layout from "../components/Layout";
import { useState } from "react";
import {
  FiPlus,
  FiClock,
  FiFlag,
  FiX,
  FiEdit,
  FiTrash2,
  FiUser,
  FiCalendar,
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

const Tasks = () => {
  const [openModal, setOpenModal] = useState(false);
  const [draggedTaskId, setDraggedTaskId] = useState<number | null>(null);
  const [editId, setEditId] = useState<number | null>(null);

  const [tasks, setTasks] = useState<Task[]>([
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
  ]);

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
    Low: "bg-green-500/20 text-green-400",
    Medium: "bg-yellow-500/20 text-yellow-400",
    High: "bg-red-500/20 text-red-400",
  };

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

  return (
    <Layout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">
        <div>
          <p className="text-slate-400 uppercase tracking-[4px]">Tasks</p>
          <h1 className="text-5xl font-bold mt-3">Kanban Board</h1>
          <p className="text-slate-400 mt-3">
            Manage your tasks with drag & drop workflow.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="bg-white text-black px-6 py-4 rounded-2xl font-bold flex items-center gap-2"
        >
          <FiPlus />
          New Task
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {columns.map((column) => (
          <div
            key={column}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(column)}
            className="bg-[#0f172a] border border-slate-800 rounded-3xl p-5 min-h-[500px]"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">{column}</h2>

              <span className="bg-[#020617] text-slate-400 px-3 py-1 rounded-full text-sm">
                {tasks.filter((task) => task.status === column).length}
              </span>
            </div>

            <div className="space-y-4">
              {tasks
                .filter((task) => task.status === column)
                .map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={() => setDraggedTaskId(task.id)}
                    className="bg-[#020617] border border-slate-800 rounded-2xl p-5 hover:border-slate-600 transition cursor-grab active:cursor-grabbing"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-semibold ${
                          priorityStyle[task.priority]
                        }`}
                      >
                        {task.priority}
                      </span>

                      <FiFlag className="text-slate-500" />
                    </div>

                    <h3 className="text-xl font-bold">{task.title}</h3>
                    <p className="text-slate-400 mt-2">{task.project}</p>

                    <div className="mt-5 space-y-2 text-sm text-slate-400">
                      <p className="flex items-center gap-2">
                        <FiCalendar />
                        Due: {task.dueDate}
                      </p>

                      <p className="flex items-center gap-2">
                        <FiUser />
                        Assignee: {task.assignee}
                      </p>

                      <p className="flex items-center gap-2">
                        <FiClock />
                        Status: {task.status}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-5">
                      <button
                        onClick={() => startEdit(task)}
                        className="bg-white text-black py-2 rounded-xl font-bold flex items-center justify-center gap-2"
                      >
                        <FiEdit />
                        Edit
                      </button>

                      <button
                        onClick={() => deleteTask(task.id)}
                        className="bg-red-500 text-white py-2 rounded-xl font-bold flex items-center justify-center gap-2"
                      >
                        <FiTrash2 />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {openModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-6">
          <div className="bg-[#0f172a] border border-slate-800 rounded-3xl p-8 w-full max-w-lg">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">
                {editId ? "Edit Task" : "Create Task"}
              </h2>

              <button
                onClick={() => {
                  setOpenModal(false);
                  resetForm();
                }}
                className="w-10 h-10 bg-[#020617] rounded-xl flex items-center justify-center"
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
                className="w-full bg-[#020617] border border-slate-700 p-4 rounded-xl outline-none focus:border-white"
              />

              <input
                type="text"
                placeholder="Project Name"
                value={formData.project}
                onChange={(e) =>
                  setFormData({ ...formData, project: e.target.value })
                }
                className="w-full bg-[#020617] border border-slate-700 p-4 rounded-xl outline-none focus:border-white"
              />

              <input
                type="text"
                placeholder="Assignee Name"
                value={formData.assignee}
                onChange={(e) =>
                  setFormData({ ...formData, assignee: e.target.value })
                }
                className="w-full bg-[#020617] border border-slate-700 p-4 rounded-xl outline-none focus:border-white"
              />

              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) =>
                  setFormData({ ...formData, dueDate: e.target.value })
                }
                className="w-full bg-[#020617] border border-slate-700 p-4 rounded-xl outline-none focus:border-white"
              />

              <select
                value={formData.priority}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    priority: e.target.value as Priority,
                  })
                }
                className="w-full bg-[#020617] border border-slate-700 p-4 rounded-xl outline-none focus:border-white"
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
                className="w-full bg-[#020617] border border-slate-700 p-4 rounded-xl outline-none focus:border-white"
              >
                <option>Todo</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>

              <button
                onClick={editId ? updateTask : addTask}
                className="w-full bg-white text-black py-4 rounded-xl font-bold hover:bg-slate-200 transition"
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