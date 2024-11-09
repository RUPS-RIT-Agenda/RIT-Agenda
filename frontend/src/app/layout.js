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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/status`, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setIsLoggedIn(true);
        setUser(data.user);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
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
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/* Conditionally Render Navbar */}
        {isLoggedIn && (
          <nav
            className="fixed top-0 left-0 w-full z-10 text-white px-10 py-4 flex justify-between items-center"
            style={{ backgroundColor: "#2d3f50" }}
          >
            <Link href="/">Home</Link>
            <div className="flex items-center gap-4">
              <Link href="logout">Log Out</Link>
              <h4>Welcome, {user && user.username}</h4>
            </div>
          </nav>
        )}
        <main className={isLoggedIn ? "pt-16" : ""}>{children}</main>
      </body>
    </html>
  );
}
