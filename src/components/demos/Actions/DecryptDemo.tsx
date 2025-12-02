import React, { useState } from 'react';
import { CodeViewer } from '../../CodeViewer';
import { Loader2, Mail, AlertCircle, Info, CheckCircle2, XCircle } from 'lucide-react';
import { ComponentPreview } from '../../ComponentPreview';
import DecryptedText from '@/content/Actions/decrypt';

export const DecryptDoc: React.FC = () => {
    const [isHovered1, setIsHovered1] = useState(false);
    const [isHovered2, setIsHovered2] = useState(false);

    const exampleCode = ` import { useEffect, useState, useRef } from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

interface DecryptedTextProps extends HTMLMotionProps<'span'> {
    text: string;
    speed?: number;
    maxIterations?: number;
    sequential?: boolean;
    revealDirection?: 'start' | 'end' | 'center';
    useOriginalCharsOnly?: boolean;
    characters?: string;
    className?: string;
    encryptedClassName?: string;
    parentClassName?: string;
    animateOn?: 'view' | 'hover' | 'both';
}

export default function DecryptedText({
    text,
    speed = 50,
    maxIterations = 10,
    sequential = false,
    revealDirection = 'start',
    useOriginalCharsOnly = false,
    characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+',
    className = '',
    parentClassName = '',
    encryptedClassName = '',
    animateOn = 'hover',
    ...props
}: DecryptedTextProps) {
    const [displayText, setDisplayText] = useState<string>(text);
    const [isHovering, setIsHovering] = useState<boolean>(false);
    const [isScrambling, setIsScrambling] = useState<boolean>(false);
    const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());
    const [hasAnimated, setHasAnimated] = useState<boolean>(false);
    const containerRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        let currentIteration = 0;

        const getNextIndex = (revealedSet: Set<number>): number => {
            const textLength = text.length;
            switch (revealDirection) {
                case 'start':
                    return revealedSet.size;
                case 'end':
                    return textLength - 1 - revealedSet.size;
                case 'center': {
                    const middle = Math.floor(textLength / 2);
                    const offset = Math.floor(revealedSet.size / 2);
                    const nextIndex = revealedSet.size % 2 === 0 ? middle + offset : middle - offset - 1;

                    if (nextIndex >= 0 && nextIndex < textLength && !revealedSet.has(nextIndex)) {
                        return nextIndex;
                    }
                    for (let i = 0; i < textLength; i++) {
                        if (!revealedSet.has(i)) return i;
                    }
                    return 0;
                }
                default:
                    return revealedSet.size;
            }
        };

        const availableChars = useOriginalCharsOnly
            ? Array.from(new Set(text.split(''))).filter(char => char !== ' ')
            : characters.split('');

        const shuffleText = (originalText: string, currentRevealed: Set<number>): string => {
            if (useOriginalCharsOnly) {
                const positions = originalText.split('').map((char, i) => ({
                    char,
                    isSpace: char === ' ',
                    index: i,
                    isRevealed: currentRevealed.has(i)
                }));

                const nonSpaceChars = positions.filter(p => !p.isSpace && !p.isRevealed).map(p => p.char);

                for (let i = nonSpaceChars.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [nonSpaceChars[i], nonSpaceChars[j]] = [nonSpaceChars[j], nonSpaceChars[i]];
                }

                let charIndex = 0;
                return positions
                    .map(p => {
                        if (p.isSpace) return ' ';
                        if (p.isRevealed) return originalText[p.index];
                        return nonSpaceChars[charIndex++];
                    })
                    .join('');
            } else {
                return originalText
                    .split('')
                    .map((char, i) => {
                        if (char === ' ') return ' ';
                        if (currentRevealed.has(i)) return originalText[i];
                        return availableChars[Math.floor(Math.random() * availableChars.length)];
                    })
                    .join('');
            }
        };

        if (isHovering) {
            setIsScrambling(true);
            interval = setInterval(() => {
                setRevealedIndices(prevRevealed => {
                    if (sequential) {
                        if (prevRevealed.size < text.length) {
                            const nextIndex = getNextIndex(prevRevealed);
                            const newRevealed = new Set(prevRevealed);
                            newRevealed.add(nextIndex);
                            setDisplayText(shuffleText(text, newRevealed));
                            return newRevealed;
                        } else {
                            clearInterval(interval);
                            setIsScrambling(false);
                            return prevRevealed;
                        }
                    } else {
                        setDisplayText(shuffleText(text, prevRevealed));
                        currentIteration++;
                        if (currentIteration >= maxIterations) {
                            clearInterval(interval);
                            setIsScrambling(false);
                            setDisplayText(text);
                        }
                        return prevRevealed;
                    }
                });
            }, speed);
        } else {
            setDisplayText(text);
            setRevealedIndices(new Set());
            setIsScrambling(false);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isHovering, text, speed, maxIterations, sequential, revealDirection, characters, useOriginalCharsOnly]);

    useEffect(() => {
        if (animateOn !== 'view' && animateOn !== 'both') return;

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    setIsHovering(true);
                    setHasAnimated(true);
                }
            });
        };

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        const currentRef = containerRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) observer.unobserve(currentRef);
        };
    }, [animateOn, hasAnimated]);

    const hoverProps =
        animateOn === 'hover' || animateOn === 'both'
            ? {
                onMouseEnter: () => setIsHovering(true),
                onMouseLeave: () => setIsHovering(false)
            }
            : {};

    return (
        <motion.span
            ref={containerRef}
            className={\`inline-block whitespace-pre-wrap \${parentClassName}\`}
            {...hoverProps}
            {...props}
        >
            <span className="sr-only">{displayText}</span>

            <span aria-hidden="true">
                {displayText.split('').map((char, index) => {
                    const isRevealedOrDone = revealedIndices.has(index) || !isScrambling || !isHovering;

                    return (
                        <span key={index} className={isRevealedOrDone ? className : encryptedClassName}>
                            {char}
                        </span>
                    );
                })}
            </span>
        </motion.span>
    );
}
`;

    return (
        <div className="w-full  mx-auto space-y-8 pb-12">
            <div>
                <h1 className="text-3xl font-bold text-foreground mb-4">Decrypt Button</h1>
                <p className="text-muted-foreground text-lg">
                    An interactive element used to trigger actions. Includes support for <span className="opacity-70 bg-card-bg px-1 rounded">text</span>, <span className="opacity-70 bg-card-bg px-1 rounded">string</span>, <span className="opacity-70 bg-card-bg px-1 rounded">speed</span>, <span className="opacity-70 bg-card-bg px-1 rounded">maxIterations</span>, <span className="opacity-70 bg-card-bg px-1 rounded">sequential</span>, <span className="opacity-70 bg-card-bg px-1 rounded">revealDirection</span>, <span className="opacity-70 bg-card-bg px-1 rounded">useOriginalCharsOnly</span>, <span className="opacity-70 bg-card-bg px-1 rounded">className</span>, <span className="opacity-70 bg-card-bg px-1 rounded">characters</span>, <span className="opacity-70 bg-card-bg px-1 rounded">encryptedClassName</span>, <span className="opacity-70 bg-card-bg px-1 rounded">parentClassName</span>, <span className="opacity-70 bg-card-bg px-1 rounded">animateOn</span>.
                </p>
            </div>

            {/* Preview Area */}
            <ComponentPreview >
                <div className="w-full flex flex-col items-center">
                    <div className='w-fit mx-auto text-4xl font-black text-muted-foreground/40 mb-4'>
                        Hover Below
                    </div>

                    <div className='flex flex-wrap items-center font-semibold text-muted-foreground justify-center gap-2'>

                        {/* Button 1: Default Values */}
                        <button
                            className='flex border w-50 border-foreground/20 capitalize px-4 py-2 rounded-md items-center justify-center cursor-pointer transition-colors hover:bg-foreground/5'
                            onMouseEnter={() => setIsHovered1(true)}
                            onMouseLeave={() => setIsHovered1(false)}
                        >
                            <DecryptedText
                                text='DEFAULT VALUES'
                                animate={isHovered1}
                            />
                        </button>

                        {/* Button 2: Sequential */}
                        <button
                            className='flex border border-foreground/20 w-50 px-4 py-2 rounded-md items-center justify-center cursor-pointer transition-colors hover:bg-foreground/5'
                            onMouseEnter={() => setIsHovered2(true)}
                            onMouseLeave={() => setIsHovered2(false)}
                        >
                            <DecryptedText
                                text='SEQUENTIAL'
                                speed={70}
                                sequential={true}
                                animate={isHovered2}
                            />
                        </button>
                    </div>
                </div>
            </ComponentPreview>

            <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">CLI Installation</h2>
                <CodeViewer code="Coming Soon..." language="bash" title="Terminal" />
            </div>

            <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">Manual Installation</h2>
                <CodeViewer code={exampleCode} language="tsx" title="components/Button.tsx" />
            </div>

            {/* API Reference */}

            <div className="space-y-8 pt-6">
                <h2 className="text-2xl font-semibold text-foreground">API Reference</h2>

                <div className="space-y-8">
                    {/* Dependencies Box - Cleaned up */}
                    <div>
                        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Dependencies</h3>
                        <div className="inline-flex items-center gap-2 p-3 bg-card-bg/30 rounded-lg text-sm text-foreground ring-1 ring-card-border/50">
                            <span className="text-accent font-mono">npm</span> install motion
                        </div>
                    </div>

                    {/* Props Table - Removed border, used subtle dividers */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Props</h3>

                        <div className="rounded-xl overflow-hidden bg-card-bg/20 ring-1 ring-card-border/30">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-card-bg/40 border-b border-card-border/30 text-xs font-semibold text-muted-foreground uppercase">
                                            <th className="py-4 px-6 whitespace-nowrap">Prop</th>
                                            <th className="py-4 px-6 whitespace-nowrap">Type</th>
                                            <th className="py-4 px-6 whitespace-nowrap">Default</th>
                                            <th className="py-4 px-6 min-w-[200px]">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm divide-y divide-card-border/30">
                                        {/* text */}
                                        <tr>
                                            <td className="py-4 px-6 font-mono text-accent font-medium">text</td>
                                            <td className="py-4 px-6 font-mono text-muted-foreground">string</td>
                                            <td className="py-4 px-6 font-mono text-muted-foreground">-</td>
                                            <td className="py-4 px-6 text-foreground/80">The text content to animate.</td>
                                        </tr>

                                        {/* speed */}
                                        <tr>
                                            <td className="py-4 px-6 font-mono text-accent font-medium">speed</td>
                                            <td className="py-4 px-6 font-mono text-muted-foreground">number</td>
                                            <td className="py-4 px-6 font-mono text-muted-foreground">50</td>
                                            <td className="py-4 px-6 text-foreground/80">The speed of the scrambling animation.</td>
                                        </tr>

                                        {/* maxIterations */}
                                        <tr>
                                            <td className="py-4 px-6 font-mono text-accent font-medium">maxIterations</td>
                                            <td className="py-4 px-6 font-mono text-muted-foreground">number</td>
                                            <td className="py-4 px-6 font-mono text-muted-foreground">10</td>
                                            <td className="py-4 px-6 text-foreground/80">Maximum number of iterations before the text is resolved.</td>
                                        </tr>

                                        {/* sequential */}
                                        <tr>
                                            <td className="py-4 px-6 font-mono text-accent font-medium">sequential</td>
                                            <td className="py-4 px-6 font-mono text-muted-foreground">boolean</td>
                                            <td className="py-4 px-6 font-mono text-muted-foreground">false</td>
                                            <td className="py-4 px-6 text-foreground/80">Whether to reveal the text sequentially or all at once.</td>
                                        </tr>

                                        {/* revealDirection */}
                                        <tr>
                                            <td className="py-4 px-6 font-mono text-accent font-medium">revealDirection</td>
                                            <td className="py-4 px-6 font-mono text-muted-foreground">enum</td>
                                            <td className="py-4 px-6 font-mono text-muted-foreground">start</td>
                                            <td className="py-4 px-6 text-foreground/80">
                                                Direction to reveal text. One of <span className="opacity-70 bg-card-bg px-1 rounded">start</span>, <span className="opacity-70 bg-card-bg px-1 rounded">end</span>, or <span className="opacity-70 bg-card-bg px-1 rounded">center</span>.
                                            </td>
                                        </tr>

                                        {/* useOriginalCharsOnly */}
                                        <tr>
                                            <td className="py-4 px-6 font-mono text-accent font-medium">useOriginalCharsOnly</td>
                                            <td className="py-4 px-6 font-mono text-muted-foreground">boolean</td>
                                            <td className="py-4 px-6 font-mono text-muted-foreground">false</td>
                                            <td className="py-4 px-6 text-foreground/80">If true, only uses characters from the original string for scrambling.</td>
                                        </tr>

                                        {/* characters */}
                                        <tr>
                                            <td className="py-4 px-6 font-mono text-accent font-medium">characters</td>
                                            <td className="py-4 px-6 font-mono text-muted-foreground">string</td>
                                            <td className="py-4 px-6 font-mono text-muted-foreground">Aa-Zz !@#$%^&*()_+</td>
                                            <td className="py-4 px-6 text-foreground/80">String of custom characters to use for the scrambling effect.</td>
                                        </tr>

                                        {/* className */}
                                        <tr>
                                            <td className="py-4 px-6 font-mono text-accent font-medium">className</td>
                                            <td className="py-4 px-6 font-mono text-muted-foreground">string</td>
                                            <td className="py-4 px-6 font-mono text-muted-foreground">-</td>
                                            <td className="py-4 px-6 text-foreground/80">Additional CSS classes for the text element.</td>
                                        </tr>

                                        {/* encryptedClassName */}
                                        <tr>
                                            <td className="py-4 px-6 font-mono text-accent font-medium">encryptedClassName</td>
                                            <td className="py-4 px-6 font-mono text-muted-foreground">string</td>
                                            <td className="py-4 px-6 font-mono text-muted-foreground">-</td>
                                            <td className="py-4 px-6 text-foreground/80">Specific CSS classes applied only to the scrambled/encrypted characters.</td>
                                        </tr>

                                        {/* parentClassName */}
                                        <tr>
                                            <td className="py-4 px-6 font-mono text-accent font-medium">parentClassName</td>
                                            <td className="py-4 px-6 font-mono text-muted-foreground">string</td>
                                            <td className="py-4 px-6 font-mono text-muted-foreground">-</td>
                                            <td className="py-4 px-6 text-foreground/80">CSS classes for the parent container wrapper.</td>
                                        </tr>

                                        {/* animateOn */}
                                        <tr>
                                            <td className="py-4 px-6 font-mono text-accent font-medium">animateOn</td>
                                            <td className="py-4 px-6 font-mono text-muted-foreground">enum</td>
                                            <td className="py-4 px-6 font-mono text-muted-foreground">hover</td>
                                            <td className="py-4 px-6 text-foreground/80">
                                                Trigger condition for the animation. One of <span className="opacity-70 bg-card-bg px-1 rounded">view</span>, <span className="opacity-70 bg-card-bg px-1 rounded">hover</span>, or <span className="opacity-70 bg-card-bg px-1 rounded">both</span>.
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};