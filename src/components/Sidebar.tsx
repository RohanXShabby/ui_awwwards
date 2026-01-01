import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Category } from '../types';
import { CATEGORY_METADATA } from '../registry';
import { cn } from '@/lib/utils';

interface LeftSidebarProps {
  activeCategory: Category;
  onSelectCategory: (category: Category) => void;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({ activeCategory, onSelectCategory }) => {
  const [hoveredCategory, setHoveredCategory] = useState<Category | null>(null);

  // 🎨 STYLING

  return (
    <div className="h-full flex flex-col overflow-y-auto py-6 bg-background ">
      {/* Categories Header */}
      <div className="px-6 mb-4">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
          Categories
        </h3>
      </div>

      {/* Navigation List */}
      <nav
        className="px-3 space-y-1 relative"
        onMouseLeave={() => setHoveredCategory(null)}
      >
        {CATEGORY_METADATA.map((meta) => {
          const Icon = meta.icon as React.ComponentType<{ className: string }>;
          const isActive = activeCategory === meta.id;
          const isHovered = hoveredCategory === meta.id;

          // Indicator should show on hovered item, or on active item if nothing is hovered
          const showIndicator = isHovered || (isActive && !hoveredCategory);

          return (
            <button
              key={meta.id}
              onClick={() => onSelectCategory(meta.id)}
              onMouseEnter={() => setHoveredCategory(meta.id)}
              className={cn(
                "relative flex items-center gap-3 px-4 py-3 w-full text-left rounded-md transition-all duration-200 outline-none group z-10",
                isActive ? "text-accent font-medium" : "text-muted-foreground font-normal hover:text-foreground"
              )}
            >
              {/* VERTICAL INDICATOR BAR */}
              {showIndicator && (
                <motion.div
                  layoutId="sidebar-indicator"
                  className="absolute left-0 w-[2px] bg-accent rounded-r-full h-1/2 top-1/2 -translate-y-1/2 z-20"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 35
                  }}
                />
              )}

              {/* ICON & TEXT */}
              <span className="relative z-10 flex items-center gap-3">
                <Icon className={cn(
                  "w-4 h-4 transition-transform duration-300",
                  isHovered ? "scale-110 text-accent" : "",
                  isActive ? "text-accent" : "text-muted-foreground"
                )} />
                <span className={cn(
                  "text-sm transition-colors",
                  isHovered || isActive ? "text-foreground" : ""
                )}>
                  {meta.label}
                </span>
              </span>
            </button>
          );
        })}
      </nav>

      {/* Footer Request Box */}
      <div className="mt-auto px-4 pt-6">
        <div className="p-4 bg-linear-to-br from-secondary/50 to-background rounded-md">
          <p className="text-xs text-muted-foreground mb-3">Missing a specific component?</p>
          <button className="w-full py-2 text-xs font-semibold text-primary bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors flex items-center justify-start">
            Request Category
            <span className="text-[10px] opacity-70">↗</span>
          </button>
        </div>
      </div>
    </div>
  );
};