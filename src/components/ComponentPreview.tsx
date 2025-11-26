import React from 'react';
import { cn } from '@/lib/utils';

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
        <div className={cn("flex flex-col gap-4", className)}>
            <div className="flex items-center justify-between shrink-0">
                <h2 className="text-lg font-semibold text-foreground tracking-tight">{title}</h2>
            </div>

            {/* Window Container - Added 'flex-1' and 'flex flex-col' */}
            <div className="flex-1 flex flex-col rounded-3xl overflow-hidden shadow-sm ring-1 ring-black/5 dark:ring-white/5 transition-all hover:shadow-md bg-card-bg/20 backdrop-blur-md">

                {/* Header Bar */}
                <div className="px-6 py-4 border-b border-white/5 bg-card-bg/40 shrink-0">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/40"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/40"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/40"></div>
                    </div>
                </div>

                {/* Interactive Canvas - Added 'flex-1' so background fills height */}
                <div className={cn(
                    "flex-1 p-8 md:p-12 min-h-[200px]",
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