"use client"
import { BackgroundGradientAnimation } from "./ui/background-gradient-animation"
import { Button } from "./ui/button"
import Link from "next/link"
import { FaCode } from "react-icons/fa6"
import { AiOutlineBgColors } from "react-icons/ai"
import { BsFillLightningChargeFill } from "react-icons/bs"
import { FeatureCard } from "./ui/feature_card"
import { ComponentPreview } from "../components/ComponentPreview" // Ensure this path is correct
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const Landing = () => {
    const heroTitleRef = useRef<HTMLHeadingElement | null>(null)
    const heroDescRef = useRef<HTMLParagraphElement | null>(null)
    const buttonsRef = useRef<HTMLDivElement | null>(null)
    const showcaseRef = useRef<HTMLDivElement | null>(null)
    const featuresRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (typeof window === "undefined") return
        const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (reduce) return
        gsap.registerPlugin(ScrollTrigger)
        const ctx = gsap.context(() => {
            // Hero Text Animations
            if (heroTitleRef.current) {
                gsap.from(heroTitleRef.current, {
                    y: 20,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    clearProps: "opacity,transform",
                })
            }
            if (heroDescRef.current) {
                gsap.from(heroDescRef.current, {
                    y: 14,
                    opacity: 0,
                    duration: 0.8,
                    delay: 0.1,
                    ease: "power3.out",
                    clearProps: "opacity,transform",
                })
            }
            if (buttonsRef.current) {
                gsap.from(buttonsRef.current.children, {
                    y: 12,
                    opacity: 0,
                    duration: 0.6,
                    stagger: 0.08,
                    delay: 0.2,
                    ease: "power3.out",
                    clearProps: "opacity,transform",
                })
            }

            // Hero Showcase Animation (Slide from right)
            if (showcaseRef.current) {
                gsap.from(showcaseRef.current, {
                    x: 40,
                    opacity: 0,
                    duration: 1,
                    delay: 0.3,
                    ease: "power3.out",
                    clearProps: "opacity,transform",
                })
            }

            // Feature Cards Animation
            if (featuresRef.current) {
                const items = Array.from(featuresRef.current.children) as HTMLElement[]
                gsap.set(items, { opacity: 0, y: 16 })
                gsap.to(items, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.08,
                    ease: "power3.out",
                    overwrite: "auto",
                    scrollTrigger: {
                        trigger: featuresRef.current,
                        start: "top 90%",
                        once: true,
                    },
                    clearProps: "opacity,transform",
                })
            }
        })
        return () => ctx.revert()
    }, [])

    return (
        <main className="relative min-h-screen w-full overflow-hidden bg-background">

            {/* Interactive Background Animation Layer */}
            <div className="absolute inset-0 opacity-40">
                <BackgroundGradientAnimation />
            </div>

            {/* Gradient Overlay / Vignette */}
            <div className="absolute inset-0 z-1 pointer-events-none bg-background mask-[linear-gradient(to_bottom,black_0%,transparent_10%,transparent_90%,black_100%)]" />


            {/* Content Container */}
            <div className="relative z-30 flex flex-col min-h-screen pointer-events-none">

                {/* Hero Section */}
                <section className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24">
                    <div className="max-w-7xl mx-auto  w-full grid pt-6 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

                        {/* Left Column: Text & CTA */}
                        <div className="text-center lg:text-left text-balance space-y-6 sm:space-y-8 order-2 lg:order-1">
                            <h1 ref={heroTitleRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                                Beautiful React <br className="hidden lg:block" />
                                <span className="text-primary">Components</span>
                            </h1>
                            <p ref={heroDescRef} className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                                Copy-paste ready components built with React, Tailwind CSS, and modern web technologies.
                                No dependencies, fully customizable, and production-ready.
                            </p>

                            {/* CTA Buttons */}
                            <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start items-center pt-4 pointer-events-auto">
                                <Button size="lg" asChild className="w-full sm:w-auto">
                                    <Link href="/component">
                                        Explore Components
                                    </Link>
                                </Button>
                                <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
                                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                                        View on GitHub
                                    </a>
                                </Button>
                            </div>
                        </div>

                        {/* Right Column: Component Showcase Box */}
                        <div ref={showcaseRef} className="lg:order-2  flex justify-center lg:justify-end pointer-events-auto relative">

                            {/* Decorative glowing orb behind the card to mimic depth */}
                            <div className="absolute -top-20 -right-20 w-64 h-64  rounded-full blur-[100px] -z-10" />

                            {/* Reusable ComponentPreview used here */}
                            <ComponentPreview
                                title=""
                                className="w-full max-w-lg"
                                align="center"
                            >
                                <div className="m-auto w-fit">Some Interactive Component</div>
                            </ComponentPreview>
                        </div>

                    </div>
                </section>

                {/* Features Section */}
                <section className="px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 md:pb-20">
                    <div className="max-w-7xl mx-auto">
                        <div
                            ref={featuresRef}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 [&>*:last-child]:sm:col-span-2 [&>*:last-child]:lg:col-span-1"
                        >
                            <FeatureCard
                                icon={<FaCode className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />}
                                title="Easy Integration"
                                description="Simply copy the code and paste it into your project. No complex setup required."
                            />
                            <FeatureCard
                                icon={<AiOutlineBgColors className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />}
                                title="Fully Customizable"
                                description="Every component is built with Tailwind CSS, making customization a breeze."
                            />
                            <FeatureCard
                                icon={<BsFillLightningChargeFill className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />}
                                title="Modern & Fast"
                                description="Built with the latest React patterns and optimized for performance."
                            />
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}

export default Landing