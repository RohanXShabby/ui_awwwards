import { Menu, List } from 'lucide-react';
import { Category, ComponentId } from '@/types';

interface MobileHeaderProps {
    activeCategory: Category;
    activeComponent: ComponentId;
    onOpenLeft: () => void;
    onOpenRight: () => void;
}

export const MobileHeader = ({
    activeCategory,
    activeComponent,
    onOpenLeft,
    onOpenRight
}: MobileHeaderProps) => {
    return (
        <div className="lg:hidden flex-none h-14 border-b border-card-border bg-background/50 backdrop-blur-md px-4 flex items-center justify-between z-30 sticky top-0">
            <button
                onClick={onOpenLeft}
                className="p-2 -ml-2 text-muted-foreground hover:text-foreground hover:bg-accent/10 rounded-lg transition-colors"
            >
                <Menu className="w-6 h-6" />
            </button>

            <div className="font-medium text-sm text-muted-foreground flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                {activeCategory} / {activeComponent}
            </div>

            <button
                onClick={onOpenRight}
                className="p-2 -mr-2 text-accent hover:bg-accent/10 rounded-lg transition-colors"
            >
                <List className="w-6 h-6" />
            </button>
        </div>
    );
};