import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import {
  FiUser,
  FiMail,
  FiBell,
  FiMoon,
  FiSave,
  FiRefreshCcw,
  FiBriefcase,
  FiShield,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { useTheme, type ThemeName } from "../context/ThemeContext";

const Settings = () => {
  const { theme, themeName, setThemeName } = useTheme();

  const [formData, setFormData] = useState({
    name: "Vignesh",
    email: "vignesh@example.com",
    workspace: "TaskFlow Premium Workspace",
    notifications: true,
    darkMode: true,
    autoSave: true,
    selectedTheme: themeName as ThemeName,
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem("taskflow_settings");

    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      setFormData({
        name: parsed.name || "Vignesh",
        email: parsed.email || "vignesh@example.com",
        workspace: parsed.workspace || "TaskFlow Premium Workspace",
        notifications:
          parsed.notifications !== undefined ? parsed.notifications : true,
        darkMode: parsed.darkMode !== undefined ? parsed.darkMode : true,
        autoSave: parsed.autoSave !== undefined ? parsed.autoSave : true,
        selectedTheme: (parsed.selectedTheme || themeName) as ThemeName,
      });
    }
  }, [themeName]);

  const saveSettings = () => {
    localStorage.setItem("taskflow_settings", JSON.stringify(formData));

    const currentUser = localStorage.getItem("taskflow_user");
    if (currentUser) {
      const user = JSON.parse(currentUser);

      localStorage.setItem(
        "taskflow_user",
        JSON.stringify({
          ...user,
          name: formData.name,
          email: formData.email,
        })
      );
    }

    setThemeName(formData.selectedTheme);
    toast.success("Settings saved");
  };

  const resetDemoData = () => {
    localStorage.removeItem("taskflow_tasks");
    localStorage.removeItem("taskflow_projects");
    localStorage.removeItem("taskflow_members");
    toast.success("Demo data reset. Refresh the page.");
  };

  const previewThemes: {
    name: ThemeName;
    label: string;
    gradient: string;
  }[] = [
    {
      name: "luxury",
      label: "Luxury Gold",
      gradient: "from-[#8a5a13] to-[#f5c45e]",
    },
    {
      name: "silver",
      label: "Silver Minimal",
      gradient: "from-zinc-500 to-zinc-200",
    },
    {
      name: "emerald",
      label: "Emerald Dark",
      gradient: "from-emerald-700 to-emerald-400",
    },
    {
      name: "royal",
      label: "Royal Purple",
      gradient: "from-purple-800 to-purple-400",
    },
    {
      name: "crimson",
      label: "Crimson Red",
      gradient: "from-red-900 to-red-500",
    },
    {
      name: "ocean",
      label: "Ocean Blue",
      gradient: "from-cyan-800 to-cyan-300",
    },
    {
      name: "rose",
      label: "Rose Pink",
      gradient: "from-pink-800 to-pink-400",
    },
    {
      name: "amber",
      label: "Amber Orange",
      gradient: "from-orange-800 to-amber-300",
    },
  ];

  return (
    <Layout>
      <div className="mb-10">
        <p className={`${theme.accent} uppercase tracking-[5px] text-sm`}>
          Workspace Preferences
        </p>

        <h1 className="text-5xl font-bold mt-3">Settings</h1>

        <p className={`${theme.muted} mt-3`}>
          Manage your profile, workspace and TaskFlow theme preferences.
        </p>
      </div>

      <div className="grid xl:grid-cols-3 gap-6">
        <div
          className={`xl:col-span-2 ${theme.card} border ${theme.border} rounded-3xl p-8 shadow-xl shadow-black/20`}
        >
          <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>

          <div className="space-y-5">
            <div className="relative">
              <FiUser
                className={`absolute left-4 top-1/2 -translate-y-1/2 ${theme.accent}`}
              />
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className={`w-full ${theme.inner} border ${theme.border} pl-12 p-4 rounded-2xl outline-none`}
              />
            </div>

            <div className="relative">
              <FiMail
                className={`absolute left-4 top-1/2 -translate-y-1/2 ${theme.accent}`}
              />
              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className={`w-full ${theme.inner} border ${theme.border} pl-12 p-4 rounded-2xl outline-none`}
              />
            </div>

            <div className="relative">
              <FiBriefcase
                className={`absolute left-4 top-1/2 -translate-y-1/2 ${theme.accent}`}
              />
              <input
                type="text"
                placeholder="Workspace Name"
                value={formData.workspace}
                onChange={(e) =>
                  setFormData({ ...formData, workspace: e.target.value })
                }
                className={`w-full ${theme.inner} border ${theme.border} pl-12 p-4 rounded-2xl outline-none`}
              />
            </div>

            <div>
              <label className={`block text-sm ${theme.muted} mb-3`}>
                Choose Theme
              </label>
              <select
                value={formData.selectedTheme}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    selectedTheme: e.target.value as ThemeName,
                  })
                }
                className={`w-full ${theme.inner} border ${theme.border} p-4 rounded-2xl outline-none`}
              >
                <option value="luxury">Luxury Gold</option>
                <option value="silver">Silver Minimal</option>
                <option value="emerald">Emerald Dark</option>
                <option value="royal">Royal Purple</option>
                <option value="crimson">Crimson Red</option>
                <option value="ocean">Ocean Blue</option>
                <option value="rose">Rose Pink</option>
                <option value="amber">Amber Orange</option>
              </select>
            </div>

            <button
              onClick={saveSettings}
              className={`w-full bg-gradient-to-r ${theme.gradient} ${theme.accentText} py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition`}
            >
              <FiSave />
              Save Settings
            </button>
          </div>
        </div>

        <div
          className={`${theme.card} border ${theme.border} rounded-3xl p-8 shadow-xl shadow-black/20`}
        >
          <h2 className="text-2xl font-bold mb-6">Account Preview</h2>

          <div
            className={`w-24 h-24 rounded-full bg-gradient-to-br ${theme.gradient} ${theme.accentText} flex items-center justify-center text-4xl font-bold mb-6`}
          >
            {formData.name.charAt(0).toUpperCase()}
          </div>

          <h3 className="text-2xl font-bold">{formData.name}</h3>
          <p className={`${theme.muted} mt-2 break-all`}>{formData.email}</p>

          <div
            className={`mt-6 ${theme.inner} border ${theme.border} rounded-2xl p-4`}
          >
            <p className={`${theme.accent} font-bold`}>Workspace</p>
            <p className={`${theme.muted} mt-1`}>{formData.workspace}</p>
          </div>
        </div>
      </div>

      <div
        className={`mt-6 ${theme.card} border ${theme.border} rounded-3xl p-6 shadow-xl shadow-black/20`}
      >
        <h2 className="text-2xl font-bold mb-5">Theme Preview</h2>

        <div className="grid md:grid-cols-4 gap-4">
          {previewThemes.map((item) => {
            const isActive = formData.selectedTheme === item.name;

            return (
              <button
                key={item.name}
                onClick={() =>
                  setFormData({
                    ...formData,
                    selectedTheme: item.name,
                  })
                }
                className={`rounded-2xl p-4 text-left border transition ${
                  isActive
                    ? `${theme.border} scale-[1.02]`
                    : "border-transparent"
                } ${theme.inner}`}
              >
                <div
                  className={`h-16 rounded-xl bg-gradient-to-r ${item.gradient}`}
                />
                <p className="mt-3 font-bold">{item.label}</p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-6">
        <div
          className={`${theme.card} border ${theme.border} rounded-3xl p-6 shadow-xl shadow-black/20`}
        >
          <div className="flex items-center gap-3 mb-5">
            <FiBell className={theme.accent} size={24} />
            <h3 className="text-xl font-bold">Notifications</h3>
          </div>

          <p className={`${theme.muted} mb-5`}>
            Receive updates about tasks, projects and deadlines.
          </p>

          <label className="flex items-center justify-between cursor-pointer">
            <span className={theme.muted}>Enable Notifications</span>
            <input
              type="checkbox"
              checked={formData.notifications}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  notifications: e.target.checked,
                })
              }
              className="w-5 h-5 accent-yellow-500"
            />
          </label>
        </div>

        <div
          className={`${theme.card} border ${theme.border} rounded-3xl p-6 shadow-xl shadow-black/20`}
        >
          <div className="flex items-center gap-3 mb-5">
            <FiMoon className={theme.accent} size={24} />
            <h3 className="text-xl font-bold">Theme Mode</h3>
          </div>

          <p className={`${theme.muted} mb-5`}>
            Save the selected premium color theme for your workspace.
          </p>

          <label className="flex items-center justify-between cursor-pointer">
            <span className={theme.muted}>Enable Theme Save</span>
            <input
              type="checkbox"
              checked={formData.darkMode}
              onChange={(e) =>
                setFormData({ ...formData, darkMode: e.target.checked })
              }
              className="w-5 h-5 accent-yellow-500"
            />
          </label>
        </div>

        <div
          className={`${theme.card} border ${theme.border} rounded-3xl p-6 shadow-xl shadow-black/20`}
        >
          <div className="flex items-center gap-3 mb-5">
            <FiShield className={theme.accent} size={24} />
            <h3 className="text-xl font-bold">Auto Save</h3>
          </div>

          <p className={`${theme.muted} mb-5`}>
            Save task, project and team changes automatically.
          </p>

          <label className="flex items-center justify-between cursor-pointer">
            <span className={theme.muted}>Enable Auto Save</span>
            <input
              type="checkbox"
              checked={formData.autoSave}
              onChange={(e) =>
                setFormData({ ...formData, autoSave: e.target.checked })
              }
              className="w-5 h-5 accent-yellow-500"
            />
          </label>
        </div>
      </div>

      <div className="mt-6 bg-red-500/10 border border-red-500/30 rounded-3xl p-6">
        <h2 className="text-2xl font-bold text-red-400 mb-3">Danger Zone</h2>

        <p className={`${theme.muted} mb-5`}>
          Reset all demo tasks, projects and team members stored in localStorage.
        </p>

        <button
          onClick={resetDemoData}
          className="bg-red-500 text-white px-6 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-red-600 transition"
        >
          <FiRefreshCcw />
          Reset Demo Data
        </button>
      </div>
    </Layout>
  );
};

export default Settings;