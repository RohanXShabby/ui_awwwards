import React, { useState, useContext, useMemo } from 'react';
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

    const createTransparentTheme = (baseTheme: any) => {
        const newTheme = { ...baseTheme };

        // 2. Iterate through every CSS selector (e.g., 'code[class*="language-"]', 'comment', etc.)
        Object.keys(newTheme).forEach((key) => {
            const style = newTheme[key];

            // 3. If the style object has ANY background property...
            if (style.background || style.backgroundColor) {
                // ...create a copy of that specific style object
                const newStyle = { ...style };

                // 4. CRITICAL FIX: Delete the 'background' shorthand property entirely
                // This prevents the React conflict error you were seeing.
                delete newStyle.background;

                // 5. Set the longhand property to transparent
                newStyle.backgroundColor = 'transparent';

                // 6. Assign the cleaned style back to the theme
                newTheme[key] = newStyle;
            }
        });

        return newTheme;
    };

    const transparentTheme = useMemo(() => {
        const base = theme === 'dark' ? vscDarkPlus : vs;
        return createTransparentTheme(base);
    }, [theme]);

    return (
        <div className="group relative rounded-xl overflow-hidden  my-6 transition-colors duration-200">

            {/* Header */}
            {(title || language) && (
                <div className="flex items-center justify-between px-4 py-3 bg-card-bg/60  backdrop-blur-md">
                    <div className="flex items-center gap-2.5">
                        <Terminal className="w-4 h-4 text-muted-foreground font-semibold" />
                        <span className="text-xs font-medium uppercase tracking-wider font-mono text-muted-foreground">
                            {title || language}
                        </span>
                    </div>
                    <button
                        onClick={handleCopy}
                        className="text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-md hover:bg-card-border active:scale-95"
                    >
                        {copied ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                </div>
            )}

            {/* 
               Content Container 
               We apply the background color HERE (bg-card-bg/40).
            */}
            <div className="relative bg-card-bg/20 backdrop-blur-sm">
                <SyntaxHighlighter
                    language={language}
                    style={transparentTheme}
                    customStyle={{
                        margin: 0,
                        padding: '1.5rem',
                        backgroundColor: 'transparent', // Use longhand here too for consistency
                        fontSize: '0.875rem',
                        lineHeight: '1.5',
                        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                    }}
                    codeTagProps={{
                        style: { backgroundColor: 'transparent' } // And here
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