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
    FORMS = 'Forms',
    DATA_DISPLAY = 'Data Display',
    FEEDBACK = 'Feedback',
}

export enum ComponentId {
    PARALLAX_CARD = 'PARALLAX_CARD',
    DECRYPT = 'DECRYPT',
    BUTTON = 'BUTTON',
    INPUT = 'INPUT',
    CARD = 'CARD',
    AVATAR = 'AVATAR',
    BADGE = 'BADGE',
    ALERT = 'ALERT',
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