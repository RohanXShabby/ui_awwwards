import { BillingCycle } from '@/types/pricing';

interface PricingToggleProps {
    billingCycle: BillingCycle;
    setBillingCycle: (cycle: BillingCycle) => void;
}

export const PricingToggle = ({ billingCycle, setBillingCycle }: PricingToggleProps) => {
    return (
        <div className="flex justify-center mb-16 animate-in fade-in zoom-in-95 duration-500 delay-100">
            <div className="relative flex items-center p-1 bg-card-bg border border-card-border rounded-full">
                {/* Sliding Background */}
                <div
                    className={`
                        absolute top-1 bottom-1 w-[50%] rounded-full bg-foreground transition-all duration-300 ease-out shadow-sm
                        ${billingCycle === 'monthly' ? 'left-1' : 'left-[calc(50%-4px)] translate-x-[4px]'}
                    `}
                />

                <button
                    onClick={() => setBillingCycle('monthly')}
                    className={`
                        relative z-10 px-6 py-2 text-sm font-medium transition-colors duration-300 w-32
                        ${billingCycle === 'monthly' ? 'text-background' : 'text-muted-foreground hover:text-foreground'}
                    `}
                >
                    Monthly
                </button>

                <button
                    onClick={() => setBillingCycle('yearly')}
                    className={`
                        relative z-10 px-6 py-2 text-sm font-medium transition-colors duration-300 w-32 flex items-center justify-center gap-2
                        ${billingCycle === 'yearly' ? 'text-background' : 'text-muted-foreground hover:text-foreground'}
                    `}
                >
                    Yearly
                    <span className="absolute -top-3 -right-2 px-2 py-0.5 rounded-full bg-accent text-white text-[10px] font-bold shadow-sm animate-pulse">
                        -20%
                    </span>
                </button>
            </div>
        </div>
    );
};