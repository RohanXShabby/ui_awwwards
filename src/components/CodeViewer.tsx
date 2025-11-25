import React, { useState, useContext } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ThemeContext } from '@/context/ThemeContext';

interface CodeViewerProps {
    code: string;
    language?: string;
    title?: string;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({ code, language = 'typescript', title }) => {
    const [copied, setCopied] = useState(false);

    // 3. Consume your custom context
    const { theme } = useContext(ThemeContext);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    // 4. Determine style based on your context's string value ('light' | 'dark')
    const isDark = theme === 'dark';
    const syntaxTheme = isDark ? vscDarkPlus : vs;

    return (
        <div className="group relative rounded-xl overflow-hidden border border-card-border bg-card-bg text-foreground my-6 shadow-xl transition-colors duration-200">

            {/* Header Section */}
            {(title || language) && (
                <div className="flex items-center justify-between px-4 py-3 bg-card-bg border-b border-card-border">
                    <div className="flex items-center gap-2.5">
                        <Terminal className="w-4 h-4 text-muted-foreground" />
                        <span className="text-xs font-medium uppercase tracking-wider font-mono text-muted-foreground">
                            {title || language}
                        </span>
                    </div>

                    <button
                        onClick={handleCopy}
                        className="text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-md hover:bg-card-border active:scale-95"
                        title="Copy to clipboard"
                    >
                        {copied ? (
                            <Check className="w-3.5 h-3.5 text-success" />
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
                    // 5. Apply the dynamic style object
                    style={syntaxTheme}
                    customStyle={{
                        margin: 0,
                        padding: '1.5rem',
                        background: 'transparent', // Important: Lets your CSS variable bg-card-bg show through
                        fontSize: '0.875rem',
                        lineHeight: '1.5',
                        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                    }}
                    wrapLines={true}
                    showLineNumbers={false}
                >
                    {code}
                </SyntaxHighlighter>
            </div>
        </div>
    );
};