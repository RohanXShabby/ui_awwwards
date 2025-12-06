'use client';
import { ParallaxCards } from "@/content/Cards/parallax_card";
import { div } from "framer-motion/client";
import Button3D from "@/content/Actions/Button3D";
import { useRef } from "react";
import ParallaxGallery from "@/content/Cards/parallax_gallery";

const page = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const demoImages = [
        { src: "https://picsum.photos/id/1015/400/250", alt: "Wide 1" },
        { src: "https://picsum.photos/id/1016/400/250", alt: "Wide 2" },
        { src: "https://picsum.photos/id/1020/400/250", alt: "Wide 3" },
        { src: "https://picsum.photos/id/1024/400/250", alt: "Wide 4" },
        { src: "https://picsum.photos/id/1035/400/250", alt: "Wide 5" },
        { src: "https://picsum.photos/id/1039/400/250", alt: "Wide 6" }
    ];





    const images = [
        "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
        "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80",
        "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
        "https://images.unsplash.com/photo-1682686581854-5e71f58e7e3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
        "https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
    ];

    return (
        <>
            {/* <div className="h-screen overflow-y-scroll" ref={scrollRef}>
                <ParallaxCards
                    images={images}
                    maxStackedCards={5}
                    top="54px"
                    height="700px"
                    scrollContainerRef={scrollRef}
                />  
            </div> */}

            {/* Button3D */}
            <div>
                <div className="flex py-24 gap-8 items-center justify-center">

                    {/* 1. Default Style */}
                    <Button3D onClick={() => console.log('Clicked!')} />

                    {/* 2. Custom Dimensions & Colors */}
                    <Button3D
                        label="Submit"
                        width="200px"
                        height="60px"
                        topColor="#E0F7FA"     // Light Cyan
                        bottomColor="#4DD0E1"  // Cyan
                        outlineColor="#006064" // Dark Cyan
                    />

                    {/* 3. Pink Theme */}
                    <Button3D
                        label="Buy Now"
                        topColor="#ffc8dd"
                        bottomColor="#ffafcc"
                        outlineColor="#590d22"
                    />
                </div>
            </div>

            <ParallaxGallery images={demoImages} />
        </>
    );
};

export default page;