import React, { useRef } from 'react';
import { CodeViewer } from '../../CodeViewer';
import { ComponentPreview } from '../../ComponentPreview';
import { ParallaxCards } from '@/content/Cards/parallax_card';
import { Usecase } from '../../Usecase';


export const ParallaxCardDemo: React.FC = () => {

    const scrollRef = useRef<HTMLDivElement>(null);

    const images = [
        "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
        "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80",
        "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
        "https://images.unsplash.com/photo-1682686581854-5e71f58e7e3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
        "https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
    ];

    const exampleCode = `"use client";

import React from "react";
import {
    useScroll,
    useTransform,
    motion,
    type MotionValue,
} from "motion/react";

import { cn } from "@/lib/utils";

export interface ParallaxCardsProps
    extends React.ComponentPropsWithoutRef<"div"> {
    images: string[];
    maxStackedCards?: number;
    top?: React.CSSProperties["top"];
    forceParallax?: boolean;
    width?: string | number;
    height?: string | number;
}

export function ParallaxCards({
    images,
    maxStackedCards = 3,
    top = "50px",
    forceParallax = false,
    width = "100%",
    height = "500px",
    className,
    style,
    ...rest
}: ParallaxCardsProps) {
    const totalCards = images.length;
    const topMagnitude = parseFloat(String(top));
    const topUnit = String(top).slice(String(topMagnitude).length) || "px";

    if (topUnit === "%")
        throw new Error(
            "Invalid \`top\` value: percentages (%) are not supported by <ParallaxCards/>.",
        );
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [isSticky, setIsSticky] = React.useState(true);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    React.useEffect(() => {
        if (forceParallax) return;

        const element = containerRef.current;
        if (!element) return;

        const handleResize = () => {
            const cardHeight = element.getBoundingClientRect().height / totalCards;
            const viewportHeight =
                window.visualViewport?.height ?? window.innerHeight;
            setIsSticky(viewportHeight >= cardHeight);
        };

        handleResize();
        window.visualViewport?.addEventListener("resize", handleResize);
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.visualViewport?.removeEventListener("resize", handleResize);
        };
    }, [totalCards, forceParallax]);

    return (
        <>
            <style>{\`
        html {
          scroll-behavior: smooth;
        }
      \`}</style>

            <div
                ref={containerRef}
                className={cn("w-full relative! grid! py-0!", className)}
                style={{
                    ...style,
                    width,
                    gridTemplateRows: \`repeat(\${totalCards}, 1fr)\`,
                }}
                {...rest}
            >
                {images.map((image, index) => (
                    <ParallaxCard
                        key={\`cards[\${index}]\`}
                        index={index}
                        scrollYProgress={scrollYProgress}
                        scrollRatio={1 / totalCards}
                        maxStackedCards={maxStackedCards}
                        top={{
                            magnitude: topMagnitude,
                            unit: topUnit,
                            absolute: topMagnitude + topUnit,
                        }}
                        isSticky={isSticky}
                        forceParallax={forceParallax}
                        height={height}
                    >
                        <img
                            src={image}
                            alt={\`Parallax card \${index + 1}\`}
                            className="size-full object-cover rounded-xl"
                        />
                    </ParallaxCard>
                ))}
            </div>
        </>
    );
}

interface CardProps {
    index: number;
    scrollYProgress: MotionValue<number>;
    scrollRatio: number;
    children: React.ReactElement;
    isSticky: boolean;
    maxStackedCards: number;
    top: {
        magnitude: number;
        unit: string;
        absolute: string;
    };
    forceParallax: boolean;
    height: string | number;
}

function ParallaxCard({
    index,
    scrollYProgress,
    maxStackedCards,
    scrollRatio,
    children,
    top,
    isSticky,
    forceParallax,
    height,
}: CardProps) {
    const y = useTransform(
        scrollYProgress,
        [
            index * scrollRatio,
            (index + maxStackedCards - 1) * scrollRatio,
            (index + maxStackedCards) * scrollRatio,
        ],
        [
            "0",
            \`-\${top.absolute}\`,
            \`\${-top.magnitude - top.magnitude / (maxStackedCards - 1)}\${top.unit}\`,
        ],
    );

    const scale = useTransform(
        scrollYProgress,
        [index * scrollRatio, (index + maxStackedCards) * scrollRatio],
        [1, 0.8],
    );

    const opacity = useTransform(
        scrollYProgress,
        [
            index * scrollRatio,
            (index + maxStackedCards) * scrollRatio,
        ],
        [1, 0],
    );

    return (
        <div
            style={{
                paddingTop: top.absolute,
                position: isSticky ? "sticky" : "relative",
                top: "0px",
                height: height,
            }}
        >
            <motion.div
                {...(isSticky && {
                    style: {
                        scale,
                        opacity,
                        y,
                        maxHeight: forceParallax ? \`calc(100vh - \${top.absolute})\` : "none",
                    },
                })}
                className="grid size-full origin-top overflow-hidden"
            >
                {children}
            </motion.div>
        </div>
    );
}`;

    return (
        <div className="w-full mx-auto space-y-8 pb-12">
            <div>
                <h1 className="text-3xl font-bold text-foreground mb-4">Parallax Cards</h1>
                <p className="text-muted-foreground  text-lg">
                    A stack of cards that reveals content with a parallax scrolling effect.
                    <br />
                    <br />

                    <span className="opacity-70 text-error bg-card-bg px-1 rounded">Note: Give a fixed height to the container.</span>
                </p>
            </div>

            {/* Preview Area */}
            <ComponentPreview  >
                <div className='h-[500px] overflow-y-scroll' ref={scrollRef}>
                    <ParallaxCards
                        images={images}
                        maxStackedCards={3}
                        top="54px"
                        height="500px"
                        scrollContainerRef={scrollRef}
                    />
                </div>
            </ComponentPreview>

            <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">CLI Installation</h2>
                <CodeViewer code="npx next-forge-ui add parallax-cards" language="bash" title="Terminal" />
            </div>

            <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">Manual Installation</h2>
                <CodeViewer code={exampleCode} language="tsx" title="components/ParallaxCards.tsx" />
            </div>

            <Usecase
                title="Usage"
                description="This is what it does."
                code={`   
<div>
<ParallaxCards
    images={images}
    maxStackedCards={5}
    top="54px"
    height="500px"
/>
</div>
`}
            />

            {/* API Reference */}
            <div className="space-y-8 pt-6">
                <h2 className="text-2xl font-semibold text-foreground">API Reference</h2>

                <div className="space-y-8">
                    {/* Dependencies */}
                    <div>
                        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Dependencies</h3>
                        <div className="inline-flex items-center gap-2 p-3 bg-card-bg/30 rounded-lg text-sm text-foreground ring-1 ring-card-border/50">
                            <span className="text-accent font-mono">npm</span> install motion clsx tailwind-merge
                        </div>
                    </div>

                    {/* Props Table */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Props</h3>
                        <div className="rounded-xl overflow-hidden bg-card-bg/20 ring-1 ring-card-border/30">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-card-bg/40 border-b border-card-border/30 text-xs font-semibold text-muted-foreground uppercase">
                                            <th className="py-4 px-6 whitespace-nowrap">Prop</th>
                                            <th className="py-4 px-6 whitespace-nowrap">Type</th>
                                            <th className="py-4 px-6 whitespace-nowrap">Default</th>
                                            <th className="py-4 px-6 min-w-[200px]">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm divide-y divide-card-border/30">
                                        {/* images */}
                                        <tr>
                                            <td className="py-4 px-6 font-mono text-accent font-medium">images</td>
                                            <td className="py-4 px-6 font-mono text-muted-foreground">string[]</td>
                                            <td className="py-4 px-6 font-mono text-muted-foreground">-</td>
                                            <td className="py-4 px-6 text-foreground/80">Array of image URLs to display.</td>
                                        </tr>
                                        {/* maxStackedCards */}
                                        <tr>
                                            <td className="py-4 px-6 font-mono text-accent font-medium">maxStackedCards</td>
                                            <td className="py-4 px-6 font-mono text-muted-foreground">number</td>
                                            <td className="py-4 px-6 font-mono text-muted-foreground">3</td>
                                            <td className="py-4 px-6 text-foreground/80">Number of cards visible in the stack.</td>
                                        </tr>
                                        {/* top */}
                                        <tr>
                                            <td className="py-4 px-6 font-mono text-accent font-medium">top</td>
                                            <td className="py-4 px-6 font-mono text-muted-foreground">string</td>
                                            <td className="py-4 px-6 font-mono text-muted-foreground">"50px"</td>
                                            <td className="py-4 px-6 text-foreground/80">Offset from the top for stacking.</td>
                                        </tr>
                                        {/* width */}
                                        <tr>
                                            <td className="py-4 px-6 font-mono text-accent font-medium">width</td>
                                            <td className="py-4 px-6 font-mono text-muted-foreground">string | number</td>
                                            <td className="py-4 px-6 font-mono text-muted-foreground">"100%"</td>
                                            <td className="py-4 px-6 text-foreground/80">Width of the container.</td>
                                        </tr>
                                        {/* height */}
                                        <tr>
                                            <td className="py-4 px-6 font-mono text-accent font-medium">height</td>
                                            <td className="py-4 px-6 font-mono text-muted-foreground">string | number</td>
                                            <td className="py-4 px-6 font-mono text-muted-foreground">"500px"</td>
                                            <td className="py-4 px-6 text-foreground/80">Height of the cards.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};