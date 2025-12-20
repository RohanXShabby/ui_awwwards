import { redirect } from 'next/navigation';
import { categoryToSlug, componentToSlug } from '@/registry';
import { Category, ComponentId } from '@/types';

const Page = () => {
    const defaultPath = `/component/${categoryToSlug(Category.Buttons)}/${componentToSlug(ComponentId.DECRYPT)}`;
    redirect(defaultPath);
};

export default Page;