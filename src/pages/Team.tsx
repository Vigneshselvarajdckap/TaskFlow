import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import {
  FiPlus,
  FiMail,
  FiBriefcase,
  FiX,
  FiSearch,
  FiFilter,
  FiEdit,
  FiTrash2,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { useTheme } from "../context/ThemeContext";

type Member = {
  id: number;
  name: string;
  role: string;
  email: string;
};

const defaultMembers: Member[] = [
  {
    id: 1,
    name: "Vignesh",
    role: "Frontend Developer",
    email: "vignesh@example.com",
  },
  {
    id: 2,
    name: "Pugal",
    role: "UI Designer",
    email: "pugal@example.com",
  },
  {
    id: 3,
    name: "Arun",
    role: "Project Manager",
    email: "arun@example.com",
  },
];

const Team = () => {
  const { theme, themeName } = useTheme();

  const [openModal, setOpenModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  const [members, setMembers] = useState<Member[]>(() => {
    const savedMembers = localStorage.getItem("taskflow_members");
    return savedMembers ? JSON.parse(savedMembers) : defaultMembers;
  });

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    email: "",
  });

  useEffect(() => {
    localStorage.setItem("taskflow_members", JSON.stringify(members));
  }, [members]);

  const uniqueRoles = ["All", ...new Set(members.map((m) => m.role))];

  const filteredMembers = members.filter((member) => {
    const searchMatch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase());

    const roleMatch = roleFilter === "All" || member.role === roleFilter;

    return searchMatch && roleMatch;
  });

  const resetForm = () => {
    setFormData({
      name: "",
      role: "",
      email: "",
    });
    setEditId(null);
  };

  const openCreateModal = () => {
    resetForm();
    setOpenModal(true);
  };

  const addMember = () => {
    if (!formData.name || !formData.role || !formData.email) {
      toast.error("Please fill all fields");
      return;
    }

    const newMember: Member = {
      id: Date.now(),
      name: formData.name,
      role: formData.role,
      email: formData.email,
    };

    setMembers((prev) => [newMember, ...prev]);
    resetForm();
    setOpenModal(false);
    toast.success("Team member added");
  };

  const startEdit = (member: Member) => {
    setEditId(member.id);
    setFormData({
      name: member.name,
      role: member.role,
      email: member.email,
    });
    setOpenModal(true);
  };

  const updateMember = () => {
    if (!editId) return;

    if (!formData.name || !formData.role || !formData.email) {
      toast.error("Please fill all fields");
      return;
    }

    setMembers((prev) =>
      prev.map((member) =>
        member.id === editId
          ? {
              ...member,
              name: formData.name,
              role: formData.role,
              email: formData.email,
            }
          : member
      )
    );

    resetForm();
    setOpenModal(false);
    toast.success("Member updated");
  };

  const deleteMember = (id: number) => {
    setMembers((prev) => prev.filter((member) => member.id !== id));
    toast.success("Member deleted");
  };

  const clearFilters = () => {
    setSearchTerm("");
    setRoleFilter("All");
  };

  const getAvatarGradient = () => {
    if (themeName === "emerald") return "from-emerald-700 to-emerald-400";
    if (themeName === "royal") return "from-purple-800 to-purple-400";
    if (themeName === "silver") return "from-zinc-500 to-zinc-200";
    return "from-[#8a5a13] to-[#f5c45e]";
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
        <div>
          <p className={`${theme.accent} uppercase tracking-[5px] text-sm`}>
            Premium Team
          </p>

          <h1 className="text-5xl font-bold mt-3">Manage Team</h1>

          <p className={`${theme.muted} mt-3`}>
            Add, edit and organize your workspace members.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className={`bg-gradient-to-r ${theme.gradient} ${theme.accentText} px-6 py-4 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition`}
        >
          <FiPlus />
          Add Member
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
              placeholder="Search by name, role or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full ${theme.inner} border ${theme.border} pl-12 p-4 rounded-2xl outline-none`}
            />
          </div>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className={`${theme.inner} border ${theme.border} p-4 rounded-2xl outline-none`}
          >
            {uniqueRoles.map((role) => (
              <option key={role} value={role}>
                {role === "All" ? "All Roles" : role}
              </option>
            ))}
          </select>
        </div>

        <div
          className={`flex items-center justify-between mt-5 text-sm ${theme.muted}`}
        >
          <p className="flex items-center gap-2">
            <FiFilter className={theme.accent} />
            Showing {filteredMembers.length} of {members.length} members
          </p>

          <button onClick={clearFilters} className={theme.accent}>
            Clear Filters
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className={`${theme.card} border ${theme.border} rounded-3xl p-6 shadow-xl shadow-black/20`}
          >
            <div
              className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${getAvatarGradient()} ${theme.accentText} flex items-center justify-center text-2xl font-bold mb-5`}
            >
              {member.name.charAt(0).toUpperCase()}
            </div>

            <h2 className="text-2xl font-bold">{member.name}</h2>

            <div className={`mt-5 space-y-3 ${theme.muted}`}>
              <p className="flex items-center gap-2">
                <FiBriefcase className={theme.accent} />
                {member.role}
              </p>

              <p className="flex items-center gap-2 break-all">
                <FiMail className={theme.accent} />
                {member.email}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <button
                onClick={() => startEdit(member)}
                className={`bg-gradient-to-r ${theme.gradient} ${theme.accentText} py-3 rounded-xl font-bold flex items-center justify-center gap-2`}
              >
                <FiEdit />
                Edit
              </button>

              <button
                onClick={() => deleteMember(member.id)}
                className="bg-red-500/10 border border-red-500/40 text-red-400 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-500 hover:text-white transition"
              >
                <FiTrash2 />
                Delete
              </button>
            </div>
          </div>
        ))}

        {filteredMembers.length === 0 && (
          <div
            className={`md:col-span-2 xl:col-span-3 border border-dashed ${theme.border} rounded-3xl p-10 text-center ${theme.muted}`}
          >
            No team members found
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
                {editId ? "Edit Member" : "Add Member"}
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
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className={`w-full ${theme.inner} border ${theme.border} p-4 rounded-2xl outline-none`}
              />

              <input
                type="text"
                placeholder="Role"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className={`w-full ${theme.inner} border ${theme.border} p-4 rounded-2xl outline-none`}
              />

              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className={`w-full ${theme.inner} border ${theme.border} p-4 rounded-2xl outline-none`}
              />

              <button
                onClick={editId ? updateMember : addMember}
                className={`w-full bg-gradient-to-r ${theme.gradient} ${theme.accentText} py-4 rounded-2xl font-bold hover:scale-[1.02] transition`}
              >
                {editId ? "Update Member" : "Add Member"}
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Team;