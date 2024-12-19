import React from 'react';
import { CreatorCard } from './CreatorCard';

export function HeroSection() {
  return (
    <div className="container mx-auto px-6 pt-20 flex justify-between items-center">
      <div className="max-w-xl">
        <h1 className="text-white text-6xl font-bold leading-tight mb-6">
          Meet Your All-in-One Creator Store
        </h1>
        <p className="text-white/80 text-lg mb-8">
          Stan is the easiest way to make money online. All of your courses, digital products, and bookings are now hosted within your mobile bio.
        </p>
        <button className="bg-[#00FF85] text-black px-8 py-3 rounded-full font-medium hover:bg-[#00FF85]/90 flex items-center">
          Continue
          <span className="ml-2">→</span>
        </button>
      </div>
      <CreatorCard />
    </div>
  );
}