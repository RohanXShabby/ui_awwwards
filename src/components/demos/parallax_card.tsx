"use client";
import { ParallaxCards } from "@/content/Cards/parallax_card";

type PlaceholderCardProps = {
    index: number;
    src: string;
};

function PlaceholderCard({ index, src }: PlaceholderCardProps) {
    function Message({ children }: { children: string }) {
        return (
            <span className="absolute top-0.75 left-0.75 text-[9px] leading-none sm:text-xs">
                {children}
            </span>
        );
    }

    return (
        <div
            className="h-125 opacity-100 "
            style={{ backgroundColor: `var(--chart-${index + 1})` }}
        >
            <div className="border-foreground relative size-full border">
                {src && <img src={src} alt="" className="w-full h-full object-cover" />}
            </div>
        </div>
    );
}

const Parallax_card = () => {
    return (
        <div className="pt-16">
            <ParallaxCards maxStackedCards={3} top="54px">
                <PlaceholderCard index={0} src="https://cdn.pixabay.com/photo/2024/03/29/02/30/ai-generated-8662021_1280.jpg" />
                <PlaceholderCard index={1} src="https://cdn.pixabay.com/photo/2022/10/02/03/15/vulcanic-landscape-7492624_1280.jpg" />
                <PlaceholderCard index={2} src="https://cdn.pixabay.com/photo/2024/02/28/15/37/ai-generated-8602282_1280.jpg" />
                <PlaceholderCard index={3} src="https://cdn.pixabay.com/photo/2023/01/13/22/17/ai-art-7717058_1280.jpg" />
                <PlaceholderCard index={4} src="https://cdn.pixabay.com/photo/2023/11/21/15/39/ai-generated-8403627_1280.png" />
            </ParallaxCards>
        </div>

    );
};

export default Parallax_card;
