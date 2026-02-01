"use client"

import { Button } from "./ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
    Zap,
    Smartphone,
    MousePointer2,
    Layers,
    ChevronRight,
    Github,
    Layout,
    ArrowRight
} from "lucide-react"

const Landing = () => {
    const heroTitleRef = useRef<HTMLHeadingElement | null>(null)
    const containerRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (typeof window === "undefined") return
        gsap.registerPlugin(ScrollTrigger)

        const ctx = gsap.context(() => {
            // Hero Title Animation
            if (heroTitleRef.current) {
                gsap.from(heroTitleRef.current, {
                    y: 40,
                    opacity: 0,
                    duration: 1,
                    ease: "power4.out",
                })
            }
        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <div ref={containerRef} className="bg-background text-foreground min-h-screen selection:bg-accent selection:text-background">

            {/* --- HERO SECTION --- */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden px-6 lg:px-12">
                {/* Background Glows */}
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-accent/5 blur-[100px] rounded-full" />

                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
                    {/* Hero Content */}
                    <div className="flex-1 text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold mb-8 uppercase tracking-wider"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                            </span>
                            V1.0 is now live
                        </motion.div>

                        <h1 ref={heroTitleRef} className="text-5xl md:text-7xl font-bold leading-tight mb-8">
                            Award-Winning <br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-accent to-accent/60">UI Components</span>, <br />
                            For Free.
                        </h1>

                        <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed mx-auto lg:mx-0">
                            Experience a premium collection of pixel-perfect, high-performance web components
                            designed for the modern web. Built for speed, accessibility, and pure aesthetic joy.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                            <Button size="lg" className="rounded-full px-8 bg-accent text-background hover:bg-accent/90 shadow-lg shadow-accent/20 h-12">
                                Browse Library <ChevronRight className="ml-2 w-4 h-4" />
                            </Button>
                            <Button size="lg" variant="secondary" className="rounded-full px-8 bg-card-bg border border-card-border hover:bg-card-bg/80 h-12">
                                <Github className="mr-2 w-4 h-4" /> View on GitHub
                            </Button>
                        </div>
                    </div>

                    {/* Hero Illustration (Stacked Cards) */}
                    <div className="flex-1 relative w-full max-w-[500px] h-[400px]">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="relative w-full h-full"
                        >
                            {/* Bottom Card */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                className="absolute top-[20%] right-0 w-[80%] h-[200px] bg-[#1a1a1a] rounded-2xl border border-white/5 shadow-2xl p-6 overflow-hidden z-10"
                            >
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="w-8 h-2 rounded-full bg-white/10" />
                                    <div className="ml-auto w-10 h-4 rounded-full bg-accent/20 border border-accent/40 flex items-center px-1">
                                        <div className="w-2.5 h-2.5 rounded-full bg-accent ml-auto" />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="w-full h-2 rounded-full bg-white/5" />
                                    <div className="w-[80%] h-2 rounded-full bg-white/5" />
                                    <div className="w-[90%] h-2 rounded-full bg-white/5" />
                                </div>
                            </motion.div>

                            {/* Middle Card (Main Visual) */}
                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                                className="absolute top-0 left-0 w-[80%] h-[200px] bg-[#151515] rounded-2xl border border-white/5 shadow-2xl p-6 z-20"
                            >
                                <div className="flex items-center gap-2 mb-8">
                                    <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/40" />
                                    <div className="w-24 h-3 rounded-full bg-white/5" />
                                </div>
                                <div className="flex gap-4 items-end">
                                    <div className="w-4 h-12 bg-accent/20 rounded-t-sm" />
                                    <div className="w-4 h-24 bg-accent/40 rounded-t-sm" />
                                    <div className="w-4 h-16 bg-accent rounded-t-sm shadow-[0_0_15px_rgba(254,119,67,0.3)]" />
                                    <div className="w-4 h-20 bg-accent/60 rounded-t-sm" />
                                </div>
                            </motion.div>

                            {/* Top Floating Mini-Card */}
                            <motion.div
                                animate={{ y: [0, -15, 0], x: [0, 5, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                className="absolute top-[35%] left-[25%] w-[50%] h-[120px] bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl z-30 p-4 flex flex-col justify-center items-center"
                            >
                                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center mb-3">
                                    <Zap className="text-accent w-5 h-5 fill-accent/20" />
                                </div>
                                <div className="w-20 h-5 rounded bg-accent/80 shadow-lg shadow-accent/20" />
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* --- FEATURED COMPONENTS SECTION --- */}
            <section className="py-24 px-6 lg:px-12 bg-[#0a0a0a]/50">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-end justify-between mb-16">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Components</h2>
                            <p className="text-muted-foreground text-lg">Hand-picked interactive elements for your next project.</p>
                        </div>
                        <Link href="/component" className="hidden md:flex items-center gap-2 text-accent font-medium hover:underline">
                            View all 200+ components <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Featured Component 1 */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="group bg-[#151515] rounded-3xl border border-white/5 overflow-hidden flex flex-col transition-all hover:border-accent/30 hover:shadow-2xl hover:shadow-accent/5"
                        >
                            <div className="h-48 bg-[#1a1a1a] flex items-center justify-center p-8 relative overflow-hidden">
                                <div className="w-full bg-[#222] h-8 rounded-full border border-white/5 flex items-center px-4 gap-3">
                                    <div className="flex gap-1.5">
                                        <div className="w-2 h-2 rounded-full bg-red-500/50" />
                                        <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                                        <div className="w-2 h-2 rounded-full bg-green-500/50" />
                                    </div>
                                    <div className="flex-1 h-3 bg-white/5 rounded-full" />
                                    <div className="w-16 h-4 bg-accent/20 rounded-full border border-accent/40" />
                                </div>
                                {/* Glow */}
                                <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <div className="p-8">
                                <h3 className="text-xl font-bold mb-2">Sleek Navigation Bar</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">Responsive, accessible, and blur-ready for premium websites.</p>
                            </div>
                        </motion.div>

                        {/* Featured Component 2 */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="group bg-[#151515] rounded-3xl border border-white/5 overflow-hidden flex flex-col transition-all hover:border-accent/30 hover:shadow-2xl hover:shadow-accent/5"
                        >
                            <div className="h-48 bg-[#1a1a1a] flex items-center justify-center p-8 relative overflow-hidden">
                                <div className="w-48 bg-[#222] rounded-xl p-4 border border-white/5 space-y-3">
                                    <div className="w-full h-3 bg-white/10 rounded" />
                                    <div className="w-2/3 h-3 bg-white/5 rounded" />
                                    <div className="w-full h-8 bg-accent rounded-lg flex items-center justify-center font-bold text-[8px] uppercase tracking-tighter shadow-lg shadow-accent/20">Checkout</div>
                                </div>
                                {/* Glow */}
                                <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <div className="p-8">
                                <h3 className="text-xl font-bold mb-2">High-Conversion Checkout</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">Optimized flow with obsessive attention to detail and UX.</p>
                            </div>
                        </motion.div>

                        {/* Featured Component 3 */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="group bg-[#151515] rounded-3xl border border-white/5 overflow-hidden flex flex-col transition-all hover:border-accent/30 hover:shadow-2xl hover:shadow-accent/5"
                        >
                            <div className="h-48 bg-[#1a1a1a] flex items-center justify-center p-8 relative overflow-hidden">
                                <div className="flex gap-3 items-end h-20">
                                    <div className="w-4 h-8 bg-accent/30 rounded-t-sm" />
                                    <div className="w-4 h-16 bg-accent/50 rounded-t-sm" />
                                    <div className="w-4 h-12 bg-accent/70 rounded-t-sm" />
                                    <div className="w-4 h-20 bg-accent rounded-t-sm shadow-[0_0_10px_rgba(254,119,67,0.2)]" />
                                    <div className="w-4 h-6 bg-accent/40 rounded-t-sm" />
                                </div>
                                {/* Glow */}
                                <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <div className="p-8">
                                <h3 className="text-xl font-bold mb-2">Interactive Data Viz</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">Real-time charts powered by SVG and high-performance JS.</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* --- WHY CHOOSE SECTION --- */}
            <section className="py-32 px-6 lg:px-12">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-start">
                    <div className="lg:w-1/3">
                        <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                            Why Choose Our <br />
                            <span className="text-accent underline decoration-accent/30 underline-offset-8">Library?</span>
                        </h2>
                        <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                            Built with precision and performance in mind, our components help you scale faster
                            while maintaining a high-end look and feel.
                        </p>
                        <Button variant="outline" className="rounded-full border-accent/20 text-accent hover:bg-accent/10">
                            Learn more about our process
                        </Button>
                    </div>

                    <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Feature 1 */}
                        <div className="bg-[#111] p-8 rounded-3xl border border-white/5 hover:border-accent/20 transition-colors">
                            <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
                                <Layout className="text-accent w-6 h-6" />
                            </div>
                            <h4 className="text-xl font-bold mb-3">Pixel Perfect</h4>
                            <p className="text-muted-foreground text-sm">Every component is crafted with obsessive attention to detail and design specs.</p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-[#111] p-8 rounded-3xl border border-white/5 hover:border-accent/20 transition-colors">
                            <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
                                <Zap className="text-accent w-6 h-6" />
                            </div>
                            <h4 className="text-xl font-bold mb-3">Fast Performance</h4>
                            <p className="text-muted-foreground text-sm">Optimized for 100 lighthouse scores and zero layout shifts out of the box.</p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-[#111] p-8 rounded-3xl border border-white/5 hover:border-accent/20 transition-colors">
                            <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
                                <Github className="text-accent w-6 h-6" />
                            </div>
                            <h4 className="text-xl font-bold mb-3">Open Source</h4>
                            <p className="text-muted-foreground text-sm">Free to use for personal and commercial projects under the MIT license.</p>
                        </div>

                        {/* Feature 4 */}
                        <div className="bg-[#111] p-8 rounded-3xl border border-white/5 hover:border-accent/20 transition-colors">
                            <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
                                <Smartphone className="text-accent w-6 h-6" />
                            </div>
                            <h4 className="text-xl font-bold mb-3">Fully Responsive</h4>
                            <p className="text-muted-foreground text-sm">Works flawlessly across mobile, tablet, and desktop screens of all sizes.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- FOOTER --- */}
            <footer className="py-20 border-t border-white/5 px-6 lg:px-12">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-linear-to-tr from-accent to-accent/60" />
                        <span className="text-lg font-bold uppercase tracking-tighter">UI LIBRARY</span>
                    </div>

                    <div className="flex gap-8 text-sm text-muted-foreground">
                        <Link href="#" className="hover:text-accent transition-colors">Twitter</Link>
                        <Link href="#" className="hover:text-accent transition-colors">GitHub</Link>
                        <Link href="#" className="hover:text-accent transition-colors">Discord</Link>
                        <Link href="#" className="hover:text-accent transition-colors">Privacy</Link>
                    </div>

                    <p className="text-sm text-muted-foreground/50">
                        © 2024 UI Library. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    )
}

export default Landing