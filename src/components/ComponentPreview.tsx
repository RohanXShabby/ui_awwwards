import React from 'react';
import { cn } from '@/lib/utils'; // Assuming you have a standard cn utility

interface ComponentPreviewProps {
    children: React.ReactNode;
    title?: string;
    className?: string;
    align?: 'center' | 'start' | 'end';
}

export const ComponentPreview: React.FC<ComponentPreviewProps> = ({
    children,
    title = "Component Preview",
    className,
    align = 'center'
}) => {
    return (
        <div className={cn("space-y-4", className)}>
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground tracking-tight">{title}</h2>
            </div>

            {/* Window Container */}
            <div className="rounded-3xl overflow-hidden shadow-sm  ring-1 ring-black/5 dark:ring-white/5 transition-all hover:shadow-md">

                {/* Header Bar (Traffic Lights) */}
                <div className="px-6 py-4 bg-card-bg/50 backdrop-blur-md flex items-center gap-2 border-b border-white/5">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-error/40"></div>
                        <div className="w-3 h-3 rounded-full bg-warning/40"></div>
                        <div className="w-3 h-3 rounded-full bg-success/40"></div>
                    </div>
                </div>

                {/* Interactive Canvas */}
                <div className={cn(
                    "p-8 md:p-12 bg-background/50 backdrop-blur-sm min-h-[200px]",
                    // Alignment logic
                    align === 'center' && "flex items-center justify-center",
                    align === 'start' && "block",
                    align === 'end' && "flex flex-col items-end"
                )}>
                    <div className="w-full max-w-2xl mx-auto">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};