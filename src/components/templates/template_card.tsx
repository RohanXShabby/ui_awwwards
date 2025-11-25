import { Template } from '@/types/template';
import { ExternalLink, ShoppingCart, Download, Star, Globe, Layout } from 'lucide-react';

interface TemplateCardProps {
    template: Template;
}

export const TemplateCard = ({ template }: TemplateCardProps) => {
    const isPaid = template.type === 'paid';

    return (
        <div className="group flex flex-col rounded-2xl border border-card-border bg-card-bg/30 backdrop-blur-sm overflow-hidden hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300">
            {/* Thumbnail */}
            {/* Note: In a real app, replace the bg-gradient classes in data with actual images, 
                but for now we ensure the container respects theme rounding/borders */}
            <div className={`relative h-56 w-full ${template.image} overflow-hidden border-b border-card-border`}>
                <div className="absolute inset-0 flex items-center justify-center">
                    <Layout className="w-16 h-16 text-foreground/10 group-hover:scale-110 transition-transform duration-500" />
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-background/90 backdrop-blur-md text-xs font-semibold border border-card-border shadow-sm text-foreground">
                        {template.category}
                    </span>
                </div>

                {/* Status Badge (Free/Paid) */}
                <div className="absolute top-3 right-3">
                    {isPaid ? (
                        <span className="px-2.5 py-1 rounded-md bg-warning text-white text-xs font-bold shadow-lg shadow-warning/20 flex items-center gap-1">
                            <Star className="w-3 h-3 fill-current" />
                            PRO
                        </span>
                    ) : (
                        <span className="px-2.5 py-1 rounded-md bg-success text-white text-xs font-bold shadow-lg shadow-success/20">
                            FREE
                        </span>
                    )}
                </div>

                {/* Overlay Buttons */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <button className="p-2.5 rounded-full bg-background text-foreground hover:text-accent transition-colors shadow-xl transform translate-y-4 group-hover:translate-y-0 duration-300">
                        <ExternalLink className="w-5 h-5" />
                    </button>
                    <button className="p-2.5 rounded-full bg-background text-foreground hover:text-accent transition-colors shadow-xl transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75">
                        {isPaid ? <ShoppingCart className="w-5 h-5" /> : <Download className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 flex flex-col">
                <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                        {template.title}
                    </h3>
                    {isPaid && (
                        <span className="font-mono font-semibold text-lg text-foreground">{template.price}</span>
                    )}
                </div>

                <p className="text-muted-foreground text-sm line-clamp-2 mb-6 flex-1">
                    {template.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {template.techStack.map(tech => (
                        <span key={tech} className="text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-accent/5 text-muted-foreground border border-accent/10">
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-auto">
                    <button className="flex-1 py-2.5 rounded-lg border border-card-border bg-card-bg hover:bg-accent/10 hover:border-accent/50 text-sm font-medium transition-all flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground">
                        <Globe className="w-4 h-4" />
                        Preview
                    </button>

                    <button className={`
                        flex-1 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2
                        ${isPaid
                            ? 'bg-foreground text-background hover:bg-foreground/90'
                            : 'bg-accent text-white hover:bg-accent/90'}
                    `}>
                        {isPaid ? 'Buy Now' : 'Get Code'}
                    </button>
                </div>
            </div>
        </div>
    );
};