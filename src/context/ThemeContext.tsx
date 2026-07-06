import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type ThemeName =
  | "luxury"
  | "silver"
  | "emerald"
  | "royal"
  | "crimson"
  | "ocean"
  | "rose"
  | "amber";

type Theme = {
  name: ThemeName;
  bg: string;
  sidebar: string;
  card: string;
  inner: string;
  border: string;
  text: string;
  muted: string;
  accent: string;
  accentText: string;
  gradient: string;
};

const themes: Record<ThemeName, Theme> = {
  luxury: {
    name: "luxury",
    bg: "bg-[#09090b]",
    sidebar: "bg-[#0c0c0f]",
    card: "bg-[#111113]",
    inner: "bg-[#151515]",
    border: "border-[#2f2412]",
    text: "text-white",
    muted: "text-zinc-400",
    accent: "text-[#f5c45e]",
    accentText: "text-black",
    gradient: "from-[#8a5a13] to-[#f5c45e]",
  },

  silver: {
    name: "silver",
    bg: "bg-[#0a0a0a]",
    sidebar: "bg-[#111111]",
    card: "bg-[#181818]",
    inner: "bg-[#202020]",
    border: "border-[#3f3f46]",
    text: "text-white",
    muted: "text-zinc-400",
    accent: "text-[#d4d4d8]",
    accentText: "text-black",
    gradient: "from-[#71717a] to-[#f4f4f5]",
  },

  emerald: {
    name: "emerald",
    bg: "bg-[#04130d]",
    sidebar: "bg-[#061810]",
    card: "bg-[#0b2016]",
    inner: "bg-[#10291d]",
    border: "border-[#14532d]",
    text: "text-white",
    muted: "text-emerald-200/60",
    accent: "text-emerald-400",
    accentText: "text-black",
    gradient: "from-emerald-700 to-emerald-400",
  },

  royal: {
    name: "royal",
    bg: "bg-[#0b0615]",
    sidebar: "bg-[#10091f]",
    card: "bg-[#160d2b]",
    inner: "bg-[#1d1238]",
    border: "border-[#3b236b]",
    text: "text-white",
    muted: "text-purple-200/60",
    accent: "text-purple-300",
    accentText: "text-white",
    gradient: "from-purple-800 to-purple-400",
  },

  crimson: {
    name: "crimson",
    bg: "bg-[#140606]",
    sidebar: "bg-[#1a0909]",
    card: "bg-[#220d0d]",
    inner: "bg-[#2b1111]",
    border: "border-[#5f1f1f]",
    text: "text-white",
    muted: "text-red-200/60",
    accent: "text-red-400",
    accentText: "text-white",
    gradient: "from-red-900 to-red-500",
  },

  ocean: {
    name: "ocean",
    bg: "bg-[#03111f]",
    sidebar: "bg-[#061827]",
    card: "bg-[#0a2135]",
    inner: "bg-[#102b43]",
    border: "border-[#164e63]",
    text: "text-white",
    muted: "text-cyan-200/60",
    accent: "text-cyan-300",
    accentText: "text-black",
    gradient: "from-cyan-800 to-cyan-300",
  },

  rose: {
    name: "rose",
    bg: "bg-[#160711]",
    sidebar: "bg-[#1f0a18]",
    card: "bg-[#2a1021]",
    inner: "bg-[#341429]",
    border: "border-[#831843]",
    text: "text-white",
    muted: "text-pink-200/60",
    accent: "text-pink-300",
    accentText: "text-white",
    gradient: "from-pink-800 to-pink-400",
  },

  amber: {
    name: "amber",
    bg: "bg-[#130b03]",
    sidebar: "bg-[#1c1005]",
    card: "bg-[#261606]",
    inner: "bg-[#301c08]",
    border: "border-[#92400e]",
    text: "text-white",
    muted: "text-orange-200/60",
    accent: "text-orange-300",
    accentText: "text-black",
    gradient: "from-orange-800 to-amber-300",
  },
};

type ThemeContextType = {
  themeName: ThemeName;
  theme: Theme;
  setThemeName: (theme: ThemeName) => void;
  themes: Record<ThemeName, Theme>;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeName, setThemeNameState] = useState<ThemeName>(() => {
    return (localStorage.getItem("taskflow_theme") as ThemeName) || "luxury";
  });

  useEffect(() => {
    localStorage.setItem("taskflow_theme", themeName);
  }, [themeName]);

  const setThemeName = (theme: ThemeName) => {
    setThemeNameState(theme);
  };

  return (
    <ThemeContext.Provider
      value={{
        themeName,
        theme: themes[themeName],
        setThemeName,
        themes,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext)!;