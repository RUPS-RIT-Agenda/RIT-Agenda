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
        <div style={{ padding: "2rem" }}>
            <h1>Log In</h1>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} {/* Display error message */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Log In</button>
            </form>
        </div>
    );
}
