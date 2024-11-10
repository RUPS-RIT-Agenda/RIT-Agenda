"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState(""); // State for error messages
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message on each submit

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log("Login successful:", data);
        window.dispatchEvent(new Event("authChange"));
        router.push("/");
      } else {
        console.error("Login failed:", data.message);
        setErrorMessage(data.message); // Set error message received from backend
      }
    } catch (err) {
      console.error("An error occurred:", err);
      setErrorMessage("An unexpected error occurred. Please try again."); // Fallback error message
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-r from-gray-200 via-blue-200 to-gray-300 relative">
      {/* Fun Floating Circles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-circle top-10 left-20 w-32 h-32 bg-gradient-to-br from-blue-400 to-cyan-400 opacity-50 rounded-full blur-2xl animate-bounce-slow"></div>
        <div className="floating-circle bottom-10 right-20 w-40 h-40 bg-gradient-to-br from-green-400 to-teal-500 opacity-50 rounded-full blur-3xl animate-bounce-slow"></div>
      </div>

      {/* Main Container with Form */}
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-16 flex flex-col items-center space-y-6 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
          Log In
        </h1>
        {errorMessage && (
          <p className="text-lg text-red-500 font-semibold">
            {errorMessage}
          </p>
        )}
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Username:
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-500 focus:outline-none shadow-md transition-all"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Password:
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-500 focus:outline-none shadow-md transition-all"
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold shadow-lg hover:shadow-2xl transform transition-transform duration-300 hover:-translate-y-1 hover:scale-105"
          >
            <span className="text-lg uppercase tracking-wide">Log In</span>
          </button>
        </form>
      </div>

      <style jsx>{`
        .floating-circle {
          position: absolute;
        }

        .animate-bounce-slow {
          animation: bounce 6s infinite alternate ease-in-out;
        }

        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
}
