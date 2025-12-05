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

// Helper functions to query the registry
export const getComponentsByCategory = (category: Category) =>
    COMPONENT_REGISTRY.filter(c => c.category === category);

export const getComponentById = (id: ComponentId) =>
    COMPONENT_REGISTRY.find(c => c.id === id);

export const getFirstComponentInCategory = (category: Category) =>
    COMPONENT_REGISTRY.find(c => c.category === category)?.id;