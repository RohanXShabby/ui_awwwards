export type TemplateType = 'free' | 'paid';

export interface Template {
    id: string;
    title: string;
    description: string;
    image: string; // CSS class for background or Image URL
    type: TemplateType;
    price?: string;
    category: string;
    techStack: string[];
}