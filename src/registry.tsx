import React from 'react';
import dynamic from 'next/dynamic';
import { Category, ComponentId } from './types';
import { ToggleLeft, Layers2, Sparkles } from 'lucide-react';

export interface ComponentEntry {
    id: ComponentId;
    label: string;
    category: Category;
    component: React.ComponentType<any>;
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

export const COMPONENT_REGISTRY: ComponentEntry[] = [
    // Background
    {
        id: ComponentId.AURORA,
        label: 'Aurora Background',
        category: Category.BACKGROUND,
        component: dynamic(() => import('./components/demos/Background/AuroraDemo').then(mod => mod.AuroraDemo), {
            loading: () => <div className="h-40 w-full animate-pulse bg-muted rounded-md" />
        })
    },
    // Action
    {
        id: ComponentId.DECRYPT,
        label: 'Decrypt',
        category: Category.Buttons,
        component: dynamic(() => import('./components/demos/Buttons/DecryptDemo').then(mod => mod.DecryptDoc), {
            loading: () => <div className="h-40 w-full animate-pulse bg-muted rounded-md" />
        })
    },
    {
        id: ComponentId.BUTTON_3D,
        label: 'Button 3D',
        category: Category.Buttons,
        component: dynamic(() => import('./components/demos/Buttons/Button3dDemo').then(mod => mod.Button3dDemo), {
            loading: () => <div className="h-40 w-full animate-pulse bg-muted rounded-md" />
        })
    },
    {
        id: ComponentId.WAVE_BUTTON,
        label: 'Wave Button',
        category: Category.Buttons,
        component: dynamic(() => import('./components/demos/Buttons/WaveTextButtonDemo').then(mod => mod.WaveButtonDemo), {
            loading: () => <div className="h-40 w-full animate-pulse bg-muted rounded-md" />
        })
    },
    {
        id: ComponentId.PULSE_BUTTON,
        label: 'Pulse Button',
        category: Category.Buttons,
        component: dynamic(() => import('./components/demos/Buttons/PulseButtonDemo').then(mod => mod.PulseButtonDemo), {
            loading: () => <div className="h-40 w-full animate-pulse bg-muted rounded-md" />
        })
    },
    // Cards
    {
        id: ComponentId.PARALLAX_GALLERY,
        label: 'Parallax Gallery',
        category: Category.CARDS,
        component: dynamic(() => import('./components/demos/Cards/ParallaxGalleryDemo').then(mod => mod.ParallaxGalleryDemo), {
            loading: () => <div className="h-40 w-full animate-pulse bg-muted rounded-md" />
        })
    },
    {
        id: ComponentId.PARALLAX_CARD,
        label: 'Parallax Card',
        category: Category.CARDS,
        component: dynamic(() => import('./components/demos/Cards/ParallaxCardDemo').then(mod => mod.ParallaxCardDemo), {
            loading: () => <div className="h-40 w-full animate-pulse bg-muted rounded-md" />
        })
    },
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
