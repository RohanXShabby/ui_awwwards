'use client'

import { useEffect, useState } from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { X } from 'lucide-react';

import { Category, ComponentId } from '@/types';
import {
    categoryToSlug,
    componentBelongsToCategory,
    componentToSlug,
    getFirstComponentInCategory,
    slugToCategory,
    slugToComponentId,
} from '@/registry';
import { LeftSidebar } from '@/components/Sidebar';
import { RightSidebar } from '@/components/RightSidebar';
import { useSidebarLogic } from '@/hooks/use_sidebar_logic';
import { MobileHeader } from '@/components/docs/mobile_header';
import { ComponentView } from '@/components/docs/component_view';
import { MobileOverlay } from '@/components/docs/mobile_overlay';

const DEFAULT_CATEGORY = Category.Buttons;
const DEFAULT_COMPONENT = ComponentId.DECRYPT;

const buildPath = (category: Category, component: ComponentId) =>
    `/component/${categoryToSlug(category)}/${componentToSlug(component)}`;

const resolveStateFromParams = (categorySlug?: string, componentSlug?: string) => {
    const category = slugToCategory(categorySlug) ?? DEFAULT_CATEGORY;
    const candidateComponent = slugToComponentId(componentSlug);
    const component = candidateComponent && componentBelongsToCategory(candidateComponent, category)
        ? candidateComponent
        : getFirstComponentInCategory(category) ?? DEFAULT_COMPONENT;

    return { category, component };
};

const Page = () => {
    const params = useParams<{ category?: string; component?: string }>();
    const pathname = usePathname();
    const router = useRouter();

    const {
        showLeftSidebar,
        setShowLeftSidebar,
        showRightSidebar,
        setShowRightSidebar
    } = useSidebarLogic();

    const [{ activeCategory, activeComponent }, setActiveState] = useState(() => {
        const { category, component } = resolveStateFromParams(
            params?.category as string,
            params?.component as string
        );
        return { activeCategory: category, activeComponent: component };
    });

    useEffect(() => {
        const { category, component } = resolveStateFromParams(
            params?.category as string,
            params?.component as string
        );
        setActiveState({ activeCategory: category, activeComponent: component });

        const targetPath = buildPath(category, component);
        if (pathname !== targetPath) {
            router.replace(targetPath);
        }
    }, [params?.category, params?.component, pathname, router]);

    const navigateTo = (category: Category, component: ComponentId) => {
        setActiveState({ activeCategory: category, activeComponent: component });
        const targetPath = buildPath(category, component);
        if (pathname !== targetPath) {
            router.replace(targetPath);
        }
    };

    const handleCategorySelect = (category: Category) => {
        const firstComponent = getFirstComponentInCategory(category) ?? DEFAULT_COMPONENT;
        navigateTo(category, firstComponent);
        setShowLeftSidebar(false);
    };

    const handleComponentSelect = (componentId: ComponentId) => {
        if (!componentBelongsToCategory(componentId, activeCategory)) return;
        navigateTo(activeCategory, componentId);
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
                    bg-background flex flex-col
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
                    <div className="flex-1 overflow-y-auto scroll-smooth custom-scrollbar p-4 sm:p-8 lg:p-12">
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
                    bg-background flex flex-col
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

