import Layout from "../components/Layout";
import { useState } from "react";
import { FiUser, FiMail, FiBell, FiMoon, FiSave } from "react-icons/fi";
import toast from "react-hot-toast";

const Settings = () => {
  const [formData, setFormData] = useState({
    name: "Vignesh",
    email: "vignesh@example.com",
    notifications: true,
    darkMode: true,
  });

  const saveSettings = () => {
    localStorage.setItem("taskflow_settings", JSON.stringify(formData));
    toast.success("Settings saved");
  };

  return (
    <Layout>
      <div className="mb-10">
        <p className="text-[#f5c45e] uppercase tracking-[5px] text-sm">
          Preferences
        </p>
        <h1 className="text-5xl font-bold mt-3">Settings</h1>
        <p className="text-zinc-400 mt-3">
          Manage your profile and workspace preferences.
        </p>
      </div>

      <div className="max-w-3xl bg-gradient-to-br from-[#151515] to-[#0b0b0d] border border-[#2f2412] rounded-3xl p-8 shadow-xl shadow-black/30">
        <div className="space-y-5">
          <div className="relative">
            <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-[#f5c45e]" />
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full bg-[#09090b] border border-[#2f2412] pl-12 p-4 rounded-2xl outline-none focus:border-[#f5c45e]"
            />
          </div>

          <div className="relative">
            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#f5c45e]" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full bg-[#09090b] border border-[#2f2412] pl-12 p-4 rounded-2xl outline-none focus:border-[#f5c45e]"
            />
          </div>

          <div className="flex items-center justify-between bg-[#09090b] border border-[#2f2412] p-5 rounded-2xl">
            <div className="flex items-center gap-3">
              <FiBell className="text-[#f5c45e]" />
              <div>
                <h3 className="font-bold">Notifications</h3>
                <p className="text-zinc-400 text-sm">
                  Receive updates about tasks and projects.
                </p>
              </div>
            </div>

            <input
              type="checkbox"
              checked={formData.notifications}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  notifications: e.target.checked,
                })
              }
              className="w-5 h-5 accent-[#f5c45e]"
            />
          </div>

          <div className="flex items-center justify-between bg-[#09090b] border border-[#2f2412] p-5 rounded-2xl">
            <div className="flex items-center gap-3">
              <FiMoon className="text-[#f5c45e]" />
              <div>
                <h3 className="font-bold">Luxury Dark Mode</h3>
                <p className="text-zinc-400 text-sm">
                  Keep TaskFlow in premium black & gold mode.
                </p>
              </div>
            </div>

            <input
              type="checkbox"
              checked={formData.darkMode}
              onChange={(e) =>
                setFormData({ ...formData, darkMode: e.target.checked })
              }
              className="w-5 h-5 accent-[#f5c45e]"
            />
          </div>

          <button
            onClick={saveSettings}
            className="w-full bg-gradient-to-r from-[#8a5a13] to-[#f5c45e] text-black py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition"
          >
            <FiSave />
            Save Settings
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;