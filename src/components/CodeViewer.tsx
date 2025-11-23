import React, { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'; // VS Code Dark Theme

interface CodeViewerProps {
    code: string;
    language?: string;
    title?: string;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({ code, language = 'typescript', title }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <div className="group relative rounded-xl overflow-hidden border border-card-border/60 bg-[#1e1e1e] ring-1 ring-white/5 my-6 shadow-xl">

            {/* Header Section */}
            {(title || language) && (
                <div className="flex items-center justify-between px-4 py-3 bg-[#252526] border-b border-white/5">
                    <div className="flex items-center gap-2.5">
                        <Terminal className="w-4 h-4 text-muted-foreground/60" />
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider font-mono">
                            {title || language}
                        </span>
                    </div>

                    <button
                        onClick={handleCopy}
                        className="text-muted-foreground hover:text-white transition-colors p-1.5 rounded-md hover:bg-white/10 active:scale-95"
                        title="Copy to clipboard"
                    >
                        {copied ? (
                            <Check className="w-3.5 h-3.5 text-accent" />
                        ) : (
                            <Copy className="w-3.5 h-3.5" />
                        )}
                    </button>
                </div>
            )}

            {/* Syntax Highlighter */}
            <div className="relative">
                <SyntaxHighlighter
                    language={language}
                    style={vscDarkPlus}
                    customStyle={{
                        margin: 0,
                        padding: '1.5rem',
                        background: 'transparent', // Keeps your transparency
                        fontSize: '0.875rem',      // text-sm
                        lineHeight: '1.5',
                        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                    }}
                    wrapLines={true}
                    showLineNumbers={false} // Set to true if you want line numbers
                >
                    {code}
                </SyntaxHighlighter>
            </div>
        </div>
    );
};