import Layout from "../components/Layout";
import { FiFolder, FiCheckCircle, FiClock, FiUsers } from "react-icons/fi";

const Dashboard = () => {
  const cards = [
    { title: "Projects", value: 8, icon: <FiFolder /> },
    { title: "Completed", value: 24, icon: <FiCheckCircle /> },
    { title: "Pending", value: 12, icon: <FiClock /> },
    { title: "Team Members", value: 6, icon: <FiUsers /> },
  ];

  return (
    <Layout>
      <div>
        <div className="mb-10">
          <p className="text-slate-400 uppercase tracking-[4px]">
            Project Management
          </p>
          <h1 className="text-5xl font-bold mt-3">TaskFlow Dashboard</h1>
          <p className="text-slate-400 mt-3">
            Manage projects, tasks and team progress in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {cards.map((card) => (
            <div
              key={card.title}
              className="bg-[#0f172a] border border-slate-800 rounded-3xl p-6"
            >
              <div className="text-3xl mb-5">{card.icon}</div>
              <p className="text-slate-400">{card.title}</p>
              <h2 className="text-4xl font-bold mt-2">{card.value}</h2>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;