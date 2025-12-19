"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { Check, Copy, Terminal, ChevronDown, ChevronUp } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from 'next-themes';

interface CodeViewerProps {
    code: string;
    language?: string;
    title?: string;
    maxHeight?: string; // Optional prop to customize collapsed height
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

    // Calculate if the code is long enough to need collapsing
    // You can adjust the threshold (e.g., 10 lines)
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

    const createTransparentTheme = (baseTheme: any) => {
        const newTheme = { ...baseTheme };
        Object.keys(newTheme).forEach((key) => {
            const style = newTheme[key];
            if (style.background || style.backgroundColor) {
                const newStyle = { ...style };
                delete newStyle.background;
                newStyle.backgroundColor = 'transparent';
                newTheme[key] = newStyle;
            }
        });
        return newTheme;
    };

    const transparentTheme = useMemo(() => {
        if (!mounted) return createTransparentTheme(vs);
        const base = resolvedTheme === 'dark' ? vscDarkPlus : vs;
        return createTransparentTheme(base);
    }, [resolvedTheme, mounted]);

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
                        className="text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-md hover:bg-card-border/50 active:scale-95"
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
                                     rounded-lg backdrop-blur-md shadow-sm transition-all hover:shadow-md"
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