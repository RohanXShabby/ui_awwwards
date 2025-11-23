import React from 'react';
import { Category } from '../types';
import { CATEGORY_METADATA } from '../registry';

interface LeftSidebarProps {
  activeCategory: Category;
  onSelectCategory: (category: Category) => void;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({ activeCategory, onSelectCategory }) => {
  const navItemClass = (isActive: boolean) => `
    flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer mb-1
    ${isActive
      ? 'bg-primary/10 text-primary border-r-2 border-primary'
      : 'text-muted-foreground hover:bg-accent hover:text-foreground'}
  `;

  return (
    <div className="h-full flex flex-col overflow-y-auto py-6">
      <div className="px-6 mb-4">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Categories</h3>
      </div>

      <nav className="px-4">
        {CATEGORY_METADATA.map((meta) => {
          const Icon = meta.icon as React.ComponentType<{ className: string }>;
          return (
            <div
              key={meta.id}
              className={navItemClass(activeCategory === meta.id)}
              onClick={() => onSelectCategory(meta.id)}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{meta.label}</span>
            </div>
          );
        })}
      </nav>

      <div className="mt-auto px-6 pt-6">
        <div className="p-4 bg-secondary/50 rounded-lg border border-card-border">
          <p className="text-xs text-muted-foreground mb-2">Missing a category?</p>
          <button className="text-xs text-primary hover:text-primary/80 font-medium">
            Request a category &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};