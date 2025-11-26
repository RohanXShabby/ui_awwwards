"use client"

import { useState } from 'react'
import { X } from 'lucide-react';

// Imports
import { Category, ComponentId } from '@/types';
import { getFirstComponentInCategory } from '@/registry';
import { LeftSidebar } from '@/components/Sidebar';
import { RightSidebar } from '@/components/RightSidebar';

// Local Component Imports
import { useSidebarLogic } from '@/hooks/use_sidebar_logic';
import { MobileHeader } from '@/components/docs/mobile_header';
import { ComponentView } from '@/components/docs/component_view';
import { MobileOverlay } from '@/components/docs/mobile_overlay';

const Page = () => {
    // 1. Content State
    const [activeCategory, setActiveCategory] = useState<Category>(Category.ACTIONS);
    const [activeComponent, setActiveComponent] = useState<ComponentId>(ComponentId.BUTTON);

    // 2. Layout Logic (Hook)
    const { showLeftSidebar, setShowLeftSidebar, showRightSidebar, setShowRightSidebar } = useSidebarLogic();

    // 3. Handlers
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

    return (
        <div className="relative w-full h-screen pt-[8vh] flex flex-col overflow-hidden bg-background text-foreground">

            {/* --- Mobile Header --- */}
            <MobileHeader
                activeCategory={activeCategory}
                activeComponent={activeComponent}
                onOpenLeft={() => setShowLeftSidebar(true)}
                onOpenRight={() => setShowRightSidebar(true)}
            />

            {/* --- Main Content Layout --- */}
            <div className="flex-1 flex min-h-0">

                {/* --- LEFT SIDEBAR --- */}
                <aside className={`
                    fixed inset-y-0 left-0 z-150 lg:w-72 lg:static lg:z-auto
                    bg-background flex flex-col shadow-2xl lg:shadow-none
                    transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]
                    ${showLeftSidebar ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}>
                    {/* Mobile Close Button */}
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

                {/* --- CENTER CONTENT --- */}
                <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-transparent">
                    <div className="flex-1 overflow-y-auto scroll-smooth p-4 sm:p-8 lg:p-12">
                        <div className="max-w-6xl mx-auto min-h-[500px] flex flex-col">
                            <ComponentView
                                activeCategory={activeCategory}
                                activeComponent={activeComponent}
                            />
                        </div>
                    </div>
                </main>

                {/* --- RIGHT SIDEBAR --- */}
                <aside className={`
                    fixed inset-y-0 right-0 z-100 lg:w-72 lg:static lg:z-auto
                    bg-background flex flex-col shadow-2xl lg:shadow-none
                    transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]
                    ${showRightSidebar ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
                `}>
                    {/* Mobile Close Button */}
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

            {/* --- Overlay --- */}
            <MobileOverlay
                isVisible={showLeftSidebar || showRightSidebar}
                onClose={() => { setShowLeftSidebar(false); setShowRightSidebar(false); }}
            />
        </div>
    );
};

export default Page;