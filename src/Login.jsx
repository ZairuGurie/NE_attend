import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoImage from "./assets/Logologin.png";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mock authentication
    const mockUsers = {
      "student@example.com": { role: "student", password: "student123" },
      "instructor@example.com": { role: "instructor", password: "instructor123" },
      "admin@example.com": { role: "admin", password: "admin123" },
    };

    const user = mockUsers[formData.email];

    if (!user) {
      alert("User not found!");
      return;
    }

    if (user.password !== formData.password) {
      alert("Invalid password!");
      return;
    }

    switch (user.role) {
      case "student":
        navigate("/dashboard", { replace: true });
        break;
      case "instructor":
        navigate("/instructor-dashboard", { replace: true });
        break;
      case "admin":
        navigate("/adminD", { replace: true });
        break;
      default:
        alert("Invalid user role!");
    }
  };

  const handleGoogleLogin = () => {
    const mockGoogleUser = {
      email: "student@example.com",
      role: "student",
    };

    switch (mockGoogleUser.role) {
      case "student":
        navigate("/dashboard", { replace: true });
        break;
      case "instructor":
        navigate("/instructor-dashboard", { replace: true });
        break;
      case "admin":
        navigate("/admin-dashboard", { replace: true });
        break;
      default:
        alert("Invalid user role!");
    }
  };

  return (
    <div className="flex h-screen w-screen font-sans">
      {/* Left Panel */}
      <div className="flex flex-1 items-center justify-center bg-gradient-to-br from-blue-800 to-blue-900 p-6">
        <div className="w-full max-w-md flex flex-col items-center animate-fadeIn">
          {/* Logo */}
          <div className="mb-12 text-center">
            <img src={logoImage} alt="NEATTEND Logo" className="h-28 w-auto object-contain" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
            {/* Email */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-white text-xs font-semibold uppercase tracking-wide">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter Email"
                required
                className="w-full rounded-lg border-none bg-white px-4 py-3 text-gray-800 placeholder-gray-400 outline-none transition focus:shadow-md focus:translate-y-[-1px]"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-white text-xs font-semibold uppercase tracking-wide">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter Password"
                required
                className="w-full rounded-lg border-none bg-white px-4 py-3 text-gray-800 placeholder-gray-400 outline-none transition focus:shadow-md focus:translate-y-[-1px]"
              />
            </div>

            {/* Options */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="h-4 w-4 accent-green-500 cursor-pointer"
                />
                <span className="text-white">Remember me</span>
              </label>
              <a href="#" className="text-white hover:text-blue-300 hover:underline">
                Forgot Password
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="mt-2 rounded-lg bg-green-500 px-6 py-3 text-base font-semibold uppercase tracking-wide text-white shadow-md transition hover:bg-green-600 hover:translate-y-[-2px] hover:shadow-lg active:translate-y-0"
            >
              Login
            </button>

            {/* Create Account */}
            <div className="text-center mt-6">
              <span className="text-white text-sm mr-2">Don’t have an account?</span>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/create-account");
                }}
                className="text-blue-400 hover:text-blue-300 hover:underline"
              >
                Create Account
              </a>
            </div>

            {/* Google Login */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="mt-4 flex w-full items-center justify-center gap-3 rounded-lg bg-blue-500 px-6 py-3 text-base font-medium text-white shadow-md transition hover:bg-blue-600 hover:translate-y-[-2px] hover:shadow-lg active:translate-y-0"
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>
          </form>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex flex-1 items-center justify-center bg-white"></div>
    </div>
  );
};

export default Login;
