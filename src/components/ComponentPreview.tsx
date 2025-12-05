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
        <div className={cn("flex flex-col w-full", className)}>
            <div className="flex items-center justify-between shrink-0">
                <h2 className="text-lg font-semibold text-foreground tracking-tight">{title}</h2>
            </div>

            {/* Window Containe*/}
            <div className=" flex flex-col w-full rounded-3xl shadow-sm ring-1 ring-black/5 dark:ring-white/5 transition-all hover:shadow-md bg-card-bg/20 backdrop-blur-md">

                {/* Header Bar */}
                <div className="px-6 py-4 border-b sticky top-0 border-white/5 bg-card-bg/40 rounded-t-3xl shrink-0">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/40"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/40"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/40"></div>
                    </div>
                </div>

                {/* Interactive Canvas*/}
                <div className={cn(
                    "w-full overflow-hidden min-h-[200px] flex flex-col items-center justify-center",
                )}>
                    <div className="w-full h-full">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};