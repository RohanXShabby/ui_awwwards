"use client";

import DecryptedText from "@/content/Actions/decrypt";
import { ParallaxCards } from "@/content/Cards/parallax_card";
import Parallax_card from "@/components/demos/parallax_card";

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
const page = () => {
    return (
        <div className="pt-32 px-32" >
            {/* decrypt text */}
            <div className="flex items-center justify-evenly border border-muted-foreground py-4 rounded-2xl">
                <h1 className="font-bold">Decrypt Text : </h1>
                {/* Example 1: Defaults (hover to decrypt) */}
                <div className="border cursor-pointer py-2 px-2 rounded-2xl">
                    <DecryptedText text="Hover me!" />
                </div>
                {/* Example 2: Customized speed and characters */}
                <div className="border cursor-pointer py-2 px-2 rounded-2xl">
                    <DecryptedText
                        text="Customize me"
                        speed={100}
                        maxIterations={20}
                        characters="ABCD1234!?"
                        className="revealed"
                        parentClassName="all-letters"
                        encryptedClassName="encrypted"
                    />
                </div>
                {/* Example 3: Animate on view (runs once) */}
                <div className="border cursor-pointer py-2 px-2 rounded-2xl">
                    <DecryptedText
                        text="This text animates when in view"
                        animateOn="view"
                        revealDirection="center"
                    />
                </div>
            </div>
            {/* parallexcard */}
            <div className="flex flex-col w-full justify-evenly items-center border border-muted-foreground py-4 rounded-2xl mt-16">
                <h1 className="font-bold">Parallex Cards : </h1>
                <Parallax_card />
            </div>
        </div>
    )
}

export default page 