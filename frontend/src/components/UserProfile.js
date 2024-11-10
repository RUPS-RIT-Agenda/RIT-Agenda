"use client";

import { useState, useEffect } from "react";

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

  if (isLoading) {
    return <div className="text-center text-blue-600">Loading...</div>;
  }

  if (!user) {
    return <div className="text-center text-red-600">User not found.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-20 p-10 bg-gradient-to-r from-blue-100 to-cyan-100 shadow-xl rounded-3xl">
      <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-cyan-600 mb-8 text-center">
        User Profile
      </h2>
      <div className="space-y-6">
        <ProfileField label="Username" value={user.username} />
        <ProfileField label="Email" value={user.email} />
        <ProfileField label="Date of Birth" value={user.dateOfBirth} />
        <ProfileField label="Study Cycle" value={user.studyCycle} />
        <ProfileField label="School Year" value={user.schoolYear} />
        <ProfileField label="User Group" value={user.userGroup} />
      </div>
    </div>
  );
};

const ProfileField = ({ label, value }) => (
  <div className="flex justify-between p-4 bg-white rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105">
    <span className="font-semibold text-blue-600">{label}:</span>
    <span className="text-lg text-gray-800">{value || "N/A"}</span>
  </div>
);

export default UserProfile;
