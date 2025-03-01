


import { Head } from "@inertiajs/react";
import { UserCheck, ShieldCheck, BarChart3 } from "lucide-react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="min-h-screen bg-gradient-to-br from-green-500 to-purple-600 dark:from-gray-900 dark:to-black flex flex-col justify-center items-center text-center text-white px-6">
                
                {/* Header */}
                <Header auth={auth} />

                {/* Hero Section */}
                <section className="mt-12 max-w-2xl">
                    <h1 className="text-6xl font-extrabold drop-shadow-lg">
                        Welcome to <span className="text-yellow-300">People Management</span>
                    </h1>
                    <p className="mt-4 text-lg text-gray-100 drop-shadow">
                        The ultimate platform to streamline your workforce with efficiency and ease.
                    </p>

                    <div className="mt-6">
                        <a
                            href={route("register")}
                            className="px-8 py-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transform hover:scale-110 transition duration-300 text-lg font-semibold"
                        >
                            Get Started Now
                        </a>
                    </div>
                </section>

                {/* Features Section */}
                <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
                    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition duration-300 flex flex-col items-center">
                        <UserCheck size={50} className="text-blue-500 mb-4" />
                        <h3 className="text-xl font-bold">User Management</h3>
                        <p className="text-gray-600 dark:text-gray-300 mt-2 text-center">
                            Easily add, update, and remove users from the system with a simple UI.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition duration-300 flex flex-col items-center">
                        <ShieldCheck size={50} className="text-green-500 mb-4" />
                        <h3 className="text-xl font-bold">Secure Access</h3>
                        <p className="text-gray-600 dark:text-gray-300 mt-2 text-center">
                            Protect sensitive data with advanced role-based authentication.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition duration-300 flex flex-col items-center">
                        <BarChart3 size={50} className="text-purple-500 mb-4" />
                        <h3 className="text-xl font-bold">Analytics & Reports</h3>
                        <p className="text-gray-600 dark:text-gray-300 mt-2 text-center">
                            Gain insights into workforce data with powerful analytics tools.
                        </p>
                    </div>
                </section>

                {/* Fun Fact Section */}
                <section className="mt-12 max-w-3xl">
                    <h2 className="text-3xl font-bold text-yellow-300">Did You Know? 🤔</h2>
                    <p className="text-lg mt-4 text-gray-100">
                        Businesses that use efficient workforce management systems report a 30% boost in productivity!
                    </p>
                </section>

                {/* Footer */}
                <Footer laravelVersion={laravelVersion} phpVersion={phpVersion} />
            </div>
        </>
    );
}
