import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="bg-blue text-white p-4 flex justify-end items-center shadow-md bg-blue-600">
            <div className="flex gap-8 text-xl font-semibold">
                <Link href="/" className="hover:text-teal-500">Home</Link>
                <Link href="/custom" className="hover:text-teal-500">Custom Event</Link>
                <Link href="/profile" className="hover:text-teal-500">Profile</Link>
                <Link href="/logout" className="hover:text-teal-500">Logout</Link>
            </div>
        </nav>
    );
}
