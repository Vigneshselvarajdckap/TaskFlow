import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import {
  FiFolder,
  FiCheckCircle,
  FiClock,
  FiUsers,
  FiAlertTriangle,
  FiTrendingUp,
  FiCalendar,
  FiActivity,
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
  LineChart,
  Line,
} from "recharts";
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

type Project = {
  id: number;
  title: string;
  status: "Planning" | "In Progress" | "Completed";
  dueDate: string;
  members: number;
};

type Member = {
  id: number;
  name: string;
  role: string;
  email: string;
};

const Dashboard = () => {
  const { theme, themeName } = useTheme();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [settings, setSettings] = useState<{ name?: string }>({});

  useEffect(() => {
    const savedTasks = localStorage.getItem("taskflow_tasks");
    const savedProjects = localStorage.getItem("taskflow_projects");
    const savedMembers = localStorage.getItem("taskflow_members");
    const savedSettings = localStorage.getItem("taskflow_settings");

    setTasks(savedTasks ? JSON.parse(savedTasks) : []);
    setProjects(savedProjects ? JSON.parse(savedProjects) : []);
    setMembers(savedMembers ? JSON.parse(savedMembers) : []);
    setSettings(savedSettings ? JSON.parse(savedSettings) : {});
  }, []);

  const today = new Date().toISOString().split("T")[0];

  const totalTasks = tasks.length;
  const totalProjects = projects.length;
  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;
  const pendingTasks = tasks.filter(
    (task) => task.status !== "Completed"
  ).length;
  const teamMembers = members.length;
  const overdueTasks = tasks.filter(
    (task) => task.dueDate < today && task.status !== "Completed"
  ).length;

  const cards = [
    { title: "Projects", value: totalProjects, icon: <FiFolder /> },
    { title: "Total Tasks", value: totalTasks, icon: <FiActivity /> },
    { title: "Completed", value: completedTasks, icon: <FiCheckCircle /> },
    { title: "Pending", value: pendingTasks, icon: <FiClock /> },
    { title: "Team", value: teamMembers, icon: <FiUsers /> },
    { title: "Overdue", value: overdueTasks, icon: <FiAlertTriangle /> },
  ];

  const statusData = [
    { name: "Todo", value: tasks.filter((t) => t.status === "Todo").length },
    {
      name: "In Progress",
      value: tasks.filter((t) => t.status === "In Progress").length,
    },
    {
      name: "Completed",
      value: tasks.filter((t) => t.status === "Completed").length,
    },
  ];

  const priorityData = [
    { name: "Low", value: tasks.filter((t) => t.priority === "Low").length },
    {
      name: "Medium",
      value: tasks.filter((t) => t.priority === "Medium").length,
    },
    { name: "High", value: tasks.filter((t) => t.priority === "High").length },
  ];

  const productivityData = [
    { day: "Mon", tasks: Math.max(1, Math.floor(totalTasks * 0.2)) },
    { day: "Tue", tasks: Math.max(1, Math.floor(totalTasks * 0.35)) },
    { day: "Wed", tasks: Math.max(1, Math.floor(totalTasks * 0.45)) },
    { day: "Thu", tasks: Math.max(1, Math.floor(totalTasks * 0.6)) },
    { day: "Fri", tasks: Math.max(1, completedTasks) },
  ];

  const recentTasks = [...tasks].slice(0, 5);

  const upcomingTasks = [...tasks]
    .filter((task) => task.status !== "Completed")
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
    .slice(0, 4);

  const getChartAccent = () => {
    if (themeName === "emerald") return "#34d399";
    if (themeName === "royal") return "#c084fc";
    if (themeName === "silver") return "#d4d4d8";
    return "#f5c45e";
  };

  const getPieColors = () => {
    if (themeName === "emerald")
      return ["#34d399", "#10b981", "#065f46"];
    if (themeName === "royal")
      return ["#c084fc", "#8b5cf6", "#4c1d95"];
    if (themeName === "silver")
      return ["#e5e7eb", "#a1a1aa", "#52525b"];
    return ["#22c55e", "#f5c45e", "#ef4444"];
  };

  const chartAccent = getChartAccent();
  const pieColors = getPieColors();

  return (
    <Layout>
      <div className="space-y-10">
        <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-6">
          <div>
            <p className={`${theme.accent} uppercase tracking-[5px] text-sm`}>
              Premium Project Workspace
            </p>

            <h1 className="text-5xl font-bold mt-3">
              Welcome back, {settings.name || "Vignesh"}
            </h1>

            <p className={`${theme.muted} mt-3`}>
              Track tasks, deadlines, team activity and project progress.
            </p>
          </div>

          <div
            className={`${theme.card} border ${theme.border} rounded-3xl px-6 py-5 flex items-center gap-4`}
          >
            <FiCalendar className={theme.accent} size={24} />
            <div>
              <p className={`${theme.muted} text-sm`}>Today</p>
              <h3 className="font-bold">{new Date().toDateString()}</h3>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-6 gap-5">
          {cards.map((card) => (
            <div
              key={card.title}
              className={`${theme.card} border ${theme.border} rounded-3xl p-5 transition shadow-xl shadow-black/20`}
            >
              <div
                className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${theme.gradient} ${theme.accentText} flex items-center justify-center text-2xl mb-5`}
              >
                {card.icon}
              </div>

              <p className={`${theme.muted} text-sm`}>{card.title}</p>
              <h2 className="text-4xl font-bold mt-2">{card.value}</h2>
            </div>
          ))}
        </div>

        <div className="grid xl:grid-cols-3 gap-6">
          <div
            className={`xl:col-span-2 ${theme.card} border ${theme.border} rounded-3xl p-6 shadow-xl shadow-black/20`}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Task Status Overview</h2>
              <FiTrendingUp className={theme.accent} size={24} />
            </div>

            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statusData}>
                  <XAxis dataKey="name" stroke="#a1a1aa" />
                  <YAxis stroke="#a1a1aa" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#09090b",
                      border: `1px solid ${chartAccent}`,
                      color: "#fff",
                      borderRadius: "12px",
                    }}
                  />
                  <Bar
                    dataKey="value"
                    fill={chartAccent}
                    radius={[12, 12, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div
            className={`${theme.card} border ${theme.border} rounded-3xl p-6 shadow-xl shadow-black/20`}
          >
            <h2 className="text-2xl font-bold mb-6">Priority Breakdown</h2>

            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={priorityData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={105}
                    label
                  >
                    {priorityData.map((_, index) => (
                      <Cell key={index} fill={pieColors[index]} />
                    ))}
                  </Pie>

                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#09090b",
                      border: `1px solid ${chartAccent}`,
                      color: "#fff",
                      borderRadius: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid xl:grid-cols-3 gap-6">
          <div
            className={`${theme.card} border ${theme.border} rounded-3xl p-6 shadow-xl shadow-black/20`}
          >
            <h2 className="text-2xl font-bold mb-6">Weekly Productivity</h2>

            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={productivityData}>
                  <XAxis dataKey="day" stroke="#a1a1aa" />
                  <YAxis stroke="#a1a1aa" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#09090b",
                      border: `1px solid ${chartAccent}`,
                      color: "#fff",
                      borderRadius: "12px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="tasks"
                    stroke={chartAccent}
                    strokeWidth={4}
                    dot={{ r: 5, fill: chartAccent }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div
            className={`xl:col-span-2 ${theme.card} border ${theme.border} rounded-3xl p-6 shadow-xl shadow-black/20`}
          >
            <h2 className="text-2xl font-bold mb-6">Upcoming Deadlines</h2>

            {upcomingTasks.length === 0 ? (
              <p className={theme.muted}>No upcoming deadlines.</p>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {upcomingTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`${theme.inner} border ${theme.border} rounded-2xl p-5`}
                  >
                    <p className={`${theme.accent} text-sm font-bold`}>
                      {task.dueDate}
                    </p>
                    <h3 className="text-xl font-bold mt-2">{task.title}</h3>
                    <p className={`${theme.muted} mt-1`}>{task.project}</p>
                    <p className={`${theme.muted} text-sm mt-3`}>
                      Assigned to {task.assignee}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div
          className={`${theme.card} border ${theme.border} rounded-3xl p-6 shadow-xl shadow-black/20`}
        >
          <h2 className="text-2xl font-bold mb-6">Recent Tasks</h2>

          {recentTasks.length === 0 ? (
            <p className={theme.muted}>No tasks found.</p>
          ) : (
            <div className="space-y-4">
              {recentTasks.map((task) => (
                <div
                  key={task.id}
                  className={`flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b ${theme.border} pb-4`}
                >
                  <div>
                    <h3 className="font-bold">{task.title}</h3>
                    <p className={`${theme.muted} text-sm`}>
                      {task.project} • {task.assignee}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={`${theme.inner} border ${theme.border} px-3 py-1 rounded-full text-sm`}
                    >
                      {task.priority}
                    </span>

                    <span
                      className={`bg-gradient-to-r ${theme.gradient} ${theme.accentText} px-3 py-1 rounded-full text-sm font-bold`}
                    >
                      {task.status}
                    </span>

                    <span className={`${theme.muted} text-sm`}>
                      {task.dueDate}
                    </span>
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