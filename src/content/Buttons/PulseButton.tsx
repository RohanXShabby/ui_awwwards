'use client'
import { useState, MouseEvent } from "react";

type Pulse = {
    id: number;
    x: number;
    y: number;
    size: number;
};

type PulseButtonProps = {
    children?: React.ReactNode;
    text?: string;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    disabled?: boolean;
};

export default function PulseButton({
    children,
    text,
    onClick,
    className = "",
    disabled = false,
}: PulseButtonProps) {
    const [pulses, setPulses] = useState<Pulse[]>([]);

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        if (disabled) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);

        const pulse: Pulse = {
            id: Date.now(),
            x: e.clientX - rect.left - size / 2,
            y: e.clientY - rect.top - size / 2,
            size,
        };

        setPulses((p) => [...p, pulse]);
        onClick?.(e);

        setTimeout(() => {
            setPulses((p) => p.filter((x) => x.id !== pulse.id));
        }, 600);
    };

    return (
        <button
            disabled={disabled}
            onClick={handleClick}
            className={`relative overflow-hidden rounded-lg px-5 py-2 font-medium
        bg-accent text-black transition
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}`}
        >
            {/* Pulse layers */}
            {pulses.map((pulse) => (
                <span
                    key={pulse.id}
                    className="pointer-events-none absolute rounded-full bg-black/30"
                    style={{
                        width: pulse.size,
                        height: pulse.size,
                        left: pulse.x,
                        top: pulse.y,
                        animation: "pulse 600ms ease-out forwards",
                    }}
                />
            ))}

            {/* Content */}
            <span className="relative z-10">{text || children}</span>

            {/* Scoped animation (NO tailwind config needed) */}
            <style>{`
        @keyframes pulse {
          0% {
            transform: scale(0);
            opacity: 0.5;
          }
          100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }
      `}</style>
        </button>
    );
}
