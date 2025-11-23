import React from 'react';
import { Category, ComponentId } from '../types';
import { getComponentsByCategory } from '../registry';
import { ChevronRight } from 'lucide-react';

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
  
  const availableComponents = getComponentsByCategory(activeCategory);

  return (
    <div className="h-full flex flex-col overflow-y-auto py-6">
      <div className="px-6 mb-4">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
          {activeCategory}
        </h3>
      </div>

      <nav className="px-2">
        {availableComponents.length > 0 ? (
          availableComponents.map((comp) => (
            <div 
              key={comp.id}
              onClick={() => onSelectComponent(comp.id)}
              className={`
                group flex items-center justify-between px-4 py-2.5 rounded-md cursor-pointer transition-all mb-1
                ${activeComponent === comp.id 
                  ? 'bg-accent text-foreground' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'}
              `}
            >
              <span className="text-sm">{comp.label}</span>
              {activeComponent === comp.id && <ChevronRight className="w-3 h-3 text-muted-foreground" />}
            </div>
          ))
        ) : (
          <div className="px-4 py-4 text-sm text-muted-foreground italic">
            No components available in this category yet.
          </div>
        )}
      </nav>
    </div>
  );
};