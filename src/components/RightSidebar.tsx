import React, { useState, memo } from 'react';
import { motion } from 'framer-motion';
import { Virtuoso } from 'react-virtuoso';
import { Category, ComponentId } from '../types';
import { getComponentsByCategory, ComponentEntry } from '../registry';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RightSidebarProps {
  activeCategory: Category;
  activeComponent: ComponentId;
  onSelectComponent: (id: ComponentId) => void;
}

const ComponentItem = memo(({
  comp,
  isActive,
  isHovered,
  onSelect,
  onHover
}: {
  comp: ComponentEntry;
  isActive: boolean;
  isHovered: boolean;
  onSelect: (id: ComponentId) => void;
  onHover: (id: ComponentId | null) => void;
}) => {
  const showIndicator = isHovered || (isActive && !isHovered);

  return (
    <button
      onClick={() => onSelect(comp.id)}
      onMouseEnter={() => onHover(comp.id)}
      className={cn(
        "relative flex items-center justify-between w-full px-4 py-2.5 rounded-md transition-all duration-200 cursor-pointer mb-1 outline-none group z-10 text-left whitespace-nowrap",
        isActive ? "text-accent font-medium" : "text-muted-foreground hover:text-foreground"
      )}
    >
      {/* VERTICAL INDICATOR BAR */}
      {showIndicator && (
        <motion.div
          layoutId="right-sidebar-indicator"
          className="absolute left-0 w-[2px] bg-accent rounded-r-full h-1/2 top-1/2 -translate-y-1/2 z-20"
          initial={false}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 35
          }}
        />
      )}

      {/* Content */}
      <span className="relative z-10 text-sm transition-colors">{comp.label}</span>

      {/* Chevron Animation */}
      {isActive && (
        <motion.div
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronRight className="w-3.5 h-3.5 relative z-10 text-accent" />
        </motion.div>
      )}
    </button>
  );
});

ComponentItem.displayName = 'ComponentItem';

export const RightSidebarSkeleton = () => (
  <div className="h-full flex flex-col py-6 bg-background animate-pulse">
    <div className="px-6 mb-4">
      <div className="h-3 w-32 bg-muted/20 rounded" />
    </div>
    <div className="flex-1 px-3 space-y-2">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-10 w-full bg-muted/10 rounded-md" />
      ))}
    </div>
  </div>
);

export const RightSidebar: React.FC<RightSidebarProps> = ({
  activeCategory,
  activeComponent,
  onSelectComponent
}) => {
  const [hoveredComponent, setHoveredComponent] = useState<ComponentId | null>(null);
  const availableComponents = getComponentsByCategory(activeCategory);

  return (
    <div className="relative z-100 h-full flex flex-col py-6 bg-background">
      <div className="px-6 mb-4 shrink-0">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
          {activeCategory} Components
        </h3>
      </div>

      <div className="flex-1 min-h-0 px-2">
        {availableComponents.length > 0 ? (
          <Virtuoso
            style={{ height: '100%' }}
            data={availableComponents}
            onMouseLeave={() => setHoveredComponent(null)}
            itemContent={(index, comp) => (
              <ComponentItem
                key={comp.id}
                comp={comp}
                isActive={activeComponent === comp.id}
                isHovered={hoveredComponent === comp.id}
                onSelect={onSelectComponent}
                onHover={setHoveredComponent}
              />
            )}
            components={{
              ScrollSeekPlaceholder: () => (
                <div className="h-10 w-full animate-pulse bg-muted/20 rounded-md mb-1" />
              )
            }}
          />
        ) : (
          <div className="px-4 py-8 text-center">
            <div className="text-sm text-muted-foreground italic bg-secondary/30 rounded-lg p-4 border border-dashed border-border">
              No components available yet.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};