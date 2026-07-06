import Layout from "../components/Layout";
import { FiMail, FiBriefcase, FiPlus } from "react-icons/fi";

const Team = () => {
  const members = [
    {
      name: "Vignesh",
      role: "Project Manager",
      email: "vignesh@example.com",
      avatar: "V",
    },
    {
      name: "Pugal",
      role: "UI Designer",
      email: "pugal@example.com",
      avatar: "P",
    },
    {
      name: "Arun",
      role: "Frontend Developer",
      email: "arun@example.com",
      avatar: "A",
    },
  ];

  return (
    <Layout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">
        <div>
          <p className="text-[#f5c45e] uppercase tracking-[5px] text-sm">
            Team Members
          </p>
          <h1 className="text-5xl font-bold mt-3">Manage Team</h1>
          <p className="text-zinc-400 mt-3">
            View your workspace members and roles.
          </p>
        </div>

        <button className="bg-gradient-to-r from-[#8a5a13] to-[#f5c45e] text-black px-6 py-4 rounded-2xl font-bold flex items-center gap-2">
          <FiPlus />
          Add Member
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {members.map((member) => (
          <div
            key={member.email}
            className="bg-gradient-to-br from-[#151515] to-[#0b0b0d] border border-[#2f2412] rounded-3xl p-6 hover:border-[#f5c45e]/70 transition shadow-xl shadow-black/30"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#8a5a13] to-[#f5c45e] text-black flex items-center justify-center text-3xl font-bold mb-6">
              {member.avatar}
            </div>

            <h2 className="text-2xl font-bold">{member.name}</h2>

            <p className="flex items-center gap-2 text-zinc-400 mt-3">
              <FiBriefcase className="text-[#f5c45e]" />
              {member.role}
            </p>

            <p className="flex items-center gap-2 text-zinc-400 mt-3">
              <FiMail className="text-[#f5c45e]" />
              {member.email}
            </p>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Team;