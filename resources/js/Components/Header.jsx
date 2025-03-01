import { Link } from "@inertiajs/react";

export default function Header({ auth }) {
    return (
        <div className="absolute top-0 right-0 p-6">
            {auth.user ? (
                <Link
                    href={route("dashboard")}
                    className="text-lg font-semibold text-white hover:text-gray-200"
                >
                    Dashboard
                </Link>
            ) : (
                <>
                    <Link
                        href={route("login")}
                        className="text-lg font-semibold text-white hover:text-gray-200 mx-2"
                    >
                        Log in
                    </Link>

                    <Link
                        href={route("register")}
                        className="px-6 py-2 bg-yellow-500 text-white rounded-lg shadow-lg hover:bg-yellow-600 transform hover:scale-105 transition duration-300"
                    >
                        Get Started
                    </Link>
                </>
            )}
        </div>
    );
}
