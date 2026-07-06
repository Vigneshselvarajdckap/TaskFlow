import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    FiUser,
    FiMail,
    FiLock,
    FiEye,
    FiEyeOff,
    FiArrowRight,
    FiCheckSquare,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
    const navigate = useNavigate();
    const { signup } = useAuth();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleSignup = () => {
        if (
            !formData.name ||
            !formData.email ||
            !formData.password ||
            !formData.confirmPassword
        ) {
            toast.error("Please fill all fields");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        const success = signup(formData.name, formData.email, formData.password);
        if (success) {
            navigate("/");
        }
    };

    return (
        <div className="min-h-screen bg-[#09090b] text-white flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-6xl grid lg:grid-cols-2 bg-[#111113] border border-[#2f2412] rounded-3xl overflow-hidden shadow-2xl shadow-black">
                <div className="hidden lg:block relative min-h-[720px] bg-[#09090b] border-r border-[#2f2412] overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"
                        alt="Task planning"
                        className="w-full h-full object-cover opacity-45"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-black via-black/40 to-[#8a5a13]/30" />

                    <div className="absolute top-12 left-10">
                        <h2 className="text-[#f5c45e] text-4xl font-bold leading-tight">
                            ORGANIZE <br />
                            TRACK <br />
                            SUCCEED
                        </h2>
                        <div className="w-20 h-1 bg-[#f5c45e] mt-5" />
                    </div>

                    <div className="absolute bottom-10 left-10 right-10 bg-black/50 border border-[#2f2412] rounded-3xl p-6 backdrop-blur-xl">
                        <h3 className="text-2xl font-bold">Build your workflow</h3>
                        <p className="text-zinc-400 mt-2">
                            Create tasks, assign work, monitor progress and deliver faster
                            with TaskFlow.
                        </p>
                    </div>
                </div>

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

                    <h2 className="text-4xl font-bold">Create Account</h2>
                    <p className="text-zinc-400 mt-3 mb-8">
                        Join TaskFlow and organize your work smarter
                    </p>

                    <div className="space-y-5">
                        <div>
                            <label className="text-sm font-semibold">Full Name</label>
                            <div className="relative mt-2">
                                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                                <input
                                    type="text"
                                    placeholder="Enter your full name"
                                    className="w-full bg-[#09090b] border border-[#2f2412] pl-12 p-4 rounded-2xl outline-none focus:border-[#f5c45e]"
                                    onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                />
                            </div>
                        </div>

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
                                    placeholder="Create a password"
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

                        <div>
                            <label className="text-sm font-semibold">Confirm Password</label>
                            <div className="relative mt-2">
                                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm your password"
                                    className="w-full bg-[#09090b] border border-[#2f2412] pl-12 pr-12 p-4 rounded-2xl outline-none focus:border-[#f5c45e]"
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            confirmPassword: e.target.value,
                                        })
                                    }
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500"
                                >
                                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={handleSignup}
                            className="w-full bg-gradient-to-r from-[#8a5a13] to-[#f5c45e] text-black py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:scale-[1.02] transition"
                        >
                            Create Account
                            <FiArrowRight />
                        </button>
                    </div>

                    <p className="text-zinc-400 text-center mt-8">
                        Already have an account?{" "}
                        <Link to="/login" className="text-[#f5c45e] font-bold">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;