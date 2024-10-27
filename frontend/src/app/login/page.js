"use client";

import {useState} from "react";
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
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
                credentials: 'include',
            });

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
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center text-gray-800">Log In</h1>
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
                    <button
                        type="submit"
                        className="w-full py-2 mt-4 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:outline-none"
                    >
                        Log In
                    </button>
                </form>
            </div>
        </div>
    );
}
