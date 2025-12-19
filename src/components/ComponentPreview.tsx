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
                <h2 className="text-lg font-semibold text-foreground pb-4 tracking-tight">{title}</h2>
            </div>

            {/* Window Containe*/}
            <div className="flex flex-col w-full rounded-md border border-card-border bg-card">

                {/* Header Bar */}
                <div className="px-4 py-3 border-b sticky top-0 border-card-border bg-card-bg backdrop-blur-sm rounded-t-md shrink-0 flex items-center justify-between">
                    <div className="flex gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/40"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/40"></div>
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