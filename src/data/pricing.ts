import { PricingPlan } from '@/types/pricing';

export const PRICING_PLANS: PricingPlan[] = [
    {
        id: 'starter',
        name: 'Starter',
        description: 'Perfect for hobbyists and side projects.',
        price: { monthly: '$0', yearly: '$0' },
        buttonText: 'Get Started',
        features: [
            { text: '1 Project', included: true },
            { text: 'Community Support', included: true },
            { text: 'Basic Components', included: true },
            { text: 'Analytics Dashboard', included: false },
            { text: 'Custom Domain', included: false },
        ]
    },
    {
        id: 'pro',
        name: 'Pro',
        description: 'For developers building production apps.',
        price: { monthly: '$29', yearly: '$290' },
        isPopular: true,
        buttonText: 'Start Free Trial',
        features: [
            { text: 'Unlimited Projects', included: true },
            { text: 'Priority Email Support', included: true },
            { text: 'All UI Components', included: true },
            { text: 'Advanced Analytics', included: true },
            { text: 'Custom Domain', included: false },
        ]
    },
    {
        id: 'enterprise',
        name: 'Enterprise',
        description: 'For large teams and high-scale needs.',
        price: { monthly: '$99', yearly: '$990' },
        buttonText: 'Contact Sales',
        features: [
            { text: 'Unlimited Projects', included: true },
            { text: '24/7 Dedicated Support', included: true },
            { text: 'All UI Components', included: true },
            { text: 'Advanced Analytics', included: true },
            { text: 'Custom Domain & SSO', included: true },
        ]
    }
];

// ... existing PRICING_PLANS code ...

export interface FAQItem {
    question: string;
    answer: string;
}

export const PRICING_FAQS: FAQItem[] = [
    {
        question: "Can I cancel my subscription at any time?",
        answer: "Yes, absolutely. You can cancel your subscription from your dashboard at any time. Your plan will remain active until the end of the current billing cycle."
    },
    {
        question: "Is there a free trial for the Pro plan?",
        answer: "We offer a 14-day free trial for the Pro plan. No credit card is required to start. You will only be charged if you choose to continue after the trial ends."
    },
    {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (Visa, Mastercard, Amex), PayPal, and Google Pay. For Enterprise plans, we also support bank transfers."
    },
    {
        question: "Can I switch plans later?",
        answer: "Yes, you can upgrade or downgrade your plan at any time. If you upgrade, the price difference will be prorated for the remainder of the cycle."
    },
    {
        question: "Do you offer discounts for students or non-profits?",
        answer: "Yes! We offer a 50% discount for students and verified non-profit organizations. Please contact our support team with proof of status to apply."
    }
];