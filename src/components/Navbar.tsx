"use client"

import ThemeToggle from "./ThemeToggle"
import Link from "next/link"

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                <div className="flex items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-2xl sm:rounded-3xl bg-card-bg/10 backdrop-blur-md shadow-lg ">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="text-xl sm:text-2xl font-bold pointer-events-auto text-foreground hover:text-accent transition-colors duration-200"
                    >
                        Logo
                    </Link>

                    {/* Theme Toggle */}
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    )
}

export default Navbar