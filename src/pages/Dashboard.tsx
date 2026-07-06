import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import {
  FiFolder,
  FiCheckCircle,
  FiClock,
  FiUsers,
  FiAlertTriangle,
} from "react-icons/fi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

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

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const savedTasks = localStorage.getItem("taskflow_tasks");
    setTasks(savedTasks ? JSON.parse(savedTasks) : []);
  }, []);

  const totalProjects = new Set(tasks.map((task) => task.project)).size;
  const completedTasks = tasks.filter((task) => task.status === "Completed").length;
  const pendingTasks = tasks.filter((task) => task.status !== "Completed").length;
  const teamMembers = new Set(tasks.map((task) => task.assignee)).size;

  const today = new Date().toISOString().split("T")[0];

  const overdueTasks = tasks.filter(
    (task) => task.dueDate < today && task.status !== "Completed"
  ).length;

  const cards = [
    { title: "Projects", value: totalProjects, icon: <FiFolder /> },
    { title: "Completed", value: completedTasks, icon: <FiCheckCircle /> },
    { title: "Pending", value: pendingTasks, icon: <FiClock /> },
    { title: "Team Members", value: teamMembers, icon: <FiUsers /> },
    { title: "Overdue", value: overdueTasks, icon: <FiAlertTriangle /> },
  ];

  const statusData = [
    { name: "Todo", value: tasks.filter((task) => task.status === "Todo").length },
    { name: "In Progress", value: tasks.filter((task) => task.status === "In Progress").length },
    { name: "Completed", value: tasks.filter((task) => task.status === "Completed").length },
  ];

  const priorityData = [
    { name: "Low", value: tasks.filter((task) => task.priority === "Low").length },
    { name: "Medium", value: tasks.filter((task) => task.priority === "Medium").length },
    { name: "High", value: tasks.filter((task) => task.priority === "High").length },
  ];

  const recentTasks = [...tasks].slice(0, 5);

  return (
    <Layout>
      <div>
        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-5">
          <div>
            <p className="text-[#f5c45e] uppercase tracking-[5px] text-sm">
              Luxury Project Management
            </p>

            <h1 className="text-5xl font-bold mt-3">
              Welcome back, Vignesh
            </h1>

            <p className="text-zinc-400 mt-3">
              Here’s what’s happening with your projects today.
            </p>
          </div>

          <div className="bg-[#111113] border border-[#2f2412] px-5 py-4 rounded-2xl text-zinc-300">
            {new Date().toDateString()}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-10">
          {cards.map((card) => (
            <div
              key={card.title}
              className="bg-gradient-to-br from-[#151515] to-[#0b0b0d] border border-[#2f2412] rounded-3xl p-6 hover:border-[#f5c45e]/70 transition shadow-xl shadow-black/30"
            >
              <div className="w-14 h-14 rounded-full border border-[#f5c45e] text-[#f5c45e] flex items-center justify-center text-2xl mb-5">
                {card.icon}
              </div>

              <p className="text-zinc-400">{card.title}</p>
              <h2 className="text-4xl font-bold mt-2">{card.value}</h2>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-10">
          <div className="bg-[#111113] border border-[#2f2412] rounded-3xl p-6">
            <h2 className="text-2xl font-bold mb-6">Task Status Overview</h2>

            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statusData}>
                  <XAxis dataKey="name" stroke="#a1a1aa" />
                  <YAxis stroke="#a1a1aa" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#09090b",
                      border: "1px solid #f5c45e",
                      color: "#fff",
                    }}
                  />
                  <Bar dataKey="value" fill="#f5c45e" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-[#111113] border border-[#2f2412] rounded-3xl p-6">
            <h2 className="text-2xl font-bold mb-6">Priority Breakdown</h2>

            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={priorityData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                  >
                    {priorityData.map((_, index) => (
                      <Cell
                        key={index}
                        fill={["#22c55e", "#f5c45e", "#ef4444"][index]}
                      />
                    ))}
                  </Pie>

                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#09090b",
                      border: "1px solid #f5c45e",
                      color: "#fff",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-[#111113] border border-[#2f2412] rounded-3xl p-6">
          <h2 className="text-2xl font-bold mb-6">Recent Tasks</h2>

          {recentTasks.length === 0 ? (
            <p className="text-zinc-400">No tasks found.</p>
          ) : (
            <div className="space-y-4">
              {recentTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#2f2412] pb-4"
                >
                  <div>
                    <h3 className="font-bold">{task.title}</h3>
                    <p className="text-zinc-400 text-sm">
                      {task.project} • {task.assignee}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="bg-[#1a1a1d] border border-[#2f2412] px-3 py-1 rounded-full text-sm">
                      {task.priority}
                    </span>

                    <span className="bg-[#f5c45e] text-black px-3 py-1 rounded-full text-sm font-bold">
                      {task.status}
                    </span>

                    <span className="text-zinc-400 text-sm">{task.dueDate}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;