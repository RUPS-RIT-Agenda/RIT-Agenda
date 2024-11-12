"use client";

import { useState } from "react";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    dateOfBirth: "",
    studyCycle: "",
    schoolYear: "",
    userGroup: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();

    if (response.ok) {
      console.log("User registered successfully!", data);
    } else {
      console.error("Register failed:", data.message);
      setErrorMessage(data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-r from-gray-200 via-blue-200 to-gray-300 relative">
      {/* Fun Floating Circles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-circle top-10 left-20 w-24 h-24 bg-gradient-to-br from-blue-400 to-cyan-400 opacity-50 rounded-full blur-2xl animate-bounce-slow"></div>
        <div className="floating-circle bottom-10 right-20 w-32 h-32 bg-gradient-to-br from-green-400 to-teal-500 opacity-50 rounded-full blur-3xl animate-bounce-slow"></div>
      </div>

      {/* Main Container with Form */}
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-10 flex flex-col items-center space-y-6 text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-4 leading-tight">
          Sign Up
        </h1>
        {errorMessage && (
          <p className="text-lg text-red-500 font-semibold">
            {errorMessage}
          </p>
        )}
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div>
            <label className="block text-start text-sm font-medium text-gray-700 mb-2">
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
            <label className="block text-start text-sm font-medium text-gray-700 mb-2">
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-500 focus:outline-none shadow-md transition-all"
            />
          </div>
          <div>
            <label className="block text-start text-sm font-medium text-gray-700 mb-2">
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
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-start text-sm font-medium text-gray-700 mb-2">
                Date of Birth:
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-500 focus:outline-none shadow-md transition-all"
              />
            </div>
            <div className="flex-1">
              <label className="block text-start text-sm font-medium text-gray-700 mb-2">
                Study Cycle:
              </label>
              <select
                name="studyCycle"
                value={formData.studyCycle}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-500 focus:outline-none shadow-md transition-all appearance-none hover:bg-gray-100 hover:border-blue-400 cursor-pointer"
              >
                <option value="">Select</option>
                <option value="UNI">UNI</option>
                <option value="MAG">MAG</option>
              </select>
            </div>
          </div>
          <div className="flex space-x-4 mt-4">
            <div className="flex-1">
              <label className="block text-start text-sm font-medium text-gray-700 mb-2">
                School Year:
              </label>
              <select
                name="schoolYear"
                value={formData.schoolYear}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-500 focus:outline-none shadow-md transition-all appearance-none hover:bg-gray-100 hover:border-blue-400 cursor-pointer"
              >
                <option value="">Select</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-start text-sm font-medium text-gray-700 mb-2">
                User Group:
              </label>
              <input
                type="number"
                name="userGroup"
                value={formData.userGroup}
                onChange={handleChange}
                required
                className="w-full mb-6 px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-500 focus:outline-none shadow-md transition-all"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold shadow-lg hover:shadow-2xl transform transition-transform duration-300 hover:-translate-y-1 hover:scale-105"
          >
            <span className="text-lg uppercase tracking-wide">Register</span>
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
};

export default SignupPage;