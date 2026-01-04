'use client';
import ParallaxGallery from "@/content/Cards/parallax_gallery";

const page = () => {
    const demoImages = [
        { src: "https://picsum.photos/id/1015/400/250", alt: "Wide 1" },
        { src: "https://picsum.photos/id/1016/400/250", alt: "Wide 2" },
        { src: "https://picsum.photos/id/1020/400/250", alt: "Wide 3" },
        { src: "https://picsum.photos/id/1024/400/250", alt: "Wide 4" },
        { src: "https://picsum.photos/id/1035/400/250", alt: "Wide 5" },
        { src: "https://picsum.photos/id/1039/400/250", alt: "Wide 6" }
    ];

    return (
        <>
            <ParallaxGallery images={demoImages} />
        </>
    );
};

export default page;