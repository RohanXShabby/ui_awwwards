import { PricingPlan, BillingCycle } from '@/types/pricing';
import { Check, X } from 'lucide-react';

interface PricingCardProps {
    plan: PricingPlan;
    billingCycle: BillingCycle;
}

export const PricingCard = ({ plan, billingCycle }: PricingCardProps) => {
    const isPopular = plan.isPopular;

    return (
        <div
            className={`
                relative flex flex-col p-8 rounded-3xl transition-all duration-300
                ${isPopular
                    ? 'bg-card-bg/50 border-2 border-accent shadow-2xl shadow-accent/10 scale-105 z-10'
                    : 'bg-card-bg/30 border border-card-border hover:border-accent/30 hover:shadow-lg'}
            `}
        >
            {isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-white text-xs font-bold rounded-full shadow-lg">
                    MOST POPULAR
                </div>
            )}

            {/* Header */}
            <div className="mb-8">
                <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground min-h-[40px]">{plan.description}</p>
            </div>

            {/* Price */}
            <div className="mb-8 flex items-end gap-1">
                <span className="text-4xl font-bold text-foreground">
                    {billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly}
                </span>
                <span className="text-muted-foreground mb-1">
                    /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                </span>
            </div>

            {/* CTA Button */}
            <button
                className={`
                    w-full py-3 rounded-xl text-sm font-bold transition-all duration-200 mb-8
                    ${isPopular
                        ? 'bg-accent text-white hover:bg-accent/90 shadow-lg shadow-accent/20'
                        : 'bg-foreground text-background hover:bg-foreground/80'}
                `}
            >
                {plan.buttonText}
            </button>

            {/* Features */}
            <ul className="space-y-4 flex-1">
                {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm">
                        {feature.included ? (
                            <div className="mt-0.5 p-0.5 rounded-full bg-success/10 text-success shrink-0">
                                <Check className="w-3.5 h-3.5" />
                            </div>
                        ) : (
                            <div className="mt-0.5 p-0.5 rounded-full bg-muted-foreground/10 text-muted-foreground/50 shrink-0">
                                <X className="w-3.5 h-3.5" />
                            </div>
                        )}
                        <span className={feature.included ? 'text-foreground' : 'text-muted-foreground/60'}>
                            {feature.text}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};