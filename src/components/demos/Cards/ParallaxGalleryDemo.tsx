import React from 'react';
import { CodeViewer } from '../../CodeViewer';
import { ComponentPreview } from '../../ComponentPreview';
import ParallaxGallery from '@/content/Cards/parallax_gallery';
import { Usecase } from '../../Usecase';

export const ParallaxGalleryDemo: React.FC = () => {
    const images = [
        { src: "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80", alt: "Image 1" },
        { src: "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80", alt: "Image 2" },
        { src: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80", alt: "Image 3" },
        { src: "https://images.unsplash.com/photo-1682686581854-5e71f58e7e3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80", alt: "Image 4" },
        { src: "https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80", alt: "Image 5" },
    ];

    const exampleCode = `'use client';

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
    // ... implementation
    return <div>...</div>
};

export default ParallaxGallery;`;

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
                <div className="relative w-full h-[600px] overflow-hidden rounded-xl border border-card-border/30">
                    <ParallaxGallery
                        images={images}
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
<ParallaxGallery
    images={[
        { src: "image1.jpg", alt: "Image 1" },
        { src: "image2.jpg", alt: "Image 2" },
    ]}
/>
`}
            />

            {/* API Reference */}
            <div className="space-y-8 pt-6">
                <h2 className="text-2xl font-semibold text-foreground">API Reference</h2>
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
