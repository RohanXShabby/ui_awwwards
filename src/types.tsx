import React from 'react';

export enum TopLevelView {
    HOME = 'HOME',
    COMPONENTS = 'COMPONENTS',
    TEMPLATES = 'TEMPLATES',
    GENERATOR = 'GENERATOR',
}

export enum Category {
    ACTIONS = 'Actions',
    CARDS = 'Cards',
    BACKGROUND = 'Background',
}

export enum ComponentId {
    PARALLAX_GALLERY = 'PARALLAX_GALLERY',
    BUTTON_3D = 'BUTTON_3D',
    PARALLAX_CARD = 'PARALLAX_CARD',
    DECRYPT = 'DECRYPT',
    BUTTON = 'BUTTON',
    AURORA = 'AURORA',
}

export interface ComponentDoc {
    id: string;
    title: string;
    description: string;
    usage: string;
    preview: React.ReactNode;
}

export interface GeneratedComponent {
    code: string;
    explanation?: string;
}