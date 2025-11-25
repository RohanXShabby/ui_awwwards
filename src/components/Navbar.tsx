"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import ThemeToggle from "./ThemeToggle"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { HiMenu, HiX } from "react-icons/hi"
import { FaGithub } from "react-icons/fa"
import { motion } from "framer-motion"

const Navbar = () => {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)
    const [hoveredPath, setHoveredPath] = useState<string | null>(null)
    const [starCount, setStarCount] = useState<number | null>(null)

    // Check if we are on the home page
    const isHome = pathname === "/"

    const navItems = [
        { name: "Components", href: "/component" },
        { name: "Templates", href: "/template" },
        { name: "Pricing", href: "/pricing" },
    ]

    // 🌟 Fetch GitHub Stars
    useEffect(() => {
        fetch("https://api.github.com/repos/shadcn/ui")
            .then((res) => res.json())
            .then((data) => setStarCount(data.stargazers_count))
            .catch(() => setStarCount(1200))
    }, [])

    const formatStars = (count: number) => {
        if (count >= 1000) {
            return (count / 1000).toFixed(1) + "k"
        }
        return count
    }

    return (
        <nav className="sticky top-0 inset-x-0 z-40 flex flex-col items-center pointer-events-none">

            <div className={cn(
                "relative flex items-center justify-between bg-background/60 backdrop-blur-2xl pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",

                // 1. LAYOUT LOGIC
                isHome
                    ? "w-[92%] md:w-[70%] max-w-6xl rounded-2xl md:rounded-4xl border border-white/10 shadow-lg mt-2 md:mt-4 py-3 px-4 md:px-6"
                    // ^ Added max-w-6xl: Prevents floating island from being too wide on 4k screens

                    : "w-full max-w-[1920px] rounded-none border-b border-white/5 py-3 px-4 md:px-12"
                // ^ Added max-w-[1920px]: Matches your RootLayout constraint so lines align perfectly
            )}>

                {/* Left: Logo */}
                <Link
                    href="/"
                    className="text-lg font-bold tracking-tight flex items-center gap-2 text-foreground hover:opacity-80 transition-opacity"
                    onClick={() => setIsOpen(false)}
                >
                    <div className="w-5 h-5 rounded bg-linear-to-tr from-accent to-primary" />
                    <span className="hidden sm:inline">UI Library</span>
                    <span className="sm:hidden">UI</span>
                </Link>

                {/* Center: Desktop Menu */}
                <div
                    className="hidden md:flex items-center gap-1 bg-white/5 rounded-full px-1.5 py-1 border border-white/5"
                    onMouseLeave={() => setHoveredPath(null)}
                >
                    {navItems.map((item) => {
                        const isActive = pathname === item.href
                        const isHovered = hoveredPath === item.href

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onMouseEnter={() => setHoveredPath(item.href)}
                                className={cn(
                                    "relative px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200",
                                    isActive ? "text-white" : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {isHovered && (
                                    <motion.div
                                        layoutId="navbar-hover"
                                        className="absolute inset-0 bg-white/10 rounded-full z-0"
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                )}
                                {isActive && (
                                    <motion.div
                                        layoutId="navbar-active"
                                        className="absolute inset-0 bg-accent rounded-full z-0 shadow-sm"
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">{item.name}</span>
                            </Link>
                        )
                    })}
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-3">
                    <Link
                        href="https://github.com/your-username/your-repo"
                        target="_blank"
                        className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
                    >
                        <FaGithub className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                        <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">Star</span>
                        {starCount !== null && (
                            <>
                                <div className="w-px h-3 bg-white/10" />
                                <span className="text-xs font-mono text-muted-foreground group-hover:text-accent transition-colors">
                                    {formatStars(starCount)}
                                </span>
                            </>
                        )}
                    </Link>

                    <Link href="https://github.com" target="_blank" className="sm:hidden text-muted-foreground hover:text-foreground transition-colors">
                        <FaGithub size={20} />
                    </Link>

                    <div className="w-px h-4 bg-white/10 hidden sm:block" />

                    <ThemeToggle />

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-white/10 transition-colors"
                    >
                        {isOpen ? <HiX size={20} /> : <HiMenu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown (Also constrained) */}
            <div className={cn(
                "absolute top-full left-0 right-0 p-4 pointer-events-auto md:hidden transition-all duration-300 ease-in-out origin-top",
                isOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-4 scale-95 pointer-events-none"
            )}>
                {/* Added max-w-[1920px] here too just in case */}
                <div className="w-full max-w-[1920px] mx-auto bg-card/90 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-xl flex flex-col gap-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                    "px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                                    isActive ? "bg-accent/10 text-accent" : "text-muted-foreground hover:bg-white/5"
                                )}
                            >
                                {item.name}
                            </Link>
                        )
                    })}
                </div>
            </div>
        </nav>
    )
}

export default Navbar