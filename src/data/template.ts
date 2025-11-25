import { Template } from '@/types/template';

export const TEMPLATES: Template[] = [
    {
        id: '1',
        title: 'Neo SaaS Starter',
        description: 'A modern, high-conversion landing page for SaaS products with pricing tables and feature grids.',
        image: 'bg-gradient-to-br from-indigo-500/20 to-purple-500/20',
        type: 'paid',
        price: '$49',
        category: 'Landing Page',
        techStack: ['Next.js', 'Tailwind', 'Framer']
    },
    {
        id: '2',
        title: 'Minimal Portfolio',
        description: 'Clean, typography-focused portfolio template for developers and designers.',
        image: 'bg-gradient-to-br from-emerald-500/20 to-teal-500/20',
        type: 'free',
        category: 'Portfolio',
        techStack: ['React', 'CSS Modules']
    },
    {
        id: '3',
        title: 'E-Commerce Dashboard',
        description: 'Full-featured admin dashboard with charts, data tables, and dark mode support.',
        image: 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20',
        type: 'paid',
        price: '$79',
        category: 'Dashboard',
        techStack: ['Next.js', 'Recharts', 'Zustand']
    },
    {
        id: '4',
        title: 'Blog Folio',
        description: 'A content-first blog template with markdown support and SEO optimization.',
        image: 'bg-gradient-to-br from-orange-500/20 to-red-500/20',
        type: 'free',
        category: 'Blog',
        techStack: ['Astro', 'Tailwind']
    },
    {
        id: '5',
        title: 'Agency Corporate',
        description: 'Professional multi-page website for digital agencies and corporate businesses.',
        image: 'bg-gradient-to-br from-slate-500/20 to-gray-500/20',
        type: 'paid',
        price: '$39',
        category: 'Business',
        techStack: ['React', 'GSAP']
    },
    {
        id: '6',
        title: 'DocuSpace',
        description: 'Documentation site template with search, sidebar navigation, and code highlighting.',
        image: 'bg-gradient-to-br from-pink-500/20 to-rose-500/20',
        type: 'free',
        category: 'Documentation',
        techStack: ['Next.js', 'MDX']
    }
];