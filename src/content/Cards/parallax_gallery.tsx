'use client';

import React, { useRef, useEffect, useCallback, useMemo } from "react";

interface GalleryImage {
    src: string;
    alt?: string;
}

interface ParallaxGalleryProps {
    images?: GalleryImage[];
    imageWidth?: string;
    imageHeight?: string;
    gap?: string;
    className?: string;
    damping?: number;
    leftLimit?: number;
}

const ParallaxGallery: React.FC<ParallaxGalleryProps> = ({
    images = [],
    imageWidth = "40vmin",
    imageHeight = "56vmin",
    gap = "4vmin",
    className = "",
    damping = 1200,
    leftLimit = -200,
}) => {
    const trackRef = useRef<HTMLDivElement | null>(null);
    const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

    const mouseDownAt = useRef<number | null>(null);
    const prevPercentage = useRef<number>(0);
    const percentage = useRef<number>(0);

    // Memoize maxLeft to avoid recalculation on every render
    const maxLeft = useMemo(() => Math.abs(leftLimit), [leftLimit]);

    const handleOnDown = useCallback((clientX: number) => {
        mouseDownAt.current = clientX;
    }, []);

    const handleOnUp = useCallback(() => {
        mouseDownAt.current = null;
        prevPercentage.current = percentage.current;
    }, []);

    const handleOnMove = useCallback(
        (clientX: number) => {
            if (mouseDownAt.current === null) return;
            if (!trackRef.current) return;

            const mouseDelta = mouseDownAt.current - clientX;
            const maxDelta = window.innerWidth / 2;

            const nextPercentageUnconstrained =
                prevPercentage.current + (mouseDelta / maxDelta) * -100;

            const nextPercentage = Math.max(
                Math.min(nextPercentageUnconstrained, 0),
                leftLimit
            );

            percentage.current = nextPercentage;

            // Animate Track
            trackRef.current.animate(
                {
                    transform: `translate(${nextPercentage}%, 0%)`,
                },
                { duration: damping, fill: "forwards" }
            );

            // Calculate Parallax Position
            // map nextPercentage (0 .. leftLimit) -> objectPosition (100 .. 0)
            const rawParallax = (1 + nextPercentage / maxLeft) * 100;
            const parallaxPos = Math.max(Math.min(rawParallax, 100), 0);

            // Animate Images using cached refs
            imageRefs.current.forEach((image) => {
                if (image) {
                    image.animate(
                        {
                            objectPosition: `${parallaxPos}% center`,
                        },
                        { duration: damping, fill: "forwards" }
                    );
                }
            });
        },
        [damping, leftLimit, maxLeft]
    );

    useEffect(() => {
        if (typeof window === "undefined") return;

        const onMouseUp = () => handleOnUp();
        const onMouseMove = (e: MouseEvent) => handleOnMove(e.clientX);
        const onTouchEnd = () => handleOnUp();
        const onTouchMove = (e: TouchEvent) =>
            handleOnMove(e.touches[0].clientX);

        window.addEventListener("mouseup", onMouseUp);
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("touchend", onTouchEnd);
        window.addEventListener("touchmove", onTouchMove);

        return () => {
            window.removeEventListener("mouseup", onMouseUp);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("touchend", onTouchEnd);
            window.removeEventListener("touchmove", onTouchMove);
        };
    }, [handleOnUp, handleOnMove]);

    return (
        <div
            className={`relative w-full h-full bg-neutral-950 overflow-hidden select-none ${className}`}
            onMouseDown={(e) => handleOnDown(e.clientX)}
            onTouchStart={(e) => handleOnDown(e.touches[0].clientX)}
        >
            <div
                ref={trackRef}
                className="flex absolute left-1/2 top-1/2 -translate-y-1/2 gap-[4vmin] will-change-transform"
                style={{ gap }}
            >
                {images.map((img, index) => (
                    <img
                        key={index}
                        ref={(el) => { imageRefs.current[index] = el; }}
                        src={img.src}
                        alt={img.alt || `Gallery Item ${index}`}
                        draggable="false"
                        className="parallax-image object-cover object-[100%_center] select-none pointer-events-none"
                        style={{
                            width: imageWidth,
                            height: imageHeight,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default ParallaxGallery;
