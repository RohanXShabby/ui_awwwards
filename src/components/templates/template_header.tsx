import { Layout } from 'lucide-react';

export const TemplateHeader = () => {
    return (
        <div className="flex flex-col items-center text-center mb-16 space-y-4 animate-in fade-in slide-in-from-top-4 duration-700">
            {/* Badge */}
            <div className="inline-flex items-center justify-center p-2 bg-accent/10 rounded-full mb-4 ring-1 ring-accent/20">
                <Layout className="w-5 h-5 text-accent mr-2" />
                <span className="text-sm font-medium text-accent">Production Ready</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                Premium <span className="text-accent">Templates</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-muted-foreground max-w-2xl">
                Jumpstart your next project with our hand-crafted templates.
                Fully responsive, accessible, and easily customizable.
            </p>
        </div>
    );
};