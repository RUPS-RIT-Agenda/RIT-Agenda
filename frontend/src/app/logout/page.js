 "use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Logout() {
    const router = useRouter();

    useEffect(() => {
        const logout = async () => {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
                method: 'POST',
                credentials: 'include', // Ensure cookies are sent with the request
            });

            window.dispatchEvent(new Event("authChange"));
            router.push("/");
        };

        logout();
    }, [router]);


}
