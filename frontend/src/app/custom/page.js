"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddCustomEvent() {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        starttime: "",
        endtime: "",
        location: "",
    });

    const [errorMessage, setErrorMessage] = useState("");

    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/custom-event/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
                credentials: "include",
            });

            if (res.ok) {
                console.log("Successfully added custom-event");
                // Redirect or provide feedback as needed
            } else {
                const data = await res.json();
                setErrorMessage(data.message || "Failed to add event");
            }
        } catch (error) {
            console.error("An error occurred:", error);
            setErrorMessage("An error occurred while submitting the form.");
        }
    };

    return (
        <div className="flex items-center justify-center relative">

            {/* Main Form Container */}
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-10 flex flex-col items-center space-y-6 text-center">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Add Custom Event</h1>
                {errorMessage && (
                    <p className="text-lg text-red-500 font-semibold">
                        {errorMessage}
                    </p>
                )}
                <form onSubmit={handleSubmit} className="w-full space-y-4">
                    <div>
                        <label className="block text-start text-sm font-medium text-gray-700 mb-2">
                            Event Name:
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-500 focus:outline-none shadow-md transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-start text-sm font-medium text-gray-700 mb-2">
                            Description:
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-500 focus:outline-none shadow-md transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-start text-sm font-medium text-gray-700 mb-2">
                            Start Time:
                        </label>
                        <input
                            type="datetime-local"
                            name="starttime"
                            value={formData.starttime}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-500 focus:outline-none shadow-md transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-start text-sm font-medium text-gray-700 mb-2">
                            End Time:
                        </label>
                        <input
                            type="datetime-local"
                            name="endtime"
                            value={formData.endtime}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-500 focus:outline-none shadow-md transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-start text-sm font-medium text-gray-700 mb-2">
                            Location:
                        </label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-500 focus:outline-none shadow-md transition-all"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-4 bg-blue-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-2xl transform transition-transform duration-300 hover:-translate-y-1 hover:scale-105"
                    >
                        <span className="text-lg tracking-wide">Add Event</span>
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
}
