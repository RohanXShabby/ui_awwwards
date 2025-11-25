import { Sparkles } from 'lucide-react';

export const PricingHeader = () => {
    return (
        <div className="flex flex-col items-center text-center mb-10 space-y-4 animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="inline-flex items-center justify-center p-2 bg-accent/10 rounded-full mb-4 ring-1 ring-accent/20">
                <Sparkles className="w-5 h-5 text-accent mr-2" />
                <span className="text-sm font-medium text-accent">Simple Pricing</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                Choose your <span className="text-accent">Plan</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl">
                Transparent pricing for every stage of your journey. No hidden fees. Cancel anytime.
            </p>
        </div>
    );
};