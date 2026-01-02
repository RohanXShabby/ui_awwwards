'use client'

import { useParams } from 'next/navigation';
import { Category, ComponentId } from '@/types';
import {
    componentBelongsToCategory,
    getFirstComponentInCategory,
    slugToCategory,
    slugToComponentId,
} from '@/registry';
import { ComponentView } from '@/components/docs/component_view';

const DEFAULT_CATEGORY = Category.Buttons;
const DEFAULT_COMPONENT = ComponentId.DECRYPT;

const resolveStateFromParams = (categorySlug?: string, componentSlug?: string) => {
    const category = slugToCategory(categorySlug) ?? DEFAULT_CATEGORY;
    const candidateComponent = slugToComponentId(componentSlug);
    const component = candidateComponent && componentBelongsToCategory(candidateComponent, category)
        ? candidateComponent
        : getFirstComponentInCategory(category) ?? DEFAULT_COMPONENT;

    return { activeCategory: category, activeComponent: component };
};

const Page = () => {
    const params = useParams<{ category?: string; component?: string }>();

    const { activeCategory, activeComponent } = resolveStateFromParams(
        params?.category as string,
        params?.component as string
    );

    return (
        <ComponentView
            activeCategory={activeCategory}
            activeComponent={activeComponent}
        />
    );
};

export default Page;

