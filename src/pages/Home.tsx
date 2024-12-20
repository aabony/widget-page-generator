
import React from 'react';
import { Navigation } from '../components/Navigation';
import { HeroSection } from '../components/HeroSection';
import { CreatorsSection } from '../components/CreatorsSection';
import { FeaturesSection } from '../components/FeaturesSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { PricingSection } from '../components/PricingSection';
import { CTASection } from '../components/CTASection';

export function Home() {
    return (
        <div>
            <div className="min-h-screen bg-[#6C5CE7]">
                <Navigation />
                <HeroSection />
            </div>
            <CreatorsSection />
            <FeaturesSection />
            <TestimonialsSection />
            <PricingSection />
            <CTASection />
        </div>
    );
}
