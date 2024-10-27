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

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
            console.log("User registered successfully!", data);
        } else {
            console.error("Register failed:", data.message);
            setErrorMessage(data.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center text-gray-800">Sign Up</h1>
                {errorMessage && (
                    <p className="text-sm text-center text-red-500">
                        {errorMessage}
                    </p>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 mt-1 text-gray-700 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 mt-1 text-gray-700 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 mt-1 text-gray-700 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Date of Birth:</label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            className="w-full px-3 py-2 mt-1 text-gray-700 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Study Cycle:</label>
                        <select
                            name="studyCycle"
                            value={formData.studyCycle}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 mt-1 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            <option value="">Select</option>
                            <option value="UNI">UNI</option>
                            <option value="MAG">MAG</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">School Year:</label>
                        <select
                            name="schoolYear"
                            value={formData.schoolYear}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 mt-1 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            <option value="">Select</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">User Group:</label>
                        <input
                            type="number"
                            name="userGroup"
                            value={formData.userGroup}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 mt-1 text-gray-700 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 mt-4 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:outline-none"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;
