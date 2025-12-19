"use client"

import { useState } from 'react'
import { Search } from 'lucide-react';

// Import local components and data
import { TEMPLATES } from '@/data/template';
import { TemplateHeader } from '@/components/templates/template_header';
import { TemplateFilters } from '@/components/templates/template_filter';
import { TemplateCard } from '@/components/templates/template_card';
const Page = () => {
    const [filter, setFilter] = useState<'all' | 'free' | 'paid'>('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Filter Logic
    const filteredTemplates = TEMPLATES.filter(template => {
        const matchesType = filter === 'all' || template.type === filter;
        const matchesSearch =
            template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            template.description.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesType && matchesSearch;
    });

    return (
        <div className="relative min-h-screen w-full bg-background text-foreground overflow-x-hidden">

            {/* --- Background Animation --- */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-40 dark:opacity-20">
                {/* Used 'accent' and 'info' from your CSS variables */}
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent/20 blur-[100px] animate-first"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-info/20 blur-[100px] animate-second"></div>
            </div>

            <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">

                {/* Header Section */}
                <TemplateHeader />

                {/* Search and Filters */}
                <TemplateFilters
                    currentFilter={filter}
                    setFilter={setFilter}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />

                {/* Grid Layout */}
                {filteredTemplates.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                        {filteredTemplates.map((template) => (
                            <TemplateCard key={template.id} template={template} />
                        ))}
                    </div>
                ) : (
                    // Empty State
                    <div className="flex flex-col items-center justify-center py-20 animate-in fade-in zoom-in-95">
                        <div className="w-20 h-20 bg-card-bg rounded-md flex items-center justify-center mb-4 border border-card-border">
                            <Search className="w-10 h-10 text-muted-foreground/30" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-foreground">No templates found</h3>
                        <p className="text-muted-foreground">Try adjusting your search or filters</p>
                        <button
                            onClick={() => { setFilter('all'); setSearchQuery(''); }}
                            className="mt-6 text-accent hover:underline text-sm font-medium"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Page;