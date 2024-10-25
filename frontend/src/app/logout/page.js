 "use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Logout() {
    const router = useRouter();

    useEffect(() => {
        localStorage.removeItem("username");
        localStorage.removeItem("token");

        window.dispatchEvent(new Event("authChange"));

        router.push("/");
    }, [router]);

}
