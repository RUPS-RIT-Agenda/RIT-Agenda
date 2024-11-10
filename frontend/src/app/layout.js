"use client";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";
import { useEffect, useState } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const checkAuth = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/status`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setIsLoggedIn(true);
        setUser(data.user);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuth();

    const handleAuthChange = () => {
      checkAuth();
    };

    window.addEventListener("authChange", handleAuthChange);

    return () => {
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen overflow-hidden bg-gradient-to-r from-gray-100 to-gray-200 relative`}
      >
        {/* Simplified Background Circles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="floating-circle top-5 left-20 w-20 h-20 bg-blue-300 opacity-40 rounded-full blur-xl"></div>
          {/* Removed the bottom right teal circle */}
        </div>

        {/* Conditionally Render Navbar */}
        {isLoggedIn && (
          <nav className="fixed top-0 left-0 w-full z-10 bg-gradient-to-br from-blue-600 to-cyan-600 text-white px-8 py-4 flex justify-between items-center shadow-md">
            <Link
              href="/"
              className="text-base font-medium transform transition-transform hover:scale-105"
            >
              {/* Home */}
            </Link>
            <div className="flex items-center gap-4">
              <Link
                href="/logout"
                className="py-2 px-4 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-md font-semibold text-white transform transition-transform duration-150 hover:bg-blue-400 hover:shadow-md"
              >
                Log Out
              </Link>
              <h4 className="text-base font-light">Welcome, {user && user.username}</h4>
            </div>
          </nav>
        )}

        <main className={`${isLoggedIn ? "pt-20" : ""} p-4`}>{children}</main>

        <style jsx>{`
          .floating-circle {
            position: absolute;
          }

          .animate-bounce-slow {
            animation: bounce 8s infinite alternate ease-in-out;
          }

          @keyframes bounce {
            0%,
            100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-15px);
            }
          }
        `}</style>
      </body>
    </html>
  );
}
