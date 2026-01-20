'use client';
import React, { useState, memo } from 'react';
import { motion } from 'framer-motion';
import { Virtuoso } from 'react-virtuoso';
import { Category } from '../types';
import { CATEGORY_METADATA, CategoryMeta } from '../registry';
import { cn } from '@/lib/utils';

interface LeftSidebarProps {
  activeCategory: Category;
  onSelectCategory: (category: Category) => void;
}

const CategoryItem = memo(({
  meta,
  isActive,
  isHovered,
  onSelect,
  onHover
}: {
  meta: CategoryMeta;
  isActive: boolean;
  isHovered: boolean;
  onSelect: (category: Category) => void;
  onHover: (category: Category | null) => void;
}) => {
  const Icon = meta.icon as React.ComponentType<{ className: string }>;
  const showIndicator = isHovered || (isActive && !isHovered);

  return (
    <button
      onClick={() => onSelect(meta.id)}
      onMouseEnter={() => onHover(meta.id)}
      className={cn(
        "relative flex items-center gap-3 px-4 py-3 w-full text-left rounded-md transition-all duration-200 outline-none group z-10 whitespace-nowrap",
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
});

CategoryItem.displayName = 'CategoryItem';

export const LeftSidebarSkeleton = () => (
  <div className="h-full flex flex-col py-6 bg-background animate-pulse">
    <div className="px-6 mb-4">
      <div className="h-3 w-20 bg-muted/20 rounded" />
    </div>
    <div className="flex-1 px-3 space-y-2">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="h-11 w-full bg-muted/10 rounded-md" />
      ))}
    </div>
  </div>
);

export const LeftSidebar: React.FC<LeftSidebarProps> = ({ activeCategory, onSelectCategory }) => {
  const [hoveredCategory, setHoveredCategory] = useState<Category | null>(null);

  return (
    <div className="h-full flex flex-col py-6 bg-background">
      {/* Categories Header */}
      <div className="px-6 mb-4 shrink-0">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
          Categories
        </h3>
      </div>

      {/* Navigation List - Virtualized */}
      <div className="flex-1 min-h-0 px-3">
        <Virtuoso
          style={{ height: '100%' }}
          data={CATEGORY_METADATA}
          onMouseLeave={() => setHoveredCategory(null)}
          itemContent={(index, meta) => (
            <div className="pb-1">
              <CategoryItem
                key={meta.id}
                meta={meta}
                isActive={activeCategory === meta.id}
                isHovered={hoveredCategory === meta.id}
                onSelect={onSelectCategory}
                onHover={setHoveredCategory}
              />
            </div>
          )}
          components={{
            ScrollSeekPlaceholder: () => (
              <div className="h-11 w-full animate-pulse bg-muted/20 rounded-md mb-1" />
            )
          }}
        />
      </div>

      {/* Footer Request Box */}
      <div className="mt-auto px-4 pt-6 shrink-0">
        <div className="p-4 bg-linear-to-br from-secondary/50 to-background rounded-md">
          <p className="text-xs text-muted-foreground mb-3">Missing a specific component?</p>
          <button className="w-full py-2 text-xs font-semibold text-primary bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors flex items-center justify-start cursor-pointer">
            Request Category
            <span className="text-[10px] opacity-70 ml-1">↗</span>
          </button>
        </div>
      </div>
    </div>
  );
};