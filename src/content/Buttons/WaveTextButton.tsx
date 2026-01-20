'use client'
import React, { useRef, useLayoutEffect } from 'react';
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

    // Helper to get GSAP compatible stagger origin
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

    // Styling configurations
    const variants: Record<ButtonVariant, string> = {
        primary: "bg-accent hover:bg-link text-background border-transparent shadow-sm",
        secondary: "bg-slate-800 text-white hover:bg-slate-900 border-transparent shadow-sm",
        outline: "bg-transparent text-white border-2 border-slate-200 hover:border-indigo-600 hover:text-indigo-600",
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

    const buttonClasses = `
        relative flex items-center justify-center overflow-hidden transition-all duration-300 active:scale-95
        ${!bgColor ? variants[variant] : 'border'}
        ${sizes[size]} 
        ${radiusOptions[radius]}
        ${fullWidth ? 'w-full' : 'w-fit'}
        ${disabled ? 'opacity-40 cursor-not-allowed grayscale' : 'cursor-pointer'}
        ${className}
    `.trim().replace(/\s+/g, ' ');

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
                            {char === ' ' ? '\u00A0' : char}
                        </span>

                        {/* Animated Hover Layer */}
                        <span
                            className="bottom-char absolute inline-block opacity-0 whitespace-pre"
                            style={{ transform: `translateY(${translateDistance}px)` }}
                        >
                            {char === ' ' ? '\u00A0' : char}
                        </span>
                    </span>
                ))}
            </span>
        </button>
    );
};

export default WaveTextButton;