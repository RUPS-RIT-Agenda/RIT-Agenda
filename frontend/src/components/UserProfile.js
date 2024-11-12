"use client";

import { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaBirthdayCake, FaGraduationCap, FaSchool, FaUsers } from "react-icons/fa";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/status`, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return <div className="text-center text-blue-600">Loading...</div>;
  }

  if (!user) {
    return <div className="text-center text-red-600">User not found.</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen overflow-hidden relative">
      {/* Fun Floating Circles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-circle top-10 left-20 w-40 h-40 bg-gradient-to-br from-blue-300 to-cyan-400 opacity-30 rounded-full blur-3xl animate-bounce-slow"></div>
        <div className="floating-circle bottom-10 right-20 w-48 h-48 bg-gradient-to-br from-green-300 to-teal-400 opacity-30 rounded-full blur-3xl animate-bounce-slow"></div>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl p-16 flex flex-col items-center space-y-10 text-center">
        <h2 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
          User Profile
        </h2>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          <ProfileField label="Username" value={user.username} icon={<FaUser />} />
          <ProfileField label="Email" value={user.email} icon={<FaEnvelope />} />
          <ProfileField label="Date of Birth" value={formatDate(user.dateOfBirth)} icon={<FaBirthdayCake />} />
          <ProfileField label="Study Cycle" value={user.studyCycle} icon={<FaGraduationCap />} />
          <ProfileField label="School Year" value={user.schoolYear} icon={<FaSchool />} />
          <ProfileField label="User Group" value={user.userGroup} icon={<FaUsers />} />
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
};

const ProfileField = ({ label, value, icon }) => (
  <div className="w-full px-6 py-4 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg shadow-md flex items-center space-x-4 hover:shadow-lg transition-shadow duration-300 ease-in-out">
    <div className="text-blue-600 text-2xl">{icon}</div>
    <div className="flex flex-col items-start">
      <span className="font-semibold text-blue-600">{label}:</span>
      <span className="text-xl text-gray-900">{value || "N/A"}</span>
    </div>
  </div>
);

export default UserProfile;
