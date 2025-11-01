import { BackgroundGradientAnimation } from "./ui/background-gradient-animation"
import { Button } from "./ui/button"
import Link from "next/link"
import { FaCode } from "react-icons/fa6"
import { AiOutlineBgColors } from "react-icons/ai"
import { BsFillLightningChargeFill } from "react-icons/bs"
import { FeatureCard } from "./ui/feature_card"

const Landing = () => {
    return (
        <main className="relative min-h-screen w-full overflow-hidden">
            {/* Interactive Background Animation Layer */}
            <div className="absolute inset-0 opacity-40">
                <BackgroundGradientAnimation />
            </div>

            {/* Content Container - Blocks pointer events by default */}
            <div className="relative z-10 flex flex-col min-h-screen pointer-events-none">
                {/* Hero Section */}
                <section className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
                    <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                            Beautiful React Components
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
                            Copy-paste ready components built with React, Tailwind CSS, and modern web technologies.
                            No dependencies, fully customizable, and production-ready.
                        </p>

                        {/* CTA Buttons - Enable pointer events */}
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-4 pointer-events-auto">
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
                </section>

                {/* Features Section */}
                <section className="px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 md:pb-20">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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