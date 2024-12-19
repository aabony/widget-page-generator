import React from 'react';
import { ArrowRight } from 'lucide-react';

export function CTASection() {
  return (
    <section className="bg-[#6C5CE7] py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-white text-5xl font-bold mb-6">
            Ready to Start Your Creator Journey?
          </h2>
          <p className="text-white/80 text-xl mb-8">
            Join thousands of creators who are building successful online businesses with Stan
          </p>
          <button className="bg-white text-[#6C5CE7] px-8 py-4 rounded-full font-medium hover:bg-white/90 flex items-center mx-auto">
            Get Started Now
            <ArrowRight className="ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
}