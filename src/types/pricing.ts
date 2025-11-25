export type BillingCycle = 'monthly' | 'yearly';

export interface PlanFeature {
    text: string;
    included: boolean;
}

export interface PricingPlan {
    id: string;
    name: string;
    description: string;
    price: {
        monthly: string;
        yearly: string;
    };
    isPopular?: boolean;
    buttonText: string;
    features: PlanFeature[];
}