import React from 'react';
import { Category, ComponentId } from './types';
import { DecryptDoc } from './components/demos/Buttons/DecryptDemo';
import { Button3dDemo } from './components/demos/Buttons/Button3dDemo';
import { ParallaxCardDemo } from './components/demos/Cards/ParallaxCardDemo';
import { ParallaxGalleryDemo } from './components/demos/Cards/ParallaxGalleryDemo';
import { AuroraDemo } from './components/demos/Background/AuroraDemo';
import { ToggleLeft, Terminal, CreditCard, MessageSquare, Layers2, Sparkles } from 'lucide-react';

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
    { id: Category.Buttons, label: 'Buttons', icon: ToggleLeft },
    { id: Category.CARDS, label: 'Cards', icon: Layers2 },
    { id: Category.BACKGROUND, label: 'Background', icon: Sparkles },
];

// Central definition of all components in the system
export const COMPONENT_REGISTRY: ComponentEntry[] = [
    // Background
    { id: ComponentId.AURORA, label: 'Aurora Background', category: Category.BACKGROUND, component: AuroraDemo },
    // Action
    { id: ComponentId.DECRYPT, label: 'Decrypt', category: Category.Buttons, component: DecryptDoc },
    { id: ComponentId.BUTTON_3D, label: 'Button 3D', category: Category.Buttons, component: Button3dDemo },
    // Cards
    { id: ComponentId.PARALLAX_GALLERY, label: 'Parallax Gallery', category: Category.CARDS, component: ParallaxGalleryDemo },
    { id: ComponentId.PARALLAX_CARD, label: 'Parallax Card', category: Category.CARDS, component: ParallaxCardDemo },
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