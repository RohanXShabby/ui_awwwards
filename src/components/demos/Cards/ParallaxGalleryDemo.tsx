"use client"
import React from 'react';
import { CodeViewer } from '../../CodeViewer';
import { ComponentPreview } from '../../ComponentPreview';
import ParallaxGallery from '@/content/Cards/parallax_gallery';
import { Usecase } from '../../Usecase';

export const ParallaxGalleryDemo: React.FC = () => {

    const images = [
        { src: "https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=", alt: "Wide 1" },
        { src: "https://img.freepik.com/free-photo/courage-man-jump-through-gap-hill-business-concept-idea_1323-262.jpg?semt=ais_hybrid&w=740&q=80", alt: "Wide 2" },
        { src: "https://img.freepik.com/premium-photo/mesmerizing-vibrant-nebula-with-celestial-planets-cosmic-elements_994764-154605.jpg?semt=ais_hybrid&w=740&q=80", alt: "Wide 3" },
        { src: "https://backiee.com/static/wallpapers/560x315/420431.jpg", alt: "Wide 4" },
        { src: "https://aboutmurals.ca/wp-content/uploads/2021/08/Space-Earth-Wallpaper-About-Murals.jpg", alt: "Wide 5" },
        { src: "https://m.media-amazon.com/images/I/71YNv7REw4S._AC_UF894,1000_QL80_.jpg", alt: "Wide 6" }
    ];

    const exampleCode = `
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

            trackRef.current.animate(
                {
                    transform: \`translate(\${nextPercentage}%, 0%)\`,
                },
                { duration: damping, fill: "forwards" }
            );

            const rawParallax = (1 + nextPercentage / maxLeft) * 100;
            const parallaxPos = Math.max(Math.min(rawParallax, 100), 0);

            imageRefs.current.forEach((image) => {
                if (image) {
                    image.animate(
                        {
                            objectPosition: \`\${parallaxPos}% center\`,
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
            className={\`relative w-full h-full bg-neutral-950 overflow-hidden select-none \${className}\`}
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
                        alt={img.alt || \`Gallery Item \${index}\`}
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
`;

    return (
        <div className="w-full mx-auto space-y-8 pb-12">
            <div>
                <h1 className="text-3xl font-bold text-foreground mb-4">Parallax Gallery</h1>
                <p className="text-muted-foreground text-lg">
                    A horizontal draggable gallery with parallax effect on images.
                </p>
            </div>

            {/* Preview Area */}
            <ComponentPreview>
                <div className="relative w-full h-[400px] overflow-hidden rounded-md ">
                    <ParallaxGallery
                        images={images}
                        imageHeight='300px'
                        imageWidth='150px'
                        className="h-full bg-transparent"
                    />
                </div>
            </ComponentPreview>

            <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">Manual Installation</h2>
                <CodeViewer code={exampleCode} language="tsx" title="content/Cards/parallax_gallery.tsx" />
            </div>

            <Usecase
                title="Usage"
                description="Import and use the component with an array of images."
                code={`
 const images = [
        { src: "https://picsum.photos/id/1015/200/200", alt: "Wide 1" },
        { src: "https://picsum.photos/id/1016/200/200", alt: "Wide 2" },
        { src: "https://picsum.photos/id/1020/200/200", alt: "Wide 3" },
        { src: "https://picsum.photos/id/1024/200/200", alt: "Wide 4" },
        { src: "https://picsum.photos/id/1035/200/200", alt: "Wide 5" },
        { src: "https://picsum.photos/id/1039/200/200", alt: "Wide 6" }
    ];


<ParallaxGallery
    images={images}
    imageHeight='300px'
    imageWidth='150px'
    className="h-[100px] bg-transparent"
    />
`}
            />

            {/* API Reference */}
            <div className="space-y-8 pt-6">
                <h2 className="text-2xl font-semibold text-foreground">API Reference</h2>
                <div className="space-y-4">
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Props</h3>
                    <div className="rounded-md overflow-hidden bg-card-bg/20 ring-1 ring-card-border/30">
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
                                    <tr>
                                        <td className="py-4 px-6 font-mono text-accent font-medium">images</td>
                                        <td className="py-4 px-6 font-mono text-muted-foreground">GalleryImage[]</td>
                                        <td className="py-4 px-6 font-mono text-muted-foreground">[]</td>
                                        <td className="py-4 px-6 text-foreground/80">Array of objects with src and alt.</td>
                                    </tr>
                                    <tr>
                                        <td className="py-4 px-6 font-mono text-accent font-medium">imageWidth</td>
                                        <td className="py-4 px-6 font-mono text-muted-foreground">string</td>
                                        <td className="py-4 px-6 font-mono text-muted-foreground">"40vmin"</td>
                                        <td className="py-4 px-6 text-foreground/80">Width of each image.</td>
                                    </tr>
                                    <tr>
                                        <td className="py-4 px-6 font-mono text-accent font-medium">imageHeight</td>
                                        <td className="py-4 px-6 font-mono text-muted-foreground">string</td>
                                        <td className="py-4 px-6 font-mono text-muted-foreground">"56vmin"</td>
                                        <td className="py-4 px-6 text-foreground/80">Height of each image.</td>
                                    </tr>
                                    <tr>
                                        <td className="py-4 px-6 font-mono text-accent font-medium">damping</td>
                                        <td className="py-4 px-6 font-mono text-muted-foreground">number</td>
                                        <td className="py-4 px-6 font-mono text-muted-foreground">1200</td>
                                        <td className="py-4 px-6 text-foreground/80">Animation duration in ms (creates lag effect).</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
