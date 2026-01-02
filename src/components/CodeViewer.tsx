"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { Check, Copy, Terminal, ChevronDown, ChevronUp } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';

// Dynamically import SyntaxHighlighter to reduce initial bundle size
const SyntaxHighlighter = dynamic(
    () => import('react-syntax-highlighter').then((mod) => mod.Prism),
    {
        ssr: false,
        loading: () => <div className="h-40 w-full animate-pulse bg-muted/10 rounded-md" />
    }
);

interface CodeViewerProps {
    code: string;
    language?: string;
    title?: string;
    maxHeight?: string;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({
    code,
    language = 'typescript',
    title,
    maxHeight = 'max-h-[300px]'
}) => {
    const [copied, setCopied] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isExpandable = useMemo(() => {
        const lineCount = code.split('\n').length;
        return lineCount > 10;
    }, [code]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    // Prism styles are quite large, so we import them conditionally or just use the objects
    const [prismStyles, setPrismStyles] = useState<{ dark: any; light: any } | null>(null);

    useEffect(() => {
        if (mounted) {
            Promise.all([
                import('react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus'),
                import('react-syntax-highlighter/dist/esm/styles/prism/vs'),
            ]).then(([darkMod, lightMod]) => {
                setPrismStyles({
                    dark: darkMod.default,
                    light: lightMod.default
                });
            });
        }
    }, [mounted]);

    const transparentTheme = useMemo(() => {
        if (!prismStyles) return {};
        const base = resolvedTheme === 'dark' ? prismStyles.dark : prismStyles.light;

        const newTheme = { ...base };
        Object.keys(newTheme).forEach((key) => {
            const style = newTheme[key];
            if (style && (style.background || style.backgroundColor)) {
                const newStyle = { ...style };
                delete newStyle.background;
                newStyle.backgroundColor = 'transparent';
                newTheme[key] = newStyle;
            }
        });
        return newTheme;
    }, [resolvedTheme, prismStyles]);

    return (
        <div className="group relative rounded-md overflow-hidden my-6 transition-colors duration-200 border border-card-border/50 shadow-sm">
            {/* Header */}
            {(title || language) && (
                <div className="flex items-center justify-between px-4 py-3 bg-card-bg/60 backdrop-blur-md border-b border-card-border/50">
                    <div className="flex items-center gap-2.5">
                        <Terminal className="w-4 h-4 text-muted-foreground font-semibold" />
                        <span className="text-xs font-medium uppercase tracking-wider font-mono text-muted-foreground">
                            {title || language}
                        </span>
                    </div>
                    <button
                        onClick={handleCopy}
                        className="text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-md hover:bg-card-border/50 active:scale-95 cursor-pointer"
                        title="Copy code"
                    >
                        {copied ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                </div>
            )}

            {/* Content Container */}
            <div className={`relative bg-card-bg/20 backdrop-blur-sm transition-all duration-300 ease-in-out`}>
                <div className={`
                    ${!isExpanded && isExpandable ? `${maxHeight} overflow-hidden` : ''} 
                    ${isExpandable ? 'pb-10' : ''} 
                `}>
                    {mounted && prismStyles && (
                        <SyntaxHighlighter
                            language={language}
                            style={transparentTheme}
                            customStyle={{
                                margin: 0,
                                padding: '1.5rem',
                                backgroundColor: 'transparent',
                                fontSize: '0.875rem',
                                lineHeight: '1.5',
                                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                            }}
                            codeTagProps={{
                                style: { backgroundColor: 'transparent' }
                            }}
                            wrapLines={true}
                            showLineNumbers={false}
                        >
                            {code}
                        </SyntaxHighlighter>
                    )}
                </div>

                {/* Fade Overlay (Only visible when collapsed) */}
                {!isExpanded && isExpandable && (
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-background to-transparent pointer-events-none" />
                )}

                {/* Expand/Collapse Button */}
                {isExpandable && (
                    <div className="absolute bottom-2 right-2 z-10">
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium 
                                     bg-card-bg/80 hover:bg-card-bg text-foreground border border-card-border/50 
                                     rounded-lg backdrop-blur-md shadow-sm transition-all hover:shadow-md cursor-pointer"
                        >
                            {isExpanded ? (
                                <>
                                    <ChevronUp className="w-3 h-3" />
                                    Collapse
                                </>
                            ) : (
                                <>
                                    <ChevronDown className="w-3 h-3" />
                                    Expand
                                </>
                            )}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
