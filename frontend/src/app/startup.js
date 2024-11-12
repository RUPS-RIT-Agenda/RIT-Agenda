"use client";
import { useRouter } from "next/navigation";
import "./page.css";

export default function StartupPage() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-r from-gray-200 via-blue-200 to-gray-300 relative">
      {/* Fun Floating Circles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-circle top-10 left-20 w-32 h-32 bg-gradient-to-br from-blue-400 to-cyan-400 opacity-50 rounded-full blur-2xl animate-bounce-slow"></div>
        <div className="floating-circle bottom-10 right-20 w-40 h-40 bg-gradient-to-br from-green-400 to-teal-500 opacity-50 rounded-full blur-3xl animate-bounce-slow"></div>
      </div>

      {/* Main Container with Illustration and Form */}
      <div className="bg-white rounded-3xl shadow-2xl flex w-full max-w-7xl overflow-hidden p-16">
        {/* Left Side - Illustration Section (properly centered image) */}
        <div className="flex w-2/3 bg-gradient-to-br from-blue-600 to-cyan-600 p-16 flex-col items-center justify-center relative">
          <div className="w-full max-w-lg h-full flex items-center justify-center">
            <img
              src="/cal.svg" // Correct reference for the SVG image in your public folder
              alt="Calendar Illustration"
              className="w-auto h-auto max-h-full max-w-full"
            />
          </div>
        </div>

        {/* Right Side - Login/Signup Form */}
        <div className="w-1/3 px-16 py-24 flex flex-col justify-center items-center text-center">
          <h1 className="text-6xl font-extrabold mb-10 text-gray-900 leading-tight tracking-tight">
            Welcome!
          </h1>
          <p className="text-xl text-gray-600 mb-16 leading-relaxed tracking-wide">
            Sign in to your account or register to get started.
          </p>

          <div className="flex flex-col gap-8 w-full max-w-md">
            <button
              onClick={() => router.push("/login")}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-1 hover:scale-105"
            >
              <span className="text-lg uppercase tracking-wide">Log In</span>
            </button>
            <button
              onClick={() => router.push("/register")}
              className="w-full py-4 bg-gradient-to-r from-teal-500 to-green-500 text-white rounded-lg font-semibold shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-1 hover:scale-105"
            >
              <span className="text-lg uppercase tracking-wide">Sign Up</span>
            </button>
          </div>
        </div>
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
