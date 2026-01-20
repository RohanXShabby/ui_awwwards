import React from 'react';
import { cn } from '@/lib/utils';
import { CodeViewer } from './CodeViewer';

interface UsecaseProps {
    title: string;
    description: string;
    code?: string;
    className?: string;
    align?: 'center' | 'start' | 'end';
}

export const Usecase: React.FC<UsecaseProps> = ({
    title,
    description,
    code,
    className,
    align = 'center'
}) => {
    return (
        <div className={cn("space-y-6", className)}>
            <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground tracking-tight">{title}</h3>
                <p className="text-muted-foreground leading-relaxed text-base">
                    {description}
                </p>
            </div>

            {code && (
                <CodeViewer
                    code={code}
                    language="tsx"
                    title="Implementation"
                />
            )}
        </div>
    );
};
