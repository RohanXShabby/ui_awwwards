"use client"

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { PRICING_FAQS } from '@/data/pricing';

export const PricingFAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="max-w-3xl mx-auto w-full mt-24 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            {/* Section Header */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-2 bg-accent/10 rounded-full mb-4 ring-1 ring-accent/20">
                    <HelpCircle className="w-5 h-5 text-accent mr-2" />
                    <span className="text-sm font-medium text-accent">Common Questions</span>
                </div>
                <h2 className="text-3xl font-bold text-foreground">
                    Frequently Asked <span className="text-accent">Questions</span>
                </h2>
            </div>

            {/* Accordion List */}
            <div className="space-y-4">
                {PRICING_FAQS.map((faq, index) => {
                    const isOpen = openIndex === index;

                    return (
                        <div
                            key={index}
                            className={`
                                group rounded-xl border transition-all duration-300 overflow-hidden
                                ${isOpen
                                    ? 'bg-card-bg border-accent/50 shadow-lg shadow-accent/5'
                                    : 'bg-card-bg/30 border-card-border hover:border-accent/30'}
                            `}
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                            >
                                <span className={`font-semibold text-lg transition-colors ${isOpen ? 'text-accent' : 'text-foreground'}`}>
                                    {faq.question}
                                </span>
                                <ChevronDown
                                    className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${isOpen ? 'rotate-180 text-accent' : ''}`}
                                />
                            </button>

                            <div
                                className={`
                                    transition-all duration-300 ease-in-out
                                    ${isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}
                                `}
                            >
                                <div className="p-6 pt-0 text-muted-foreground leading-relaxed border-t border-dashed border-card-border/50 mx-6 mt-2">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};