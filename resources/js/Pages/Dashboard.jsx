

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, stats }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-bold text-2xl text-white leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            {/* Dashboard Background */}
            <div className="py-12 bg-gradient-to-r from-green-500 to-blue-600 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Greeting */}
                    <div className="mb-6 text-center text-white">
                        <h1 className="text-3xl font-bold">Welcome, {auth.user.name}! 🎉</h1>
                        <p className="text-lg mt-2">Here’s a quick overview of your data.</p>
                    </div>

                    {/* Stats Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {/* Total People */}
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                            <h3 className="text-xl font-semibold text-gray-700">Total People</h3>
                            <p className="text-3xl font-bold text-indigo-600 mt-2">{stats.totalPeople}</p>
                        </div>

                        {/* Total Languages */}
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                            <h3 className="text-xl font-semibold text-gray-700">Total Languages</h3>
                            <p className="text-3xl font-bold text-indigo-600 mt-2">{stats.totalLanguages}</p>
                        </div>

                        {/* Total Interests */}
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                            <h3 className="text-xl font-semibold text-gray-700">Total Interests</h3>
                            <p className="text-3xl font-bold text-indigo-600 mt-2">{stats.totalInterests}</p>
                        </div>
                    </div>

                    {/* Info Card */}
                    <div className="mt-8 bg-white overflow-hidden shadow-lg rounded-lg">
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-800">You're logged in! ✅</h3>
                            <p className="text-gray-600 mt-2">Explore your dashboard and manage your data efficiently.</p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
