import { Layers, Github } from 'lucide-react';
import { Category, ComponentId } from '@/types';
import { getComponentById } from '@/registry';
import Link from 'next/link';

interface ComponentViewProps {
    activeCategory: Category;
    activeComponent: ComponentId;
}

export const ComponentView = ({ activeCategory, activeComponent }: ComponentViewProps) => {
    const componentEntry = getComponentById(activeComponent);

    // 1. Empty State
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

    // 2. Component View
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

            {/* Footer inside Content Area */}
            <footer className="mt-auto p-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium text-muted-foreground">Build By <Link href="https://www.linkedin.com/in/rohan-bisht-7240a9246/" target="_blank" className="underline text-foreground">Rohan Bisht</Link></p>
                        <p className="text-sm font-medium text-muted-foreground">Built with <Link href="https://nextjs.org" target="_blank" className="underline text-foreground">Next.js</Link></p>
                    </div>
                    <div className="flex items-center gap-4">
                        <a href="https://github.com/rohanxshabby" className="p-2 rounded-full hover:bg-card-bg text-muted-foreground hover:text-foreground transition-colors">
                            <Github className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};