'use client';

import React, { useRef, useEffect, useCallback } from "react";

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
}

const ParallaxGallery: React.FC<ParallaxGalleryProps> = ({
    images = [],
    imageWidth = "40vmin",
    imageHeight = "56vmin",
    gap = "4vmin",
    className = "",
    damping = 1200,
}) => {
    const trackRef = useRef<HTMLDivElement>(null);

    // Store values in refs so we don't trigger re-renders
    const mouseDownAt = useRef<number | null>(null);
    const prevPercentage = useRef<number>(0);
    const percentage = useRef<number>(0);

    const handleOnDown = useCallback((clientX: number) => {
        mouseDownAt.current = clientX;
    }, []);

    const handleOnUp = useCallback(() => {
        mouseDownAt.current = null;
        prevPercentage.current = percentage.current;
    }, []);

    const handleOnMove = useCallback((clientX: number) => {
        if (mouseDownAt.current === null) return;
        if (!trackRef.current) return;

        // Calculate distance
        const mouseDelta = mouseDownAt.current - clientX;
        const maxDelta = window.innerWidth / 2;

        const nextPercentageUnconstrained =
            prevPercentage.current + (mouseDelta / maxDelta) * -100;

        const nextPercentage = Math.max(
            Math.min(nextPercentageUnconstrained, 0),
            -100
        );

        percentage.current = nextPercentage;

        // Animate Track
        trackRef.current.animate(
            {
                transform: `translate(${nextPercentage}%, -50%)`,
            },
            { duration: damping, fill: "forwards" }
        );

        // Animate Images (Parallax Effect)
        const imagesArray = trackRef.current.getElementsByClassName("parallax-image");

        for (const image of Array.from(imagesArray) as HTMLImageElement[]) {
            image.animate(
                {
                    objectPosition: `${100 + nextPercentage}% center`,
                },
                { duration: damping, fill: "forwards" }
            );
        }
    }, [damping]);

    useEffect(() => {
        // Prevent code running on server
        if (typeof window === 'undefined') return;

        const onMouseUp = () => handleOnUp();
        const onMouseMove = (e: MouseEvent) => handleOnMove(e.clientX);
        const onTouchEnd = () => handleOnUp();
        const onTouchMove = (e: TouchEvent) => handleOnMove(e.touches[0].clientX);

        // We only need to listen to move/up on window to handle dragging outside
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
            className={`relative w-full h-screen bg-neutral-950 overflow-hidden select-none ${className}`}
            onMouseDown={(e) => handleOnDown(e.clientX)}
            onTouchStart={(e) => handleOnDown(e.touches[0].clientX)}
        >
            <div
                ref={trackRef}
                className="flex absolute left-1/2 top-1/2 -translate-y-1/2 gap-[4vmin] will-change-transform"
                style={{ gap: gap }}
            >
                {images.map((img, index) => (
                    <img
                        key={index}
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