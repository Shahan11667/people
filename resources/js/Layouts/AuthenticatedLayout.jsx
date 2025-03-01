

import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import { Link } from '@inertiajs/react';

export default function Authenticated({ user, header, children }) {
    const [showNav, setShowNav] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
           
            <nav className="bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
           
                        <div className="flex items-center space-x-4">
                            <Link href="/dashboard" className="flex items-center">
                               <img src="https://png.pngtree.com/png-clipart/20200710/original/pngtree-colorful-family-human-people-logo-vector-icon-png-image_4242162.jpg" className="h-8 w-8" alt="Logo" />
                                                           </Link>

           
                            <div className="hidden sm:flex space-x-4">
                                <Link href="/dashboard">
                                    <button className="px-4 py-2 rounded-md bg-white text-purple-600 font-semibold transition duration-300 hover:bg-gray-200">
                                        Dashboard
                                    </button>
                                </Link>
                                <Link href="/people">
                                    <button className="px-4 py-2 rounded-md bg-white text-purple-600 font-semibold transition duration-300 hover:bg-gray-200">
                                        People
                                    </button>
                                </Link>
                                <Link href="/languages">
                                    <button className="px-4 py-2 rounded-md bg-white text-purple-600 font-semibold transition duration-300 hover:bg-gray-200">
                                        Languages
                                    </button>
                                </Link>
                                <Link href="/interests">
                                    <button className="px-4 py-2 rounded-md bg-white text-purple-600 font-semibold transition duration-300 hover:bg-gray-200">
                                        Interests
                                    </button>
                                </Link>
                            </div>
                        </div>

                        <div className="hidden sm:flex items-center space-x-3">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button
                                        type="button"
                                        className="flex items-center px-4 py-2 bg-white text-purple-600 font-semibold rounded-md transition duration-300 hover:bg-gray-200"
                                    >
                                        {user.name}
                                        <svg className="ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                        </svg>
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <Dropdown.Link href="/profile">Profile</Dropdown.Link>
                                    <Dropdown.Link href="/logout" method="post" as="button">
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>

                        {/* Mobile Navigation Toggle */}
                        <div className="sm:hidden">
                            <button
                                onClick={() => setShowNav(!showNav)}
                                className="p-2 rounded-md text-white hover:bg-white hover:text-purple-600 transition duration-300"
                            >
                                <svg className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={showNav ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {showNav && (
                    <div className="sm:hidden bg-white text-purple-600">
                        <div className="py-2 space-y-1 flex flex-col items-center">
                            <Link href="/dashboard">
                                <button className="w-full px-4 py-2 font-semibold transition duration-300 hover:bg-gray-200">
                                    Dashboard
                                </button>
                            </Link>
                            <Link href="/people">
                                <button className="w-full px-4 py-2 font-semibold transition duration-300 hover:bg-gray-200">
                                    People
                                </button>
                            </Link>
                            <Link href="/languages">
                                <button className="w-full px-4 py-2 font-semibold transition duration-300 hover:bg-gray-200">
                                    Languages
                                </button>
                            </Link>
                            <Link href="/interests">
                                <button className="w-full px-4 py-2 font-semibold transition duration-300 hover:bg-gray-200">
                                    Interests
                                </button>
                            </Link>
                        </div>

                        <div className="border-t border-gray-200">
                            <div className="px-4 py-3 text-center">
                                <div className="font-semibold">{user.name}</div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                            </div>

                            <div className="pb-3 space-y-1 flex flex-col items-center">
                                <Link href="/profile">
                                    <button className="w-full px-4 py-2 font-semibold transition duration-300 hover:bg-gray-200">
                                        Profile
                                    </button>
                                </Link>
                                <Link href="/logout" method="post" as="button">
                                    <button className="w-full px-4 py-2 font-semibold text-red-600 transition duration-300 hover:bg-gray-200">
                                        Log Out
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {/* Page Header */}
            {header && (
                <header className="">
                    {/* <div className="p-6">{header}</div> */}
                </header>
            )}

            {/* Page Content */}
            <main className="">{children}</main>
        </div>
    );
}
