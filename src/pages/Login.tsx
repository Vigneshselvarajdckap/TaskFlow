import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiCheckSquare,
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

const handleLogin = () => {
  const success = login(formData.email, formData.password);
  if (success) {
    navigate("/");
  }
};

  return (
    <div className="min-h-screen bg-[#09090b] text-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 bg-[#111113] border border-[#2f2412] rounded-3xl overflow-hidden shadow-2xl shadow-black">
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 rounded-2xl border border-[#f5c45e] text-[#f5c45e] flex items-center justify-center">
              <FiCheckSquare size={26} />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-[#f5c45e]">TaskFlow</h1>
              <p className="text-zinc-400 text-sm">Manage. Track. Achieve.</p>
            </div>
          </div>

          <h2 className="text-4xl font-bold">Welcome Back</h2>

          <p className="text-zinc-400 mt-3 mb-8">
            Login to continue your productivity journey
          </p>

          <div className="space-y-5">
            <div>
              <label className="text-sm font-semibold">Email Address</label>

              <div className="relative mt-2">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-[#09090b] border border-[#2f2412] pl-12 p-4 rounded-2xl outline-none focus:border-[#f5c45e]"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold">Password</label>

              <div className="relative mt-2">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full bg-[#09090b] border border-[#2f2412] pl-12 pr-12 p-4 rounded-2xl outline-none focus:border-[#f5c45e]"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-[#8a5a13] to-[#f5c45e] text-black py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:scale-[1.02] transition"
            >
              Login
              <FiArrowRight />
            </button>
          </div>

          <p className="text-zinc-400 text-center mt-8">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-[#f5c45e] font-bold">
              Sign Up
            </Link>
          </p>
        </div>

        <div className="hidden lg:block relative min-h-[650px] bg-[#09090b] border-l border-[#2f2412] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop"
            alt="Task workspace"
            className="w-full h-full object-cover opacity-45"
          />

          <div className="absolute inset-0 bg-gradient-to-br from-black via-black/40 to-[#8a5a13]/30" />

          <div className="absolute top-12 left-10">
            <h2 className="text-[#f5c45e] text-4xl font-bold leading-tight">
              FOCUS <br />
              PLAN <br />
              ACHIEVE
            </h2>
            <div className="w-20 h-1 bg-[#f5c45e] mt-5" />
          </div>

          <div className="absolute bottom-10 left-10 right-10 bg-black/50 border border-[#2f2412] rounded-3xl p-6 backdrop-blur-xl">
            <h3 className="text-2xl font-bold">Your daily command center</h3>
            <p className="text-zinc-400 mt-2">
              Organize projects, manage tasks and track team progress in one
              luxury workspace.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;