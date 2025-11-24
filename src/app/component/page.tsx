"use client"

import { LeftSidebar } from '@/components/Sidebar';
import { RightSidebar } from '@/components/RightSidebar';
import { Category, ComponentId } from '@/types';
import { getComponentById, getFirstComponentInCategory } from '@/registry';
import { useState, useEffect } from 'react'
import { Menu, List, X, ChevronRight, Layers, ExternalLink, Github } from 'lucide-react';

const Page = () => {
    const [activeCategory, setActiveCategory] = useState<Category>(Category.ACTIONS);
    const [activeComponent, setActiveComponent] = useState<ComponentId>(ComponentId.BUTTON);

    // Mobile sidebar states
    const [showLeftSidebar, setShowLeftSidebar] = useState(false);
    const [showRightSidebar, setShowRightSidebar] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);

    // Handle Screen Resize
    useEffect(() => {
        const checkDesktop = () => {
            const desktop = window.innerWidth >= 1024;
            setIsDesktop(desktop);
            if (desktop) {
                setShowLeftSidebar(false);
                setShowRightSidebar(false);
            }
        };
        checkDesktop();
        window.addEventListener('resize', checkDesktop);
        return () => window.removeEventListener('resize', checkDesktop);
    }, []);

    // Lock body scroll on mobile when menu is open
    useEffect(() => {
        if (!isDesktop && (showLeftSidebar || showRightSidebar)) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
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
                <div className="flex flex-col items-center justify-center h-[50vh] text-center px-4 animate-in fade-in zoom-in-95 duration-500">
                    <div className="w-20 h-20 rounded-3xl bg-card-bg border border-card-border flex items-center justify-center mb-6 shadow-xl shadow-accent/5">
                        <Layers className="w-10 h-10 text-muted-foreground/50" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">No Component Selected</h3>
                    <p className="text-muted-foreground max-w-sm mx-auto">
                        Select a component from the right sidebar.
                    </p>
                </div>
            );
        }

        const ComponentDoc = componentEntry.component;

        return (
            <div className="w-full max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Header */}
                <div className="flex flex-col gap-2 border-b border-card-border pb-6">
                    <h1 className="text-3xl md:text-4xl hidden lg:block font-bold tracking-tight text-foreground capitalize">
                        {`${activeCategory} > ${activeComponent.replace(/-/g, ' ')}`}
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Interactive component preview and usage guide.
                    </p>
                </div>

                {/* Preview Box */}
                <div className="rounded-2xl border border-card-border bg-card-bg/30 backdrop-blur-sm overflow-hidden shadow-sm">
                    <div className="p-4 border-b border-card-border bg-card-bg/50 flex items-center gap-2">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-error/40"></div>
                            <div className="w-3 h-3 rounded-full bg-warning/40"></div>
                            <div className="w-3 h-3 rounded-full bg-success/40"></div>
                        </div>
                        <div className="ml-4 px-3 py-1 rounded-md bg-background text-xs font-mono text-muted-foreground border border-card-border/50">
                            {` ${activeComponent.toLowerCase()}.tsx`}
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
        // Main Page Wrapper: Uses h-full to fill the remaining space from RootLayout (avoids 100vh issues)
        <div className="relative w-full h-full flex flex-col overflow-hidden bg-background text-foreground">

            {/* --- Background Animation --- */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-40 dark:opacity-20">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent/20 blur-[100px] animate-first"></div>
                <div className="absolute top-[20%] right-[-10%] w-[30%] h-[30%] rounded-full bg-info/20 blur-[100px] animate-second"></div>
            </div>

            {/* 
              --- Mobile Sub-Header --- 
              NOT 'fixed'. It is 'sticky' or just a block so it sits BELOW your Global Navbar.
              Visible only on LG screens and below.
            */}
            <div className="lg:hidden flex-none h-14 border-b border-card-border bg-background/50 backdrop-blur-md px-4 flex items-center justify-between z-30 sticky top-0">
                <button
                    onClick={() => setShowLeftSidebar(true)}
                    className="p-2 -ml-2 text-muted-foreground hover:text-foreground hover:bg-accent/10 rounded-lg transition-colors"
                >
                    <Menu className="w-6 h-6" />
                </button>

                <div className="font-medium text-sm text-muted-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                    {activeCategory} / {activeComponent}
                </div>

                <button
                    onClick={() => setShowRightSidebar(true)}
                    className="p-2 -mr-2 text-accent hover:bg-accent/10 rounded-lg transition-colors"
                >
                    <List className="w-6 h-6" />
                </button>
            </div>

            {/* --- Content Area (Flex Row for Desktop) --- */}
            <div className="flex-1 flex min-h-0 relative z-10">

                {/* --- LEFT SIDEBAR (Categories) --- */}
                <aside className={`
                    fixed inset-y-0 left-0 z-100 w-[280px] lg:w-72 lg:static lg:z-auto
                    bg-background border-r border-card-border
                    flex flex-col shadow-2xl lg:shadow-none
                    transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]
                    ${showLeftSidebar ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}>
                    {/* Mobile Sidebar Header */}
                    <div className="lg:hidden flex items-center justify-between px-4 h-14 border-b border-card-border shrink-0">
                        <span className="font-semibold">Categories</span>
                        <button onClick={() => setShowLeftSidebar(false)} className="p-2 text-muted-foreground hover:bg-accent/10 rounded-md">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto py-4 px-2 custom-scrollbar">
                        <LeftSidebar activeCategory={activeCategory} onSelectCategory={handleCategorySelect} />
                    </div>
                </aside>

                {/* --- MAIN CONTENT --- */}
                <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-transparent">
                    <div className="flex-1 overflow-y-auto scroll-smooth p-4 sm:p-8 lg:p-12">
                        <div className="max-w-6xl mx-auto min-h-[500px] flex flex-col">
                            {renderComponentView()}

                            {/* Footer */}
                            <footer className="mt-auto pt-20 pb-10 border-t border-card-border/50">
                                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                    <div className="flex flex-col gap-1">
                                        <p className="text-sm font-medium text-foreground">Built with NextForge UI</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <a href="#" className="p-2 rounded-full hover:bg-card-bg text-muted-foreground hover:text-foreground transition-colors">
                                            <Github className="w-5 h-5" />
                                        </a>
                                    </div>
                                </div>
                            </footer>
                        </div>
                    </div>
                </main>

                {/* --- RIGHT SIDEBAR (Components) --- */}
                <aside className={`
                    fixed inset-y-0 right-0 z-100 w-[280px] lg:w-72 lg:static lg:z-auto
                    bg-background border-l border-card-border
                    flex flex-col shadow-2xl lg:shadow-none
                    transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]
                    ${showRightSidebar ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
                `}>
                    {/* Mobile Sidebar Header */}
                    <div className="lg:hidden flex items-center justify-between px-4 h-14 border-b border-card-border shrink-0">
                        <span className="font-semibold">Components</span>
                        <button onClick={() => setShowRightSidebar(false)} className="p-2 text-muted-foreground hover:bg-accent/10 rounded-md">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto py-4 px-2 custom-scrollbar">
                        <RightSidebar
                            activeCategory={activeCategory}
                            activeComponent={activeComponent}
                            onSelectComponent={handleComponentSelect}
                        />
                    </div>
                </aside>

            </div>

            {/* --- Mobile Backdrop Overlay --- */}
            {/* Z-index is 50. Sidebars are 100. Sub-header is 30. */}
            {(showLeftSidebar || showRightSidebar) && (
                <div
                    className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] lg:hidden animate-in fade-in duration-300"
                    onClick={() => { setShowLeftSidebar(false); setShowRightSidebar(false); }}
                />
            )}
        </div>
    );
};

export default Page;