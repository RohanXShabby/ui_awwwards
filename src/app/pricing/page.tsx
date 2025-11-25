"use client"

import { useState } from 'react';
import { PRICING_PLANS } from '@/data/pricing';
import { BillingCycle } from '@/types/pricing';
import { PricingHeader } from '@/components/pricing/pricing_header';
import { PricingToggle } from '@/components/pricing/pricing_toggle';
import { PricingCard } from '@/components/pricing/pricing_card';
import { PricingFAQ } from '@/components/pricing/pricing_faq'; 

const page = () => {
    const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');

    return (
        <div className="relative min-h-screen w-full bg-background text-foreground overflow-x-hidden">

            {/* --- Background Animation --- */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-40 dark:opacity-20">
                <div className="absolute top-[-10%] left-[20%] w-[50%] h-[50%] rounded-full bg-accent/15 blur-[120px] animate-first"></div>
                <div className="absolute bottom-[-10%] right-[10%] w-[40%] h-[40%] rounded-full bg-info/15 blur-[120px] animate-second"></div>
            </div>

            <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">

                {/* Header */}
                <PricingHeader />

                {/* Toggle */}
                <PricingToggle
                    billingCycle={billingCycle}
                    setBillingCycle={setBillingCycle}
                />

                {/* Pricing Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    {PRICING_PLANS.map((plan) => (
                        <PricingCard
                            key={plan.id}
                            plan={plan}
                            billingCycle={billingCycle}
                        />
                    ))}
                </div>

                {/* --- Added FAQ Section Here --- */}
                <PricingFAQ />

                {/* Footer Link */}
                <div className="mt-24 text-center border-t border-card-border pt-12 animate-in fade-in duration-1000 delay-200">
                    <p className="text-muted-foreground">
                        Still have questions? <a href="#" className="text-accent hover:underline font-medium">Chat with our team</a>
                    </p>
                </div>

            </main>
        </div>
    );
};

export default page;