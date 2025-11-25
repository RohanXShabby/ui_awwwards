import React from 'react';
import { Category, ComponentId } from './types';
import { ButtonDoc } from './components/demos/ButtonDoc';
import { InputDoc } from './components/demos/InputDoc';
import { CardDoc } from './components/demos/CardDoc';
import { AvatarDoc } from './components/demos/AvatarDoc';
import { BadgeDoc } from './components/demos/BadgeDoc';
import { AlertDoc } from './components/demos/AlertDoc';
import { ToggleLeft, Terminal, CreditCard, MessageSquare } from 'lucide-react';

export interface ComponentEntry {
    id: ComponentId;
    label: string;
    category: Category;
    component: React.FC;
}

export interface CategoryMeta {
    id: Category;
    label: string;
    icon: React.ElementType;
}

// Defines the available categories and their metadata (icons, labels)
export const CATEGORY_METADATA: CategoryMeta[] = [
    { id: Category.ACTIONS, label: 'Actions', icon: ToggleLeft },
    { id: Category.FORMS, label: 'Forms', icon: Terminal },
    { id: Category.DATA_DISPLAY, label: 'Data Display', icon: CreditCard },
    { id: Category.FEEDBACK, label: 'Feedback', icon: MessageSquare },
];

// Central definition of all components in the system
export const COMPONENT_REGISTRY: ComponentEntry[] = [
    { id: ComponentId.BUTTON, label: 'Button', category: Category.ACTIONS, component: ButtonDoc },
    { id: ComponentId.INPUT, label: 'Input Field', category: Category.FORMS, component: InputDoc },
    { id: ComponentId.CARD, label: 'Card', category: Category.DATA_DISPLAY, component: CardDoc },
    { id: ComponentId.AVATAR, label: 'Avatar', category: Category.DATA_DISPLAY, component: AvatarDoc },
    { id: ComponentId.BADGE, label: 'Badge', category: Category.DATA_DISPLAY, component: BadgeDoc },
    { id: ComponentId.ALERT, label: 'Alert', category: Category.FEEDBACK, component: AlertDoc },
];

// Helper functions to query the registry
export const getComponentsByCategory = (category: Category) =>
    COMPONENT_REGISTRY.filter(c => c.category === category);

export const getComponentById = (id: ComponentId) =>
    COMPONENT_REGISTRY.find(c => c.id === id);

export const getFirstComponentInCategory = (category: Category) =>
    COMPONENT_REGISTRY.find(c => c.category === category)?.id;