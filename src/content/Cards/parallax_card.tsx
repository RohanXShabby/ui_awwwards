"use client";

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
            "Invalid `top` value: percentages (%) are not supported by <ParallaxCards/>.",
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
            <style>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>

            <div
                ref={containerRef}
                className={cn("w-full relative! grid! py-0!", className)}
                style={{
                    ...style,
                    width,
                    gridTemplateRows: `repeat(${totalCards}, 1fr)`,
                }}
                {...rest}
            >
                {images.map((image, index) => (
                    <ParallaxCard
                        key={`cards[${index}]`}
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
                            alt={`Parallax card ${index + 1}`}
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
            `-${top.absolute}`,
            `${-top.magnitude - top.magnitude / (maxStackedCards - 1)}${top.unit}`,
        ],
    );

    const scale = useTransform(
        scrollYProgress,
        [index * scrollRatio, (index + maxStackedCards) * scrollRatio],
        [1, 0.7],
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
                        maxHeight: forceParallax ? `calc(100vh - ${top.absolute})` : "none",
                    },
                })}
                className="grid size-full origin-top overflow-hidden"
            >
                {children}
            </motion.div>
        </div>
    );
}