import React from 'react';
import { Category, ComponentId } from './types';
import { InputDoc } from './components/demos/Forms/InputDoc';
import { CardDoc } from './components/demos/Data_Display/CardDoc';
import { AvatarDoc } from './components/demos/Data_Display/AvatarDoc';
import { BadgeDoc } from './components/demos/Data_Display/BadgeDoc';
import { AlertDoc } from './components/demos/Feedbacks/AlertDoc';
import { DecryptDoc } from './components/demos/Actions/DecryptDemo';
import { Button3dDemo } from './components/demos/Actions/Button3dDemo';
import { ParallaxCardDemo } from './components/demos/Cards/ParallaxCardDemo';
import { ParallaxGalleryDemo } from './components/demos/Cards/ParallaxGalleryDemo';
import { ToggleLeft, Terminal, CreditCard, MessageSquare, Layers2 } from 'lucide-react';

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

const normalizeCategorySlug = (value: string) =>
    value.trim().toLowerCase().replace(/[\s_]+/g, '-');

const normalizeComponentSlug = (value: string) =>
    value.trim().toLowerCase().replace(/-/g, '_');

// Defines the available categories and their metadata (icons, labels)
export const CATEGORY_METADATA: CategoryMeta[] = [
    { id: Category.ACTIONS, label: 'Actions', icon: ToggleLeft },
    { id: Category.CARDS, label: 'Cards', icon: Layers2 },
    { id: Category.FORMS, label: 'Forms', icon: Terminal },
    { id: Category.DATA_DISPLAY, label: 'Data Display', icon: CreditCard },
    { id: Category.FEEDBACK, label: 'Feedback', icon: MessageSquare },
];

// Central definition of all components in the system
export const COMPONENT_REGISTRY: ComponentEntry[] = [
    // Action
    { id: ComponentId.DECRYPT, label: 'Decrypt', category: Category.ACTIONS, component: DecryptDoc },
    { id: ComponentId.BUTTON_3D, label: 'Button 3D', category: Category.ACTIONS, component: Button3dDemo },
    // Cards
    { id: ComponentId.PARALLAX_GALLERY, label: 'Parallax Gallery', category: Category.CARDS, component: ParallaxGalleryDemo },
    { id: ComponentId.PARALLAX_CARD, label: 'Parallax Card', category: Category.CARDS, component: ParallaxCardDemo },
    // Forms 
    { id: ComponentId.INPUT, label: 'Input Field', category: Category.FORMS, component: InputDoc },
    // Data Display 
    { id: ComponentId.CARD, label: 'Card', category: Category.DATA_DISPLAY, component: CardDoc },
    { id: ComponentId.AVATAR, label: 'Avatar', category: Category.DATA_DISPLAY, component: AvatarDoc },
    { id: ComponentId.BADGE, label: 'Badge', category: Category.DATA_DISPLAY, component: BadgeDoc },
    // Feedback
    { id: ComponentId.ALERT, label: 'Alert', category: Category.FEEDBACK, component: AlertDoc },
];

const CATEGORY_SLUG_LOOKUP = new Map(
    CATEGORY_METADATA.map(meta => [normalizeCategorySlug(meta.label), meta.id])
);

const COMPONENT_SLUG_LOOKUP = new Map(
    COMPONENT_REGISTRY.map(entry => [normalizeComponentSlug(entry.id), entry.id])
);

// Helper functions to query the registry
export const getComponentsByCategory = (category: Category) =>
    COMPONENT_REGISTRY.filter(c => c.category === category);

export const getComponentById = (id: ComponentId) =>
    COMPONENT_REGISTRY.find(c => c.id === id);

export const getFirstComponentInCategory = (category: Category) =>
    COMPONENT_REGISTRY.find(c => c.category === category)?.id;

export const categoryToSlug = (category: Category) =>
    normalizeCategorySlug(category);

export const componentToSlug = (componentId: ComponentId) =>
    normalizeComponentSlug(componentId);

export const slugToCategory = (slug?: string) =>
    slug ? CATEGORY_SLUG_LOOKUP.get(normalizeCategorySlug(slug)) : undefined;

export const slugToComponentId = (slug?: string) =>
    slug ? COMPONENT_SLUG_LOOKUP.get(normalizeComponentSlug(slug)) : undefined;

export const componentBelongsToCategory = (componentId: ComponentId, category: Category) =>
    COMPONENT_REGISTRY.some(entry => entry.id === componentId && entry.category === category);