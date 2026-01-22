'use client'
import React from 'react';
import { CodeViewer } from '../../CodeViewer';
import { ComponentPreview } from '../../ComponentPreview';
import PulseButton from '@/content/Buttons/PulseButton';

export const PulseButtonDemo: React.FC = () => {
    const exampleCode = `'use client'
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
            className={\`relative overflow-hidden rounded-lg px-5 py-2 font-medium
        bg-yellow-400 text-black transition
        disabled:opacity-50 disabled:cursor-not-allowed
        \${className}\`}
        >
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
            <span className="relative z-10">{text || children}</span>
            <style>{\`
        @keyframes pulse {
          0% { transform: scale(0); opacity: 0.5; }
          100% { transform: scale(2.5); opacity: 0; }
        }
      \`}</style>
        </button>
    );
}`;

    return (
        <div className="w-full mx-auto space-y-8 pb-12">
            <div>
                <h1 className="text-3xl font-bold text-foreground mb-4">Pulse Button</h1>
                <p className="text-muted-foreground text-lg">
                    A button with a dynamic pulse ripple effect on click. It supports both <span className="opacity-70 bg-card-bg px-1 rounded">text</span> props and <span className="opacity-70 bg-card-bg px-1 rounded">children</span>.
                </p>
            </div>

            <ComponentPreview>
                <div className="w-full flex flex-col items-center gap-8 py-16">
                    <div className='flex flex-wrap items-center justify-center gap-6'>
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-xs text-muted-foreground">Using text prop</span>
                            <PulseButton text="Click Me" />
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-xs text-muted-foreground">Using children</span>
                            <PulseButton>
                                <span className="flex items-center gap-2">
                                    🚀 Launch
                                </span>
                            </PulseButton>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-xs text-muted-foreground">Disabled</span>
                            <PulseButton text="Disabled" disabled />
                        </div>
                    </div>
                </div>
            </ComponentPreview>

            <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">Manual Installation</h2>
                <CodeViewer code={exampleCode} language="tsx" title="components/PulseButton.tsx" />
            </div>

            <div className="space-y-8 pt-6">
                <h2 className="text-2xl font-semibold text-foreground">API Reference</h2>
                <div className="rounded-md overflow-hidden bg-card-bg/20 ring-1 ring-card-border/30">
                    <table className="w-full text-left border-collapse border-b">
                        <thead>
                            <tr className="bg-card-bg/40 border-b border-card-border/30 text-xs font-semibold text-muted-foreground uppercase">
                                <th className="py-4 px-6">Prop</th>
                                <th className="py-4 px-6">Type</th>
                                <th className="py-4 px-6">Default</th>
                                <th className="py-4 px-6">Description</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-card-border/30">
                            <tr>
                                <td className="py-4 px-6 font-mono text-accent">text</td>
                                <td className="py-4 px-6 font-mono text-muted-foreground">string</td>
                                <td className="py-4 px-6 font-mono text-muted-foreground">-</td>
                                <td className="py-4 px-6">The text to display inside the button.</td>
                            </tr>
                            <tr>
                                <td className="py-4 px-6 font-mono text-accent">children</td>
                                <td className="py-4 px-6 font-mono text-muted-foreground">ReactNode</td>
                                <td className="py-4 px-6 font-mono text-muted-foreground">-</td>
                                <td className="py-4 px-6">React children to display if text is not provided.</td>
                            </tr>
                            <tr>
                                <td className="py-4 px-6 font-mono text-accent">onClick</td>
                                <td className="py-4 px-6 font-mono text-muted-foreground">function</td>
                                <td className="py-4 px-6 font-mono text-muted-foreground">-</td>
                                <td className="py-4 px-6">Click event handler.</td>
                            </tr>
                            <tr>
                                <td className="py-4 px-6 font-mono text-accent">disabled</td>
                                <td className="py-4 px-6 font-mono text-muted-foreground">boolean</td>
                                <td className="py-4 px-6 font-mono text-muted-foreground">false</td>
                                <td className="py-4 px-6">Whether the button is disabled.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
