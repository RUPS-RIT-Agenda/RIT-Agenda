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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
            alert("User registered successfully!");
        } else {
            alert(data.message || "Something went wrong");
        }
    };

    return (
        <div style={{padding: "2rem"}}>
            <h1>Sign Up</h1>
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
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
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
                <div>
                    <label>Date of Birth:</label>
                    <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Study Cycle:</label>
                    <select
                        name="studyCycle"
                        value={formData.studyCycle}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select</option>
                        <option value="UNI">UNI</option>
                        <option value="MAG">MAG</option>
                    </select>
                </div>
                <div>
                    <label>School Year:</label>
                    <select
                        name="schoolYear"
                        value={formData.schoolYear}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>
                <div>
                    <label>User Group:</label>
                    <input
                        type="number"
                        name="userGroup"
                        value={formData.userGroup}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default SignupPage;
