"use client"

import { LeftSidebar } from '@/components/Sidebar';
import { RightSidebar } from '@/components/RightSidebar';
import { Category, ComponentId } from '@/types';
import { getComponentById, getFirstComponentInCategory } from '@/registry';
import { useState, useEffect } from 'react'
import { Menu, List, X, ChevronRight, Layers, ExternalLink, Github } from 'lucide-react';
import Link from 'next/link';

const Page = () => {
    const [activeCategory, setActiveCategory] = useState<Category>(Category.ACTIONS);
    const [activeComponent, setActiveComponent] = useState<ComponentId>(ComponentId.BUTTON);
    const [showLeftSidebar, setShowLeftSidebar] = useState(false);
    const [showRightSidebar, setShowRightSidebar] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
        checkDesktop();
        window.addEventListener('resize', checkDesktop);
        return () => window.removeEventListener('resize', checkDesktop);
    }, []);

    // Lock body scroll on mobile when menu is open
    useEffect(() => {
        if (!isDesktop) {
            document.body.style.overflow = (showLeftSidebar || showRightSidebar) ? 'hidden' : '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [showLeftSidebar, showRightSidebar, isDesktop]);

    const handleCategorySelect = (category: Category) => {
        setActiveCategory(category);
        const firstComponentId = getFirstComponentInCategory(category);
        if (firstComponentId) setActiveComponent(firstComponentId);
        setShowLeftSidebar(false);
    };

    const handleComponentSelect = (componentId: ComponentId) => {
        setActiveComponent(componentId);
        setShowRightSidebar(false);
    };

    const renderComponentView = () => {
        const componentEntry = getComponentById(activeComponent);

        if (!componentEntry) {
            return (
                <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4 animate-in fade-in zoom-in-95 duration-500">
                    <div className="w-20 h-20 rounded-3xl bg-card-bg border border-card-border flex items-center justify-center mb-6 shadow-xl shadow-accent/5">
                        <Layers className="w-10 h-10 text-muted-foreground/50" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">No Component Selected</h3>
                    <p className="text-muted-foreground max-w-sm mx-auto">
                        Select a component from the right sidebar to view its documentation and preview.
                    </p>
                </div>
            );
        }

        const ComponentDoc = componentEntry.component;

        return (
            <div className="w-full max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex flex-col gap-2 border-b border-card-border pb-6">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground capitalize">
                        {activeComponent.replace(/-/g, ' ')}
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Interactive component preview and usage guide.
                    </p>
                </div>

                {/* Component Canvas */}
                <div className="rounded-2xl border border-card-border bg-card-bg/30 backdrop-blur-sm overflow-hidden shadow-sm">
                    <div className="p-4 border-b border-card-border bg-card-bg/50 flex items-center gap-2">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-error/40"></div>
                            <div className="w-3 h-3 rounded-full bg-warning/40"></div>
                            <div className="w-3 h-3 rounded-full bg-success/40"></div>
                        </div>
                        <div className="ml-4 px-3 py-1 rounded-md bg-background/50 text-xs font-mono text-muted-foreground border border-card-border/50">
                            Preview
                        </div>
                    </div>
                    <div className="p-8 md:p-12 flex justify-center items-center min-h-[300px] bg-background opacity-100">
                        <ComponentDoc />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="relative h-screen w-full overflow-hidden bg-background text-foreground selection:bg-accent selection:text-white">

            {/* --- Background Animation Effects (Using CSS variables provided) --- */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-40 dark:opacity-20">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent/20 blur-[100px] animate-first"></div>
                <div className="absolute top-[20%] right-[-10%] w-[30%] h-[30%] rounded-full bg-info/20 blur-[100px] animate-second"></div>
                <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] rounded-full bg-accent/10 blur-[120px] animate-third"></div>
            </div>

            {/* --- Mobile Header --- */}
            <nav className="lg:hidden fixed top-0 inset-x-0 h-16 z-40 bg-background/80 backdrop-blur-xl border-b border-card-border px-4 flex items-center justify-between shadow-sm">
                <button
                    onClick={() => setShowLeftSidebar(true)}
                    className="p-2 -ml-2 text-muted-foreground hover:text-foreground hover:bg-card-bg rounded-lg transition-colors"
                >
                    <Menu className="w-6 h-6" />
                </button>

                <div className="font-bold text-lg tracking-tight flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent"></span>
                    NextForge
                </div>

                <button
                    onClick={() => setShowRightSidebar(true)}
                    className="p-2 -mr-2 text-accent hover:bg-accent/10 rounded-lg transition-colors"
                >
                    <List className="w-6 h-6" />
                </button>
            </nav>

            <div className="relative z-10 flex h-full pt-16 lg:pt-0">

                {/* --- Left Sidebar (Categories) --- */}
                <aside className={`
                    fixed lg:static inset-y-0 left-0 z-50 w-[280px] lg:w-72
                    bg-background/95 lg:bg-card-bg/20 backdrop-blur-xl lg:backdrop-blur-none
                    border-r border-card-border shadow-2xl lg:shadow-none
                    transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]
                    flex flex-col
                    ${showLeftSidebar ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}>
                    <div className="h-16 lg:h-20 flex items-center px-6 border-b border-card-border/50 shrink-0">
                        <Link href="/" className="flex items-center gap-2.5 font-bold text-xl tracking-tight">
                            <div className="w-8 h-8 rounded-xl bg-linear-to-r from-accent to-accent/70 flex items-center justify-center text-white shadow-lg shadow-accent/20">
                                <Layers className="w-5 h-5" />
                            </div>
                            LOGO
                        </Link>
                        <button onClick={() => setShowLeftSidebar(false)} className="lg:hidden ml-auto p-1 text-muted-foreground">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto py-6 px-4 custom-scrollbar">
                        <LeftSidebar activeCategory={activeCategory} onSelectCategory={handleCategorySelect} />
                    </div>

                    <div className="p-4 border-t border-card-border/50">
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-card-bg/50 border border-card-border/50">
                            <div className="w-8 h-8 rounded-full bg-linear-to-r from-blue-500 to-purple-500 shrink-0"></div>
                            <div className="overflow-hidden">
                                <p className="text-sm font-medium truncate">v1.0.0 Beta</p>
                                <p className="text-xs text-muted-foreground truncate">Stable Release</p>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* --- Main Content --- */}
                <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-background/50 lg:bg-transparent">
                    {/* Breadcrumbs (Mobile/Tablet only) */}
                    <div className="lg:hidden px-4 py-3 border-b border-card-border/50 flex items-center gap-2 text-sm text-muted-foreground bg-background/50 backdrop-blur-md">
                        <span>{activeCategory.toLowerCase()}</span>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-foreground font-medium">{activeComponent}</span>
                    </div>

                    <div className="flex-1 overflow-y-auto scroll-smooth">
                        <div className="max-w-6xl mt-24 mx-auto px-4 sm:px-8 lg:px-12 py-10 lg:py-12 min-h-[calc(100vh-4rem)] flex flex-col">

                            {renderComponentView()}

                            <footer className="mt-auto pt-20 pb-10 border-t border-card-border/50">
                                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                    <div className="flex flex-col gap-1">
                                        <p className="text-sm font-medium text-foreground">Built with NextForge UI</p>
                                        <p className="text-xs text-muted-foreground">Beautiful, accessible React components.</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <a href="#" className="p-2 rounded-full hover:bg-card-bg text-muted-foreground hover:text-foreground transition-colors">
                                            <Github className="w-5 h-5" />
                                        </a>
                                        <a href="#" className="p-2 rounded-full hover:bg-card-bg text-muted-foreground hover:text-foreground transition-colors">
                                            <ExternalLink className="w-5 h-5" />
                                        </a>
                                    </div>
                                </div>
                            </footer>
                        </div>
                    </div>
                </main>

                {/* --- Right Sidebar (Components List) --- */}
                <aside className={`
                    fixed lg:static inset-y-0 right-0 z-50 w-[280px] lg:w-72
                    bg-background/95 lg:bg-card-bg/20 backdrop-blur-xl lg:backdrop-blur-none
                    border-l border-card-border shadow-2xl lg:shadow-none
                    transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]
                    flex flex-col
                    ${showRightSidebar ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
                `}>
                    <div className="h-16 lg:h-20 flex items-center justify-between px-6 border-b border-card-border/50 shrink-0">
                        <div>
                            <h2 className="font-bold text-lg">Components</h2>
                            <p className="text-xs text-muted-foreground">In <span className="text-accent">{activeCategory.toLowerCase()}</span></p>
                        </div>
                        <button onClick={() => setShowRightSidebar(false)} className="lg:hidden p-1 text-muted-foreground">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                        <RightSidebar
                            activeCategory={activeCategory}
                            activeComponent={activeComponent}
                            onSelectComponent={handleComponentSelect}
                        />
                    </div>
                </aside>
            </div>

            {/* --- Mobile Overlay --- */}
            {(showLeftSidebar || showRightSidebar) && (
                <div
                    className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] lg:hidden animate-in fade-in duration-300"
                    onClick={() => { setShowLeftSidebar(false); setShowRightSidebar(false); }}
                />
            )}
        </div>
    );
};

export default Page;