import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Category, ComponentId } from '../types';
import { getComponentsByCategory } from '../registry';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RightSidebarProps {
  activeCategory: Category;
  activeComponent: ComponentId;
  onSelectComponent: (id: ComponentId) => void;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({
  activeCategory,
  activeComponent,
  onSelectComponent
}) => {
  const [hoveredComponent, setHoveredComponent] = useState<ComponentId | null>(null);
  const availableComponents = getComponentsByCategory(activeCategory);

  // 🎨 STYLING CONFIG


  return (
    <div className="relative z-100 h-full flex flex-col overflow-y-auto py-6 bg-background">
      <div className="px-6 mb-4">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
          {activeCategory} Components
        </h3>
      </div>

      <nav
        className="px-2 space-y-1 relative"
        onMouseLeave={() => setHoveredComponent(null)}
      >
        {availableComponents.length > 0 ? (
          availableComponents.map((comp) => {
            const isActive = activeComponent === comp.id;
            const isHovered = hoveredComponent === comp.id;

            const showIndicator = isHovered || (isActive && !hoveredComponent);

            return (
              <button
                key={comp.id}
                onClick={() => onSelectComponent(comp.id)}
                onMouseEnter={() => setHoveredComponent(comp.id)}
                className={cn(
                  "relative flex items-center justify-between w-full px-4 py-2.5 rounded-md transition-all duration-200 cursor-pointer mb-1 outline-none group z-10 text-left",
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
          })
        ) : (
          <div className="px-4 py-8 text-center">
            <div className="text-sm text-muted-foreground italic bg-secondary/30 rounded-lg p-4 border border-dashed border-border">
              No components available yet.
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};