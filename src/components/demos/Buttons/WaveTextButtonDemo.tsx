"use client"
import React from 'react';
import { CodeViewer } from '../../CodeViewer';
import { ComponentPreview } from '../../ComponentPreview';
import { WaveTextButton } from '@/content/Buttons/WaveTextButton';

export const WaveButtonDemo: React.FC = () => {

    const exampleCode = `'use client'
import React, { useRef } from 'react';
import { gsap } from 'gsap';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type ButtonRadius = 'none' | 'sm' | 'md' | 'lg' | 'full';
type AnimationOrigin = 'left' | 'center' | 'right' | 'edges';

interface WaveTextButtonProps {
    text?: string;
    onClick?: () => void;
    className?: string;
    variant?: ButtonVariant;
    size?: ButtonSize;
    radius?: ButtonRadius;
    animationOrigin?: AnimationOrigin;
    disabled?: boolean;
    fullWidth?: boolean;
    bgColor?: string;
    textColor?: string;
    animationDuration?: number;
    staggerDelay?: number;
    animationEase?: string;
    translateDistance?: number;
    type?: 'button' | 'submit' | 'reset';
}

export const WaveTextButton: React.FC<WaveTextButtonProps> = ({
    text = "Button",
    onClick,
    className = "",
    variant = "primary",
    size = "md",
    radius = "md",
    animationOrigin = "left",
    disabled = false,
    fullWidth = false,
    bgColor,
    textColor,
    animationDuration = 0.4,
    staggerDelay = 0.03,
    animationEase = 'power3.out',
    translateDistance = 24,
    type = 'button'
}) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const containerRef = useRef<HTMLSpanElement>(null);

    const getStagger = (): gsap.StaggerVars => {
        const fromMap: Record<AnimationOrigin, "start" | "end" | "center" | "edges"> = {
            left: "start",
            right: "end",
            center: "center",
            edges: "edges"
        };

        return {
            each: staggerDelay,
            from: fromMap[animationOrigin]
        };
    };

    const handleMouseEnter = () => {
        if (!containerRef.current || disabled) return;

        const topChars = containerRef.current.querySelectorAll('.top-char');
        const bottomChars = containerRef.current.querySelectorAll('.bottom-char');

        gsap.to(topChars, {
            y: -translateDistance,
            opacity: 0,
            duration: animationDuration,
            ease: animationEase,
            stagger: getStagger()
        });

        gsap.to(bottomChars, {
            y: 0,
            opacity: 1,
            duration: animationDuration,
            ease: animationEase,
            stagger: getStagger()
        });
    };

    const handleMouseLeave = () => {
        if (!containerRef.current || disabled) return;

        const topChars = containerRef.current.querySelectorAll('.top-char');
        const bottomChars = containerRef.current.querySelectorAll('.bottom-char');

        gsap.to(topChars, {
            y: 0,
            opacity: 1,
            duration: animationDuration,
            ease: animationEase,
            stagger: getStagger()
        });

        gsap.to(bottomChars, {
            y: translateDistance,
            opacity: 0,
            duration: animationDuration,
            ease: animationEase,
            stagger: getStagger()
        });
    };

    const variants: Record<ButtonVariant, string> = {
        primary: "bg-accent hover:bg-link text-background border-transparent shadow-sm",
        secondary: "bg-slate-800 text-white hover:bg-slate-900 border-transparent shadow-sm",
        outline: "bg-transparent border-2 border-slate-200 text-slate-900 hover:border-indigo-600 hover:text-indigo-600",
        ghost: "bg-transparent text-slate-600 hover:bg-slate-100 border-transparent",
        danger: "bg-red-500 text-white hover:bg-red-600 border-transparent",
        success: "bg-emerald-500 text-white hover:bg-emerald-600 border-transparent"
    };

    const sizes: Record<ButtonSize, string> = {
        xs: "px-3 py-1.5 text-xs font-medium",
        sm: "px-4 py-2 text-sm font-medium",
        md: "px-6 py-3 text-base font-semibold",
        lg: "px-8 py-4 text-lg font-bold",
        xl: "px-10 py-5 text-xl font-bold"
    };

    const radiusOptions: Record<ButtonRadius, string> = {
        none: "rounded-none",
        sm: "rounded-md",
        md: "rounded-xl",
        lg: "rounded-2xl",
        full: "rounded-full"
    };

    const buttonClasses = \`
        relative flex items-center justify-center overflow-hidden transition-all duration-300 active:scale-95
        \${!bgColor ? variants[variant] : 'border'}
        \${sizes[size]} 
        \${radiusOptions[radius]}
        \${fullWidth ? 'w-full' : 'w-fit'}
        \${disabled ? 'opacity-40 cursor-not-allowed grayscale' : 'cursor-pointer'}
        \${className}
    \`.trim().replace(/\\s+/g, ' ');

    return (
        <button
            ref={buttonRef}
            type={type}
            onClick={onClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            disabled={disabled}
            className={buttonClasses}
            style={{ backgroundColor: bgColor, color: textColor }}
            aria-label={text}
        >
            <span ref={containerRef} className="relative flex overflow-hidden py-1">
                {text.split('').map((char: string, index: number) => (
                    <span
                        key={index}
                        className="relative flex flex-col items-center justify-center"
                        style={{ minWidth: char === ' ' ? '0.3em' : 'auto' }}
                    >
                        {/* Static/Initial Layer */}
                        <span className="top-char inline-block whitespace-pre">
                            {char === ' ' ? '\\u00A0' : char}
                        </span>

                        {/* Animated Hover Layer */}
                        <span
                            className="bottom-char absolute inline-block opacity-0 whitespace-pre"
                            style={{ transform: \`translateY(\${translateDistance}px)\` }}
                        >
                            {char === ' ' ? '\\u00A0' : char}
                        </span>
                    </span>
                ))}
            </span>
        </button>
    );
};

export default WaveTextButton;
`;

    return (
        <div className="w-full mx-auto space-y-8 pb-12">
            <div>
                <h1 className="text-3xl font-bold text-foreground mb-4">Wave Text Button</h1>
                <p className="text-muted-foreground text-lg">
                    An animated button with a wave text effect powered by GSAP. Each character animates with a staggered wave motion on hover. Includes support for <span className="opacity-70 bg-card-bg px-1 rounded">text</span>, <span className="opacity-70 bg-card-bg px-1 rounded">variant</span>, <span className="opacity-70 bg-card-bg px-1 rounded">size</span>, <span className="opacity-70 bg-card-bg px-1 rounded">radius</span>, <span className="opacity-70 bg-card-bg px-1 rounded">animationOrigin</span>, <span className="opacity-70 bg-card-bg px-1 rounded">animationDuration</span>, <span className="opacity-70 bg-card-bg px-1 rounded">staggerDelay</span>, and more customization options.
                </p>
            </div>

            {/* Preview Area */}
            <ComponentPreview>
                <div className="w-full flex flex-col items-center gap-8 py-16">
                    <div className='w-fit mx-auto text-4xl font-black text-muted-foreground/40 mb-4'>
                        Hover Below
                    </div>

                    {/* Variants Showcase */}
                    <div className="space-y-6 w-full">
                        <div>
                            <h3 className="text-sm font-semibold text-muted-foreground mb-4 text-center">Variants</h3>
                            <div className='flex flex-wrap items-center justify-center gap-4'>
                                <WaveTextButton text="Primary" variant="primary" />
                                <WaveTextButton text="Secondary" variant="secondary" />
                                <WaveTextButton text="Outline" variant="outline" />
                                <WaveTextButton text="Ghost" variant="ghost" />
                                <WaveTextButton text="Danger" variant="danger" />
                                <WaveTextButton text="Success" variant="success" />
                            </div>
                        </div>

                        {/* Animation Origins */}
                        <div>
                            <h3 className="text-sm font-semibold text-muted-foreground mb-4 text-center">Animation Origins</h3>
                            <div className='flex flex-wrap items-center justify-center gap-4'>
                                <WaveTextButton text="From Left" animationOrigin="left" />
                                <WaveTextButton text="From Center" animationOrigin="center" />
                                <WaveTextButton text="From Right" animationOrigin="right" />
                                <WaveTextButton text="From Edges" animationOrigin="edges" />
                            </div>
                        </div>
                    </div>
                </div>
            </ComponentPreview>

            <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">CLI Installation</h2>
                <CodeViewer code="Coming Soon..." language="bash" title="Terminal" />
            </div>

            <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">Manual Installation</h2>
                <CodeViewer code={exampleCode} language="tsx" title="components/WaveTextButton.tsx" />
            </div>

            {/* API Reference */}
            <div className="space-y-8 pt-6">
                <h2 className="text-2xl font-semibold text-foreground">API Reference</h2>

                <div className="space-y-8">
                    {/* Dependencies Box */}
                    <div>
                        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Dependencies</h3>
                        <div className="inline-flex items-center gap-2 p-3 bg-card-bg/30 rounded-lg text-sm text-foreground ring-1 ring-card-border/50">
                            <span className="text-accent font-mono">npm</span> install gsap
                        </div>
                    </div>

                    {/* Props Table */}
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
                                        {/* text */}
                                        <tr>
                                            <td className="py-4 px-6 font-mono text-accent font-medium">text</td>
                                            <td className="py-4 px-6 font-mono text-muted-foreground">string</td>
                                            <td className="py-4 px-6 font-mono text-muted-foreground">"Button"</td>
                                            <td className="py-4 px-6 text-foreground/80">The text content displayed on the button.</td>
                                        </tr>

                                        {/* onClick */}
                                        <tr>
                                            <td className="py-4 px-6 font-mono text-accent font-medium">onClick</td>
                                            <td className="py-4 px-6 font-mono text-muted-foreground">function</td>
                                            <td className="py-4 px-6 font-mono text-muted-foreground">-</td>
                                            <td className="py-4 px-6 text-foreground/80">Callback function triggered when the button is clicked.</td>
                                        </tr>

                                        {/* className */}
                                        <tr>
                                            <td className="py-4 px-6 font-mono text-accent font-medium">className</td>
                                            <td className="py-4 px-6 font-mono text-muted-foreground">string</td>
                                            <td className="py-4 px-6 font-mono text-muted-foreground">""</td>
                                            <td className="py-4 px-6 text-foreground/80">Additional CSS classes for custom styling.</td>
                                        </tr>

                                        {/* variant */}
                                        <tr>
                                            <td className="py-4 px-6 font-mono text-accent font-medium">variant</td>
                                            <td className="py-4 px-6 font-mono text-muted-foreground">enum</td>
                                            <td className="py-4 px-6 font-mono text-muted-foreground">primary</td>
                                            <td className="py-4 px-6 text-foreground/80">
                                                Button style variant. One of <span className="opacity-70 bg-card-bg px-1 rounded">primary</span>, <span className="opacity-70 bg-card-bg px-1 rounded">secondary</span>, <span className="opacity-70 bg-card-bg px-1 rounded">outline</span>, <span className="opacity-70 bg-card-bg px-1 rounded">ghost</span>, <span className="opacity-70 bg-card-bg px-1 rounded">danger</span>, or <span className="opacity-70 bg-card-bg px-1 rounded">success</span>.
                                            </td>
                                        </tr>

                                        {/* size */}
                                        <tr>
                                            <td className="py-4 px-6 font-mono text-accent font-medium">size</td>
                                            <td className="py-4 px-6 font-mono text-muted-foreground">enum</td>
                                            <td className="py-4 px-6 font-mono text-muted-foreground">md</td>
                                            <td className="py-4 px-6 text-foreground/80">
                                                Button size. One of <span className="opacity-70 bg-card-bg px-1 rounded">xs</span>, <span className="opacity-70 bg-card-bg px-1 rounded">sm</span>, <span className="opacity-70 bg-card-bg px-1 rounded">md</span>, <span className="opacity-70 bg-card-bg px-1 rounded">lg</span>, or <span className="opacity-70 bg-card-bg px-1 rounded">xl</span>.
                                            </td>
                                        </tr>

                                        {/* radius */}
                                        <tr>
                                            <td className="py-4 px-6 font-mono text-accent font-medium">radius</td>
                                            <td className="py-4 px-6 font-mono text-muted-foreground">enum</td>
                                            <td className="py-4 px-6 font-mono text-muted-foreground">md</td>
                                            <td className="py-4 px-6 text-foreground/80">
                                                Border radius. One of <span className="opacity-70 bg-card-bg px-1 rounded">none</span>, <span className="opacity-70 bg-card-bg px-1 rounded">sm</span>, <span className="opacity-70 bg-card-bg px-1 rounded">md</span>, <span className="opacity-70 bg-card-bg px-1 rounded">lg</span>, or <span className="opacity-70 bg-card-bg px-1 rounded">full</span>.
                                            </td>
                                        </tr>

                                        {/* animationOrigin */}
                                        <tr>
                                            <td className="py-4 px-6 font-mono text-accent font-medium">animationOrigin</td>
                                            <td className="py-4 px-6 font-mono text-muted-foreground">enum</td>
                                            <td className="py-4 px-6 font-mono text-muted-foreground">left</td>
                                            <td className="py-4 px-6 text-foreground/80">
                                                Direction from which the wave animation starts. One of <span className="opacity-70 bg-card-bg px-1 rounded">left</span>, <span className="opacity-70 bg-card-bg px-1 rounded">center</span>, <span className="opacity-70 bg-card-bg px-1 rounded">right</span>, or <span className="opacity-70 bg-card-bg px-1 rounded">edges</span>.
                                            </td>
                                        </tr>

                                        {/* disabled */}
                                        <tr>
                                            <td className="py-4 px-6 font-mono text-accent font-medium">disabled</td>
                                            <td className="py-4 px-6 font-mono text-muted-foreground">boolean</td>
                                            <td className="py-4 px-6 font-mono text-muted-foreground">false</td>
                                            <td className="py-4 px-6 text-foreground/80">Whether the button is disabled.</td>
                                        </tr>

                                        {/* fullWidth */}
                                        <tr>
                                            <td className="py-4 px-6 font-mono text-accent font-medium">fullWidth</td>
                                            <td className="py-4 px-6 font-mono text-muted-foreground">boolean</td>
                                            <td className="py-4 px-6 font-mono text-muted-foreground">false</td>
                                            <td className="py-4 px-6 text-foreground/80">Whether the button should take up the full width of its container.</td>
                                        </tr>

                                        {/* bgColor */}
                                        <tr>
                                            <td className="py-4 px-6 font-mono text-accent font-medium">bgColor</td>
                                            <td className="py-4 px-6 font-mono text-muted-foreground">string</td>
                                            <td className="py-4 px-6 font-mono text-muted-foreground">-</td>
                                            <td className="py-4 px-6 text-foreground/80">Custom background color (CSS color value).</td>
                                        </tr>

                                        {/* textColor */}
                                        <tr>
                                            <td className="py-4 px-6 font-mono text-accent font-medium">textColor</td>
                                            <td className="py-4 px-6 font-mono text-muted-foreground">string</td>
                                            <td className="py-4 px-6 font-mono text-muted-foreground">-</td>
                                            <td className="py-4 px-6 text-foreground/80">Custom text color (CSS color value).</td>
                                        </tr>

                                        {/* animationDuration */}
                                        <tr>
                                            <td className="py-4 px-6 font-mono text-accent font-medium">animationDuration</td>
                                            <td className="py-4 px-6 font-mono text-muted-foreground">number</td>
                                            <td className="py-4 px-6 font-mono text-muted-foreground">0.4</td>
                                            <td className="py-4 px-6 text-foreground/80">Duration of the wave animation in seconds.</td>
                                        </tr>

                                        {/* staggerDelay */}
                                        <tr>
                                            <td className="py-4 px-6 font-mono text-accent font-medium">staggerDelay</td>
                                            <td className="py-4 px-6 font-mono text-muted-foreground">number</td>
                                            <td className="py-4 px-6 font-mono text-muted-foreground">0.03</td>
                                            <td className="py-4 px-6 text-foreground/80">Delay between each character's animation in seconds.</td>
                                        </tr>

                                        {/* animationEase */}
                                        <tr>
                                            <td className="py-4 px-6 font-mono text-accent font-medium">animationEase</td>
                                            <td className="py-4 px-6 font-mono text-muted-foreground">string</td>
                                            <td className="py-4 px-6 font-mono text-muted-foreground">power3.out</td>
                                            <td className="py-4 px-6 text-foreground/80">GSAP easing function for the animation.</td>
                                        </tr>

                                        {/* translateDistance */}
                                        <tr>
                                            <td className="py-4 px-6 font-mono text-accent font-medium">translateDistance</td>
                                            <td className="py-4 px-6 font-mono text-muted-foreground">number</td>
                                            <td className="py-4 px-6 font-mono text-muted-foreground">24</td>
                                            <td className="py-4 px-6 text-foreground/80">Distance in pixels that characters move during animation.</td>
                                        </tr>

                                        {/* type */}
                                        <tr>
                                            <td className="py-4 px-6 font-mono text-accent font-medium">type</td>
                                            <td className="py-4 px-6 font-mono text-muted-foreground">enum</td>
                                            <td className="py-4 px-6 font-mono text-muted-foreground">button</td>
                                            <td className="py-4 px-6 text-foreground/80">
                                                HTML button type. One of <span className="opacity-70 bg-card-bg px-1 rounded">button</span>, <span className="opacity-70 bg-card-bg px-1 rounded">submit</span>, or <span className="opacity-70 bg-card-bg px-1 rounded">reset</span>.
                                            </td>
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
