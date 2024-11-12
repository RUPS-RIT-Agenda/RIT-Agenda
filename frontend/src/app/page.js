"use client";

import { useEffect, useState } from "react";
import './page.css';
import Calendar from "@/components/Calendar";
import StartupPage from "./startup";  
import UserProfile from "@/components/UserProfile";
const LandingPage = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const checkAuth = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/status`, {
                method: 'GET',
                credentials: 'include', 
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
                console.log(data.user);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            setUser(null);
        } finally {
            setIsLoading(false);
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

    if (isLoading) {
        return <div>Loading...</div>;
    }

    // If the user is not logged in, show the StartupPage
    if (!user) {
        return <StartupPage />;
    }

    // If the user is logged in, show the calendar
    return (
        <div className="pt-10 pl-20 pr-20">
            <Calendar user={user} />
        </div>
    );
};

export default LandingPage;
