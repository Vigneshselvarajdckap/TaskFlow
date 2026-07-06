import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

type User = {
  name?: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => void;
  signup: (name: string, email: string, password: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("taskflow_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email: string, password: string) => {
    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    const userData = { email };
    localStorage.setItem("taskflow_user", JSON.stringify(userData));
    setUser(userData);
    toast.success("Login successful");
  };

  const signup = (name: string, email: string, password: string) => {
    if (!name || !email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    const userData = { name, email };
    localStorage.setItem("taskflow_user", JSON.stringify(userData));
    setUser(userData);
    toast.success("Account created successfully");
  };

  const logout = () => {
    localStorage.removeItem("taskflow_user");
    setUser(null);
    toast.success("Logged out");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;