import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import toast from "react-hot-toast";

type User = {
  name?: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("taskflow_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("taskflow_user", JSON.stringify(user));
    }
  }, [user]);

  const login = (email: string, password: string) => {
    if (!email || !password) {
      toast.error("Please fill all fields");
      return false;
    }

    const savedUser = localStorage.getItem("taskflow_user");

    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);

      if (parsedUser.email !== email) {
        toast.error("No account found with this email");
        return false;
      }

      setUser(parsedUser);
    } else {
      const userData = { email };
      setUser(userData);
      localStorage.setItem("taskflow_user", JSON.stringify(userData));
    }

    toast.success("Login successful");
    return true;
  };

  const signup = (name: string, email: string, password: string) => {
    if (!name || !email || !password) {
      toast.error("Please fill all fields");
      return false;
    }

    const userData = { name, email };

    setUser(userData);
    localStorage.setItem("taskflow_user", JSON.stringify(userData));

    toast.success("Account created successfully");
    return true;
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